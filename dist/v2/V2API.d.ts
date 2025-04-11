import type { ShipStationOptions } from '../BaseAPI';
import BaseAPI from '../BaseAPI';
import { Tags } from './resources/Tags';
export declare class V2API extends BaseAPI {
    tags: Tags;
    constructor(options: ShipStationOptions);
}
