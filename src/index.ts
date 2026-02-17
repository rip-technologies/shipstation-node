import type { ShipStationOptions, ShipStationRequestOptions } from './BaseAPI';
import { V1API } from './v1/V1API';
import { V2API } from './v2/V2API';

export default class ShipStation {
  public v1: V1API;
  public v2: V2API;

  constructor(options: ShipStationOptions) {
    this.v1 = new V1API(options);
    this.v2 = new V2API(options);
  }
}

export type { ShipStationRequestOptions };

export * from './v2/types';

export { ShipStation };
