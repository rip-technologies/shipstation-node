import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import type { IAxiosRetryConfig } from "axios-retry";
import axiosRetry from "axios-retry";
import type { RateLimiterOpts } from "limiter";
import { RateLimiter } from "limiter";

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
	retryConfig?: IAxiosRetryConfig;
}

export interface RateLimitOptions {
	limit: number;
	interval: number;
}

// Gateway failures and v1 errors don't carry the v2 error body
const isErrorResponse = (data: unknown): data is ErrorResponse =>
	typeof data === "object" &&
	data !== null &&
	"errors" in data &&
	Array.isArray(data.errors) &&
	data.errors.length > 0;

export default abstract class BaseAPI {
	private readonly type: "v1" | "v2";
	private readonly baseURL: string;
	private readonly http: AxiosInstance;
	private readonly limiter: RateLimiter;
	protected authHeaders?: Record<string, string>;

	constructor(
		type: typeof this.type,
		baseUrl: string,
		rateLimitOpts: RateLimiterOpts,
		options: ShipStationOptions,
	) {
		this.type = type;
		this.baseURL = baseUrl;
		this.http = axios.create(options.requestConfig);

		// Initialize rate limiter
		this.limiter = new RateLimiter(rateLimitOpts);

		// Retry failed requests. Always installed, so a per-call "axios-retry" policy works on a client without
		// retryConfig; such a client still never retries by default.
		axiosRetry(this.http, options.retryConfig ?? { retries: 0 });
	}

	public request = async <T>(
		requestData: ShipStationRequestOptions,
		callOptions?: ShipStationCallOptions,
	) => {
		if (!this.authHeaders) {
			throw new Error(`Credentials are not set for the ${this.type} API`);
		}

		// Wait for rate limit token
		await this.limiter.removeTokens(1);

		try {
			const response = await this.http.request<T>({
				baseURL: this.baseURL,
				...requestData,
				...callOptions,
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
}
