import type { AxiosRequestConfig } from 'axios';
import type { IAxiosRetryConfig } from 'axios-retry';
import type { RateLimiterOpts } from 'limiter';
export interface ShipStationRequestOptions extends Pick<AxiosRequestConfig, 'data' | 'params' | 'url'> {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
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
    requestConfig?: Omit<AxiosRequestConfig, 'baseURL' | 'headers' | 'axios-retry' | keyof ShipStationRequestOptions>;
    retryConfig?: IAxiosRetryConfig;
}
export interface RateLimitOptions {
    limit: number;
    interval: number;
}
export default abstract class BaseAPI {
    private readonly type;
    private readonly baseURL;
    private readonly requestConfig?;
    private readonly limiter;
    protected authHeaders?: Record<string, string>;
    constructor(type: typeof this.type, baseUrl: string, rateLimitOpts: RateLimiterOpts, options: ShipStationOptions);
    request: <T>(requestData: ShipStationRequestOptions) => Promise<T>;
}
