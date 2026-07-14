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
			const response = (error as AxiosError<ErrorResponse>).response;
			if (!response) {
				throw error;
			}

			throw new ShipStationError(response.data);
		}
	};
}
