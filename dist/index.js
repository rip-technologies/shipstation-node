import { V1API } from './v1/V1API';
import { V2API } from './v2/V2API';
export default class ShipStation {
    constructor(options) {
        this.v1 = new V1API(options);
        this.v2 = new V2API(options);
    }
}
export * from './v2/types';
