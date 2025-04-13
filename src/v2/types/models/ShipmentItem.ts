import type { OrderSourceName } from '../resources';

export interface ShipmentItem {
  /**
   * item name (>= 0 characters)
   *
   * @example "box"
   */
  name: string;
  /**
   * sales order id
   *
   * @example "12345"
   */
  sales_order_id: string | null;
  /**
   * sales order item id
   *
   * @example "123445"
   */
  order_order_item_id: string | null;
  /**
   * The quantity of this item included in the shipment (>= 0)
   *
   * @example 1
   */
  quantity: number;
  /**
   * Item Stock Keeping Unit
   *
   * @example "123445"
   */
  sku: string | null;
  /**
   * external order id
   *
   * @example "123445"
   */
  external_order_id: string | null;
  /**
   * external order item id
   *
   * @example "12"
   */
  external_order_item_id: string | null;
  /**
   * Amazon Standard Identification Number (10 characters)
   *
   * @example "B00005N5PF"
   */
  asin: string | null;
  order_source_code: OrderSourceName;
}
