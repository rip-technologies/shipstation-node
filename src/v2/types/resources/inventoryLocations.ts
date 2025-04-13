import type { InventoryLocation } from '../models';
import type { PaginatedResponse } from './pagination';

export interface ListInventoryLocationsOptions {
  limit?: number;
}

export interface ListInventoryLocationsResponse extends PaginatedResponse {
  inventory_locations: Array<InventoryLocation>;
}

export interface CreateInventoryLocationOptions {
  name: string;
  inventory_warehouse_id: string;
}

export interface DeleteInventoryLocationOptions {
  /**
   * If 1, remove all inventory from the location before deleting it. If 0 or missing and the location has On Hand
   * inventory, the request will fail.
   */
  remove_inventory?: '0' | '1';
}
