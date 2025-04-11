import type ShipStation from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type { ListUsersOptions, ListUsersResponse } from '../types';
export declare class Users extends BaseResource {
    constructor(shipstation: ShipStation);
    /**
     * [Official Documentation](https://www.shipstation.com/docs/api/users/list/)
     *
     * @returns A list of users.
     */
    list(params: ListUsersOptions): Promise<ListUsersResponse>;
}
