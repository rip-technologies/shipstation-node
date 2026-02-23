import type { Label, Shipment } from '../models';
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

export interface VoidLabelResponse {
  /**
   * Indicates whether the attempt to void the label was successful
   *
   * @example false
   */
  approved: boolean;
  /**
   * @example "Unable to delete FedEx shipment. Unable to retrieve record from database."
   */
  message: string;
  /**
   * The possible normalized reasons a label void request may not have been approved
   *
   * @example "label_not_found_within_void_period"
   */
  reason_code?:
    | 'unknown'
    | 'unspecified'
    | 'validation_failed'
    | 'label_not_found_within_void_period'
    | 'label_already_used'
    | 'label_already_voided'
    | 'contact_carrier';
}

export interface PurchaseLabelOptions extends Pick<
  Label,
  'is_return_label' | 'rma_number' | 'charge_event' | 'label_format' | 'display_scheme' | 'label_layout'
> {
  /**
   * A unique identifier for a carrier service point where the shipment will be delivered by the carrier. This will take
   * precedence over a shipment's ship to address.
   *
   * @example "614940"
   */
  ship_to_service_point_id?: string | null;
  /**
   * A unique identifier for a carrier drop off point where a merchant plans to deliver packages. This will take
   * precedence over a shipment's ship from address.
   *
   * @example "614940"
   */
  ship_from_service_point_id?: string | null;
  /**
   * The information necessary to ship a package, such as the origin, the destination, the carrier service, and the
   * package dimensions and weight.
   */
  shipment: Partial<Shipment> &
    Required<
      Pick<
        Shipment,
        | 'carrier_id'
        | 'service_code'
        | 'ship_date'
        | 'ship_to'
        | 'ship_from'
        | 'warehouse_id'
        | 'return_to'
        | 'confirmation'
        | 'customs'
        | 'advanced_options'
        | 'insurance_provider'
        | 'packages'
      >
    >;
  /**
   * @default "no_validation"
   */
  validate_address?: 'no_validation' | 'validate_only' | 'validate_and_clean';
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-123456"
   */
  outbound_label_id: string;
  /**
   * There are two different ways to download a label:
   * - `url`: You will receive a URL, which you can use to download the label in a separate request. The URL will remain
   * valid for 90 days.
   * - `inline`: You will receive the Base64-encoded label as part of the response. No need for a second request to
   * download the label.
   *
   * @default "url"
   */
  label_download_type?: 'url' | 'inline';
  /**
   * @deprecated
   * Indicate if this label is being used only for testing purposes. If true, then no charge will be added to your account.
   *
   * @default false
   * @example true
   */
  test_label?: boolean;
}

export type GetLabelByIdOptions = Pick<PurchaseLabelOptions, 'label_download_type'>;

export type PurchaseLabelWithIdOptions = Partial<
  Pick<
    PurchaseLabelOptions,
    'validate_address' | 'label_layout' | 'label_format' | 'label_download_type' | 'display_scheme'
  >
>;

export type CreateReturnLabelOptions = Partial<
  Pick<
    PurchaseLabelOptions,
    'charge_event' | 'label_layout' | 'label_format' | 'label_download_type' | 'display_scheme'
  > &
    Pick<Label, 'label_image_id'>
>;
