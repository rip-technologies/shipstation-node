import type { PackagePickup, PackagePickupContactDetails, PackagePickupWindow } from '../models';
import type { PaginatedRequest, PaginatedResponse } from './pagination';

export interface ListPackagePickupsOptions extends Omit<PaginatedRequest, 'sortDir'> {
  /**
   * Carrier ID [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id?: string;
  /**
   * Warehouse ID [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  warehouse_id?: string;
  /**
   * Only return scheduled pickups that were created on or after a specific date/time
   *
   * @example "2019-03-12T19:24:13.657Z"
   */
  created_at_start?: string;
  /**
   * Only return scheduled pickups that were created on or before a specific date/time
   *
   * @example "2019-03-12T19:24:13.657Z"
   */
  created_at_end?: string;
}

export interface ListPackagePickupsResponse extends PaginatedResponse {
  /** An array of pickups associated with the user's account. */
  pickups: Array<PackagePickup>;
}

export interface SchedulePackagePickupData {
  /**
   * Label IDs that will be included in the pickup request
   *
   * @example ["se-28529731"]
   */
  label_ids: Array<string>;
  contact_details: PackagePickupContactDetails;
  /**
   * Used by some carriers to give special instructions for a package pickup
   *
   * @example "call before 15:00"
   */
  pickup_notes?: string;
  /** The desired time range for the package pickup. */
  pickup_window: PackagePickupWindow;
}

export interface DeleteScheduledPickupResponse {
  /**
   * Pickup Resource ID (>= 4 characters)
   *
   * @example "pik_3YcKU5zdtJuCqoeNwyqqbW"
   */
  pickup_id: string;
}
