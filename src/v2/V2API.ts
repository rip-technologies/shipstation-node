import type { RateLimiterOpts } from 'limiter';

import type { ShipStationOptions } from '../BaseAPI';
import BaseAPI from '../BaseAPI';
import { Carriers } from './resources/Carriers';
import { Downloads } from './resources/Downloads';
import { Manifests } from './resources/Manifests';
import { PackagePickups } from './resources/PackagePickups';
import { Rates } from './resources/Rates';
import { Tags } from './resources/Tags';
import { Tracking } from './resources/Tracking';
import { Warehouses } from './resources/Warehouses';
import { Webhooks } from './resources/Webhooks';

// 200 requests per minute - https://docs.shipstation.com/rate-limits
const RATE_LIMIT_OPTS: RateLimiterOpts = {
  tokensPerInterval: 200,
  interval: 'minute'
};

export class V2API extends BaseAPI {
  public carriers: Carriers;
  public downloads: Downloads;
  public manifests: Manifests;
  public packagePickups: PackagePickups;
  public rates: Rates;
  public tags: Tags;
  public tracking: Tracking;
  public warehouses: Warehouses;
  public webhooks: Webhooks;

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

    this.carriers = new Carriers(this);
    this.downloads = new Downloads(this);
    this.manifests = new Manifests(this);
    this.packagePickups = new PackagePickups(this);
    this.rates = new Rates(this);
    this.tags = new Tags(this);
    this.tracking = new Tracking(this);
    this.warehouses = new Warehouses(this);
    this.webhooks = new Webhooks(this);
  }
}
