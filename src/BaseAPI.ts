import type {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import axios, { AxiosHeaders, isAxiosError } from "axios";
import type { IAxiosRetryConfig } from "axios-retry";
import axiosRetry from "axios-retry";

import { RequestPacer } from "./RequestPacer";
import { type ErrorResponse, ShipStationError } from "./v2/types/models/Error";

export interface ShipStationRequestOptions
	extends Pick<AxiosRequestConfig, "data" | "params" | "url"> {
	method?: "GET" | "POST" | "PUT" | "DELETE";
}

/**
 * Axios request config for a single SDK call. It is applied after the SDK's own settings, so it can override them.
 * Headers are merged with the auth headers, and `"axios-retry"` is merged over the client's `retryConfig`.
 */
export type ShipStationCallOptions = AxiosRequestConfig;

export interface ShipStationRateLimit {
	/**
	 * Requests this client may start per minute. Starts are spaced evenly (one every `60_000 / requestsPerMinute` ms),
	 * and every attempt takes a turn, retries included. Defaults to ShipStation's limit: 200 for v2, 40 for v1. Set it
	 * lower when several processes share one API key.
	 */
	requestsPerMinute?: number;
	/**
	 * How long to pause the client after a 429 that says nothing about when to retry (no `Retry-After` header, and for
	 * v1 no `X-Rate-Limit-Reset` header). Defaults to 30 seconds.
	 */
	fallbackPauseMs?: number;
}

/** One HTTP attempt of an SDK call. A call that is retried twice reports three attempts. */
export interface ShipStationAttempt {
	api: "v1" | "v2";
	/** Upper-case HTTP method */
	method: string;
	/** The request URL, relative to the API's base URL */
	url?: string;
	/** HTTP status, when a response arrived */
	status?: number;
	/** The axios error code for an attempt without a response, such as `ECONNABORTED` for a timeout */
	errorCode?: string;
	/** 0 for the first attempt, then the axios-retry retry number */
	retryCount: number;
	/** How long the attempt waited for its rate-limit turn before it was sent */
	delayMs: number;
	/** How long the attempt took from sending to its response or error */
	durationMs: number;
	/** Set on a 429: how long the client is now paused */
	pauseMs?: number;
	/**
	 * ShipStation's request ID, read from the v2 error body (`request_id`). ShipStation does not document a request ID
	 * response header, and successful responses do not carry one.
	 */
	requestId?: string;
}

export interface ShipStationOptions {
	credentials: {
		v1?: {
			apiKey: string;
			apiSecret: string;
			partnerKey?: string;
		};
		v2?: {
			apiKey: string;
			mock?: boolean;
		};
	};
	requestConfig?: Omit<
		AxiosRequestConfig,
		"baseURL" | "headers" | "axios-retry" | keyof ShipStationRequestOptions
	>;
	/**
	 * axios-retry policy for every call. On a 429 the client pause decides when the retry is sent, so `retryDelay` is
	 * not applied to retries of a 429; it still applies to every other retry.
	 */
	retryConfig?: IAxiosRetryConfig;
	/** Rate limiting per API version. Each `ShipStation` instance paces its own requests. */
	rateLimit?: {
		v1?: ShipStationRateLimit;
		v2?: ShipStationRateLimit;
	};
	/** Called after every HTTP attempt, successful or not. Errors thrown by the hook are ignored. */
	onAttempt?: (attempt: ShipStationAttempt) => void;
}

const DEFAULT_FALLBACK_PAUSE_MS = 30_000;

// Gateway failures and v1 errors don't carry the v2 error body
const isErrorResponse = (data: unknown): data is ErrorResponse =>
	typeof data === "object" &&
	data !== null &&
	"errors" in data &&
	Array.isArray(data.errors) &&
	data.errors.length > 0;

const readRequestId = (data: unknown) =>
	typeof data === "object" &&
	data !== null &&
	"request_id" in data &&
	typeof data.request_id === "string"
		? data.request_id
		: undefined;

// Header names are case-insensitive, and a test adapter may hand back a plain object
const getHeader = (response: AxiosResponse, name: string) =>
	AxiosHeaders.from(
		response.headers as Parameters<typeof AxiosHeaders.from>[0],
	).get(name);

/** `Retry-After` in ms, as seconds or an HTTP date */
const parseRetryAfter = (response: AxiosResponse) => {
	const value = getHeader(response, "retry-after");
	if (typeof value !== "string" || value.trim() === "") {
		return undefined;
	}

	const seconds = Number(value);
	const ms = Number.isNaN(seconds)
		? new Date(value).valueOf() - Date.now()
		: seconds * 1000;

	return Number.isNaN(ms) ? undefined : Math.max(0, ms);
};

/** v1 sends the seconds left in the rate-limit window on every response */
const parseRateLimitReset = (response: AxiosResponse) => {
	const value = getHeader(response, "x-rate-limit-reset");
	const seconds = Number(value);
	return typeof value === "string" && value.trim() !== "" && seconds >= 0
		? seconds * 1000
		: undefined;
};

type RetryDelay = NonNullable<IAxiosRetryConfig["retryDelay"]>;

// axios-retry's default delay: wait for `Retry-After` if there is one, else retry at once
const defaultRetryDelay: RetryDelay = (_retryCount, error) =>
	(error.response && parseRetryAfter(error.response)) ?? 0;

/**
 * The client pause already holds the retry of a 429 back until ShipStation accepts requests again, so axios-retry
 * resends it at once and the retry waits for its turn like any other request. Waiting for `retryDelay` as well would
 * add the two delays together.
 */
const skipDelayOn429 =
	(retryDelay: RetryDelay = defaultRetryDelay): RetryDelay =>
	(retryCount, error) =>
		error.response?.status === 429 ? 0 : retryDelay(retryCount, error);

interface AttemptTiming {
	delayMs: number;
	sentAt: number;
}

export default abstract class BaseAPI {
	private readonly type: "v1" | "v2";
	private readonly baseURL: string;
	private readonly http: AxiosInstance;
	private readonly pacer: RequestPacer;
	private readonly fallbackPauseMs: number;
	private readonly onAttempt?: ShipStationOptions["onAttempt"];
	// axios copies the config for every retry, so each attempt's config object is its own key
	private readonly attempts = new WeakMap<
		InternalAxiosRequestConfig,
		AttemptTiming
	>();
	protected authHeaders?: Record<string, string>;

	constructor(
		type: typeof this.type,
		baseUrl: string,
		defaultRequestsPerMinute: number,
		options: ShipStationOptions,
	) {
		const rateLimit = options.rateLimit?.[type];

		this.type = type;
		this.baseURL = baseUrl;
		this.http = axios.create(options.requestConfig);
		this.pacer = new RequestPacer(
			rateLimit?.requestsPerMinute ?? defaultRequestsPerMinute,
		);
		this.fallbackPauseMs =
			rateLimit?.fallbackPauseMs ?? DEFAULT_FALLBACK_PAUSE_MS;
		this.onAttempt = options.onAttempt;

		// axios runs response interceptors in the order they were added. This one goes before axios-retry's, so it sees
		// every attempt (and pauses the client on a 429) before axios-retry decides whether to resend.
		this.http.interceptors.response.use(
			(response) => {
				this.afterAttempt(response.config, response);
				return response;
			},
			(error: unknown) => {
				if (isAxiosError(error) && error.config) {
					this.afterAttempt(error.config, error.response, error);
				}
				return Promise.reject(error);
			},
		);

		// Retry failed requests. Always installed, so a per-call "axios-retry" policy works on a client without
		// retryConfig; such a client still never retries by default.
		const retryConfig = options.retryConfig ?? { retries: 0 };
		axiosRetry(this.http, {
			...retryConfig,
			retryDelay: skipDelayOn429(retryConfig.retryDelay),
		});

		// axios runs request interceptors in reverse order, so this one runs before axios-retry's. It runs for every
		// attempt, retries included, and axios-retry only starts the attempt's clock (for `timeout`) once it is sent.
		this.http.interceptors.request.use(async (config) => {
			const queuedAt = Date.now();
			await this.pacer.waitForTurn(config.signal);

			const sentAt = Date.now();
			this.attempts.set(config, { delayMs: sentAt - queuedAt, sentAt });
			return config;
		});
	}

	public request = async <T>(
		requestData: ShipStationRequestOptions,
		callOptions?: ShipStationCallOptions,
	) => {
		if (!this.authHeaders) {
			throw new Error(`Credentials are not set for the ${this.type} API`);
		}

		const callRetryConfig = callOptions?.["axios-retry"];

		try {
			const response = await this.http.request<T>({
				baseURL: this.baseURL,
				...requestData,
				...callOptions,
				...(callRetryConfig?.retryDelay && {
					"axios-retry": {
						...callRetryConfig,
						retryDelay: skipDelayOn429(callRetryConfig.retryDelay),
					},
				}),
				headers: { ...this.authHeaders, ...callOptions?.headers },
			});

			return response.data;
		} catch (error) {
			// Keep the axios error for anything else so its status survives
			const data = (error as AxiosError).response?.data;
			if (!isErrorResponse(data)) {
				throw error;
			}

			throw new ShipStationError(data);
		}
	};

	private afterAttempt(
		config: InternalAxiosRequestConfig,
		response?: AxiosResponse,
		error?: AxiosError,
	) {
		let pauseMs: number | undefined;
		if (response?.status === 429) {
			pauseMs =
				parseRetryAfter(response) ??
				(this.type === "v1" ? parseRateLimitReset(response) : undefined) ??
				this.fallbackPauseMs;
			this.pacer.pauseFor(pauseMs);
		}

		if (!this.onAttempt) {
			return;
		}

		const timing = this.attempts.get(config);
		try {
			this.onAttempt({
				api: this.type,
				method: (config.method ?? "get").toUpperCase(),
				url: config.url,
				status: response?.status,
				errorCode: response ? undefined : error?.code,
				retryCount: config["axios-retry"]?.retryCount ?? 0,
				delayMs: timing?.delayMs ?? 0,
				durationMs: timing ? Date.now() - timing.sentAt : 0,
				pauseMs,
				requestId: readRequestId(response?.data),
			});
		} catch {
			// A logging hook must not change the outcome of the request
		}
	}
}
