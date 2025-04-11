var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { RateLimiter } from 'limiter';
export default class BaseAPI {
    constructor(type, baseUrl, rateLimitOpts, options) {
        this.request = (requestData) => __awaiter(this, void 0, void 0, function* () {
            if (!this.authHeaders) {
                throw new Error(`Credentials are not set for the ${this.type} API`);
            }
            // Wait for rate limit token
            yield this.limiter.removeTokens(1);
            const response = yield axios.request(Object.assign(Object.assign({ baseURL: this.baseURL, headers: this.authHeaders }, this.requestConfig), requestData));
            return response.data;
        });
        this.type = type;
        this.baseURL = baseUrl;
        // Initialize rate limiter
        this.limiter = new RateLimiter(rateLimitOpts);
        // Retry failed requests
        if (options.retryConfig) {
            axiosRetry(axios, options.retryConfig);
        }
    }
}
