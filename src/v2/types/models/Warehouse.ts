import type { Address } from './Address';

export interface Warehouse {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  warehouse_id: string;
  /**
   * Designates which single warehouse is the default on the account
   *
   * @default false
   * @example true
   */
  is_default: boolean | null;
  /**
   * Name of the warehouse
   *
   * @example "Zero Cool HQ"
   */
  name: string;
  /**
   * Timestamp that indicates when the warehouse was created
   *
   * @example "2019-06-25T18:12:35.583Z"
   */
  created_at: string;
  /** A complete or partial mailing address. */
  origin_address: Address;
  /** A complete or partial mailing address. */
  return_address: Address;
}
