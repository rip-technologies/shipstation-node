import type { Shipment, Tag } from '../models';
import type { PaginatedRequest, PaginatedResponse } from './pagination';

export interface ListShipmentsOptions extends PaginatedRequest {
  shipment_status?: 'pending' | 'processing' | 'label_purchased' | 'cancelled';
  /**
   * Batch ID [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  batch_id?: string;
  /**
   * Pickup Resource ID [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "pik_3YcKU5zdtJuCqoeNwyqqbW"
   */
  pickup_id?: string;
  /**
   * Used to create a filter for when a resource was created (ex. A shipment that was created after a certain time)
   *
   * @example "2019-03-12T19:24:13.657Z"
   */
  created_at_start?: string;
  /**
   * Used to create a filter for when a resource was created (ex. A shipment that was created after a certain time)
   *
   * @example "2019-03-12T19:24:13.657Z"
   */
  created_at_end?: string;
  /**
   * Used to create a filter for when a resource was modified (ex. A shipment that was modified after a certain time)
   *
   * @example "2025-03-12T19:24:13.657Z"
   */
  modified_at_start?: string;
  /**
   * Used to create a filter for when a resource was modified (ex. A shipment that was modified after a certain time)
   *
   * @example "2025-03-12T19:24:13.657Z"
   */
  modified_at_end?: string;
  /** Sales Order ID */
  sales_order_id?: string;
  /** The user or order source defined shipment number */
  shipment_number?: string;
  /** The name associated with the ship_to */
  ship_to_name?: string;
  /**
   * Returns shipments that contain items that match the specified keyword. Fields searched are Sku, Description, and Options.
   *
   * @example "coat"
   */
  item_keyword?: string;
  /**
   * Used to create a filter for resources based on the payment_date parameter after a certain time.
   *
   * @example "2025-03-12T19:24:13.657Z"
   */
  payment_date_start?: string;
  /**
   * Used to create a filter for resources based on the payment_date parameter before a certain time.
   *
   * @example "2025-03-12T19:24:13.657Z"
   */
  payment_date_end?: string;
  /**
   * Store ID [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  store_id?: string;
  /**
   * @example "0bcb569d-1727-4ff9-ab49-b2fec0cee5ae"
   */
  external_shipment_id?: string;
  /**
   * @example "modified_at"
   */
  sort_by?: 'modified_at' | 'created_at';
}

export interface ListShipmentsResponse extends PaginatedResponse {
  /** The list of shipments returned by the api call */
  shipments: Array<Shipment>;
}

export interface GetShipmentRatesOptions {
  /**
   * Used to create a filter for when a resource was created (ex. A shipment that was created after a certain time)
   *
   * @example "2019-03-12T19:24:13.657Z"
   */
  created_at_start?: string;
}

export interface AddTagToShipmentResponse extends Pick<Shipment, 'shipment_id'> {
  /**
   * Tags are arbitrary strings that you can use to categorize shipments. For example, you may want to use tags to
   * distinguish between domestic and international shipments, or between insured and uninsured shipments. Or maybe you
   * want to create a tag for each of your customers so you can easily retrieve every shipment for a customer.
   */
  tag: Tag;
}
