import BaseAPI from '../BaseAPI';
import { Tags } from './resources/Tags';
// 200 requests per minute - https://docs.shipstation.com/rate-limits
const RATE_LIMIT_OPTS = {
    tokensPerInterval: 200,
    interval: 'minute'
};
export class V2API extends BaseAPI {
    constructor(options) {
        const credentials = options.credentials.v2;
        const baseUrl = (credentials === null || credentials === void 0 ? void 0 : credentials.mock)
            ? 'https://docs.shipstation.com/_mock/openapi/v2'
            : 'https://api.shipstation.com/v2';
        super('v2', baseUrl, RATE_LIMIT_OPTS, options);
        if ((credentials === null || credentials === void 0 ? void 0 : credentials.apiKey) || (credentials === null || credentials === void 0 ? void 0 : credentials.mock)) {
            this.authHeaders = {
                'API-Key': credentials.mock ? 'mock' : credentials.apiKey
            };
        }
        this.tags = new Tags(this);
    }
}
