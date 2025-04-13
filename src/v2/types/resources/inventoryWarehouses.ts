import type { InventoryWarehouse } from '../models';
import type { PaginatedResponse } from './pagination';

export interface ListInventoryWarehousesOptions {
  limit?: number;
}

export interface ListInventoryWarehousesResponse extends PaginatedResponse {
  inventory_warehouses: Array<InventoryWarehouse>;
}
