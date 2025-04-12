import type { Warehouse } from '../models';

export interface ListWarehousesResponse {
  /** The array of warehouses returned by the API call */
  warehouses: Array<Warehouse>;
}
