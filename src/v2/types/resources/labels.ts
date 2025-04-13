import type { Label } from '../models';
import type { PaginatedRequest, PaginatedResponse } from './pagination';

export interface ListLabelsOptions extends PaginatedRequest {
  /** Only return labels that are currently in the specified status. */
  label_status?: 'processing' | 'completed' | 'error' | 'voided';
  /**
   * Only return labels for a specific carrier service. `^[a-z0-9]+(_[a-z0-9-]+)* ?$`
   *
   * @example "usps_first_class_mail"
   */
  service_code?: string;
  /**
   * Only return labels for a specific carrier account. [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id?: string;
  /**
   * Only return labels with a specific tracking number.
   *
   * @example "9405511899223197428490"
   */
  tracking_number?: string;
  /**
   * Only return labels that were created in a specific batch. [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  batch_id?: string;
  /**
   * Rate ID [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  rate_id?: string;
  /**
   * Shipment ID [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  shipment_id?: string;
  /**
   * Only return labels that originate from a specific warehouse. [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  warehouse_id?: string;

  /**
   * Only return labels that were created on or after a specific date/time.
   *
   * @example "2019-03-12T19:24:13.657Z"
   */
  created_at_start?: string;
  /**
   * Only return labels that were created on or before a specific date/time.
   *
   * @example "2019-03-12T19:24:13.657Z"
   */
  created_at_end?: string;
  /**
   * Controls which field the query is sorted by.
   *
   * @default "created_at"
   */
  sort_by?: 'modfied_at' | 'created_at';
}

export interface ListLabelsResponse extends PaginatedResponse {
  /**
   * The labels that matched the query criteria. If no matching labels were found, then this array is empty; otherwise,
   * it contains one page of results. The last page of results may have fewer labels than the `page_size`.
   */
  labels: Array<Label>;
}
