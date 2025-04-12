import type { Address } from './Address';

export interface PackagePickupContactDetails {
  /**
   * @example "Jonh"
   */
  name: string;
  /**
   * @example "email@email.com"
   */
  email: string;
  /**
   * (>= 7 characters)
   * @example "89876752562"
   */
  phone: string;
}

export interface PackagePickupWindow {
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  start_at: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  end_at: string;
}

export interface PackagePickup {
  /**
   * Pickup Resource ID (>= 4 characters)
   *
   * @example "pik_3YcKU5zdtJuCqoeNwyqqbW"
   */
  pickup_id: string;
  /**
   * Label IDs that will be included in the pickup request
   *
   * @example ["se-28529731"]
   */
  label_ids: Array<string>;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  created_at: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  cancelled_at: string;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25] characters
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id: string;
  /**
   * The carrier confirmation number for the scheduled pickup.
   *
   * @example "292513CL4A3"
   */
  confirmation_number: string | null;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a warehouse, label, shipment, etc. [1-25] characters
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  warehouse_id: string;
  /** A complete or partial mailing address. */
  pickup_address: Address;
  contact_details: PackagePickupContactDetails;
  /**
   * Used by some carriers to give special instructions for a package pickup
   *
   * @example "call before 15:00"
   */
  pickup_notes: string;
  /** An array of available pickup windows. Carriers can return multiple times that they will pickup packages. */
  pickup_windows: Array<PackagePickupWindow>;
}
