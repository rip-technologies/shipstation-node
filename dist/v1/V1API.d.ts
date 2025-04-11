import type { ShipStationOptions } from '../BaseAPI';
import BaseAPI from '../BaseAPI';
import { Accounts } from './resources/Accounts';
import { Carriers } from './resources/Carriers';
import { Fulfillments } from './resources/Fulfillments';
import { Orders } from './resources/Orders';
import { Products } from './resources/Products';
import { Shipments } from './resources/Shipments';
import { Stores } from './resources/Stores';
import { Users } from './resources/Users';
import { Warehouses } from './resources/Warehouses';
import { Webhooks } from './resources/Webhooks';
export declare class V1API extends BaseAPI {
    accounts: Accounts;
    carriers: Carriers;
    fulfillments: Fulfillments;
    orders: Orders;
    products: Products;
    shipments: Shipments;
    stores: Stores;
    warehouses: Warehouses;
    webhooks: Webhooks;
    users: Users;
    constructor(options: ShipStationOptions);
}
