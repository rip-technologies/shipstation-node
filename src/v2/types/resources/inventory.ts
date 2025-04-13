import type { MonetaryValue } from '../models';
import type { PaginatedResponse } from './pagination';

export interface ListSKUInventoryLevelsOptions {
  /** Optional list of SKUs to filter down to */
  sku?: string;
  inventory_warehouse_id?: string;
  inventory_location_id?: string;
  /** Get counts for SKUs across locations or warehouses */
  group_by?: 'warehouse' | 'location';
  limit?: number;
}

export interface SKUInventoryLevel {
  sku: string;
  on_hand: number;
  allocated: number;
  available: number;
  average_cost: MonetaryValue;
  inventory_warehouse_id: string;
  inventory_location_id: string;
}

export interface ListSKUInventoryLevelsResponse extends PaginatedResponse {
  inventory: Array<SKUInventoryLevel>;
}

export type InventoryCondition = 'sellable' | 'damaged' | 'expired' | 'qa_hold';

export interface UpdateSKULevelsAndPropertiesOptions {
  /**
   * The type of update to perform: increment: Increase inventory quantity for specified location. decrement: Decreate
   * inventory quantity for specified location given a set of filters. adjust: Adjust on hand quantity of inventory for
   * specified location to the quantity indicated. This is done by either adding or removing inventory in the condition
   * specified. modify: Modify attributes on specified inventory. The filters work the same as for decrement transaction
   * type.
   */
  transaction_type: 'increment' | 'decrement' | 'adjust' | 'modify';
  inventory_location_id: string;
  sku: string;
  quantity: number;
  cost?: MonetaryValue;
  condition?: InventoryCondition;
  lot?: string;
  /** date-time */
  usable_start_date?: string;
  /** date-time */
  usable_end_date?: string;
  /** date-time */
  effective_at?: string;
  reason?: string;
  notes?: string;
  /** Used with the modify transaction type to move inventory to a new location */
  new_inventory_location_id?: string;
  /** Used with the modify transaction type to update the cost of existing inventory */
  new_cost?: MonetaryValue;
  /** Used with the modify transaction type to change the condition of existing inventory */
  new_condition?: InventoryCondition;
}
