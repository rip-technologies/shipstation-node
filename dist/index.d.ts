import type { ShipStationOptions, ShipStationRequestOptions } from './BaseAPI';
import { V1API } from './v1/V1API';
import { V2API } from './v2/V2API';
export default class ShipStation {
    v1: V1API;
    v2: V2API;
    constructor(options: ShipStationOptions);
}
export type { ShipStationRequestOptions };
export * from './v2/types';
