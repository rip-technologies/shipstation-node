import type { RateLimiterOpts } from 'limiter';

import type { ShipStationOptions } from '../BaseAPI';
import BaseAPI from '../BaseAPI';
import { Tags } from './resources/Tags';

// 200 requests per minute - https://docs.shipstation.com/rate-limits
const RATE_LIMIT_OPTS: RateLimiterOpts = {
  tokensPerInterval: 200,
  interval: 'minute'
};

export class V2API extends BaseAPI {
  public tags: Tags;

  constructor(options: ShipStationOptions) {
    const credentials = options.credentials.v2;
    const baseUrl = credentials?.mock
      ? 'https://docs.shipstation.com/_mock/openapi/v2'
      : 'https://api.shipstation.com/v2';

    super('v2', baseUrl, RATE_LIMIT_OPTS, options);

    if (credentials?.apiKey || credentials?.mock) {
      this.authHeaders = {
        'API-Key': credentials.mock ? 'mock' : credentials.apiKey
      };
    }

    this.tags = new Tags(this);
  }
}
