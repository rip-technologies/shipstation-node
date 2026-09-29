import type { AxiosError, AxiosRequestConfig } from "axios";
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
	private readonly requestConfig?: ShipStationOptions["requestConfig"];
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

		// Initialize rate limiter
		this.limiter = new RateLimiter(rateLimitOpts);

		// Retry failed requests
		if (options.retryConfig) {
			axiosRetry(axios, options.retryConfig);
		}
	}

	public request = async <T>(requestData: ShipStationRequestOptions) => {
		if (!this.authHeaders) {
			throw new Error(`Credentials are not set for the ${this.type} API`);
		}

		// Wait for rate limit token
		await this.limiter.removeTokens(1);

		try {
			const response = await axios.request<T>({
				baseURL: this.baseURL,
				headers: this.authHeaders,
				...this.requestConfig,
				...requestData,
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
