import type { AxiosResponse } from 'axios';
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
import type { ShipStationOptions, ShipStationRequestOptions } from './shipstation';
export default class ShipStationAPI {
    private readonly ss;
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
    request: (args: ShipStationRequestOptions) => Promise<AxiosResponse>;
    constructor(options?: ShipStationOptions);
}
export type { ShipStationRequestOptions };
export * from './types';
