// https://docs.shipstation.com/openapi/labels/list_labels

import type { OptionalLink } from '../resources/pagination';
import type { CarrierCode } from './Carrier';
import type { LabelDownload } from './LabelDownload';
import type { Package } from './Package';
import type { PaperlessDownload } from './PaperlessDownload';
import type { MonetaryValue } from './Rate';

export type LabelLayout = '4x6' | 'letter';

export type LabelFormat = 'pdf' | 'png' | 'zpl';

export type LabelStatus =
  /**
   * When labels are created in a [batch], it may take a few minutes for all of the labels in the batch to be created.
   * During this period, they will be in `processing` status.
   */
  | 'processing'
  /** The label was successfully created */
  | 'completed'
  /** The label could not be created due to an error, such as an invalid delivery address */
  | 'error'
  /** The label has been voided */
  | 'voided';

interface AlternativeIdentifier {
  /**
   * The type of alternative_identifier that corresponds to the value.
   *
   * @example "last_mile_tracking_number"
   */
  type: string;
  /**
   * The value of the alternative_identifier.
   *
   * @example "12345678912345678912"
   */
  value: string;
}

export interface LabelPackage extends Omit<Package, 'package_name' | 'products'> {
  tracking_number: string;
  /** Reference to the various downloadable file formats for the generated label */
  label_download: LabelDownload;
  /** A link to a related resource, or an empty object if there is no resource to link to */
  form_download: OptionalLink;
  /** A link to a related resource, or an empty object if there is no resource to link to */
  qr_code_download: OptionalLink;
  /** The paperless details which may contain elements like `href`, `instructions` and `handoff_code`. */
  paperless_download: PaperlessDownload;
  /**
   * Package sequence (int32)
   *
   * @example 34
   */
  sequence: number;
  /**
   * Whether the package has label documents available for download
   *
   * @example true
   */
  has_label_documents: boolean;
  /**
   * Whether the package has form documents available for download
   *
   * @example true
   */
  has_form_documents: boolean;
  /**
   * Whether the package has QR code documents available for download
   *
   * @example true
   */
  has_qr_code_documents: boolean;
  /**
   * Whether the package has paperless documents available for download
   *
   * @example true
   */
  has_paperless_label_documents: boolean;
  /** Alternative identifiers associated with this package. */
  alternative_identifiers: Array<AlternativeIdentifier>;
}

export interface Label
  extends Pick<LabelPackage, 'label_download' | 'form_download' | 'paperless_download' | 'alternative_identifiers'> {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-123456"
   */
  label_id: string;
  /**
   * @example "completed"
   */
  status: LabelStatus;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-123456"
   */
  shipment_id: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date, but not a specific time. The
   * value may contain a time component, but it will be set to `00:00:00` UTC by ShipStation.
   *
   * @example "2018-09-23"
   */
  ship_date: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  created_at: string;
  /** A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance. */
  shipment_cost: MonetaryValue;
  /** A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance. */
  insurance_cost: MonetaryValue;
  /** A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance. */
  requested_comparison_amount: MonetaryValue;
  /**
   * The tracking number for the package. Tracking number formats vary across carriers.
   *
   * @example "782758401696"
   */
  tracking_number: string;
  /**
   * Indicates whether this is a return label. You may also want to set the `rma_number` so you know what is being
   * returned.
   *
   * @example true
   */
  is_return_label: boolean;
  /**
   * An optional Return Merchandise Authorization number. This field is useful for return labels. You can set it to any
   * string value.
   *
   * @example "asd12323"
   */
  rma_number: string;
  /**
   * Indicates whether this is an international shipment. That is, the originating country and destination country are
   * different.
   *
   * @example true
   */
  is_international: boolean;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-123456"
   */
  batch_id: string;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-1234567"
   */
  carrier_id: string;
  /** Determines when the user's account will be charged for the label. */
  charge_event: 'carrier_default' | 'on_creation' | 'on_carrier_acceptance';
  /**
   * A carrier service, such as `fedex_ground`, `usps_first_class_mail`, `flat_rate_envelope`, etc.
   * `^[a-z0-9]+(_[a-z0-9-]+)* ?$`

   * @example "usps_first_class_mail"
   */
  service_code: string;
  /**
   * A package type, such as `thick_envelope`, `small_flat_rate_box`, `large_package`, etc. Use the code `package` for
   * custom or unknown package types. [1-50] characters `^[a-z0-9]+(_[a-z0-9]+)*$`
   *
   * @example "small_flat_rate_box"
   */
  package_code: string;
  /**
   * Indicates whether the label has been voided
   *
   * @example true
   */
  voided: boolean;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  voided_at: string;

  /**
   * The available layouts (sizes) in which shipping labels can be downloaded. The label format determines which sizes
   * are supported. `4x6` is supported for all label formats, whereas `letter` (8.5" x 11") is only supported for `pdf`
   * format.
   *
   * @default "4x6"
   */
  label_layout: LabelLayout;
  /**
   * The possible file formats in which shipping labels can be downloaded. We recommend `pdf` format because it is
   * supported by all carriers, whereas some carriers do not support the `png` or `zpl` formats.
   *
   * - `pdf`: All carriers
   * - `png`: `fedex` | `stamps_com` | `ups` | `usps`
   * - `zpl`: `access_worldwide` | `apc` | `asendia` | `dhl_global_mail` | `dhl_express` | `dhl_express_australia` |
   * `dhl_express_canada` | `dhl_express_worldwide` | `dhl_express_uk` | `dpd` | `endicia` | `fedex` | `fedex_uk` | `firstmile` | `imex` | `newgistics` | `ontrac` | `rr_donnelley` | `stamps_com` | `ups` | `usps`
   *
   * @default "pdf"
   */
  label_format: LabelFormat;
  /**
   * The display format that the label should be shown in.
   *
   * @default "label"
   */
  display_scheme: 'label' | 'qr_code' | 'label_and_qr_code' | 'paperless' | 'label_and_paperless';
  /**
   * Indicates whether the shipment is trackable, in which case the `tracking_status` field will reflect the current
   * status and each package will have a `tracking_number`.
   *
   * @example true
   */
  trackable: true;
  /**
   * Used to identify an image resource. (>= 4 characters)
   *
   * @example "img_DtBXupDBxREpHnwEXhTfgK"
   */
  label_image_id: string;
  /**
   * A shipping carrier, such as `fedex`, `dhl_express`, `stamps_com`, etc. `^[a-z0-9]+(_[a-z0-9]+)*$`
   *
   * @example "dhl_express"
   */
  carrier_code: CarrierCode;
  tracking_status: 'unknown' | 'in_transit' | 'error' | 'delivered';
  /** A link to a related resource, or an empty object if there is no resource to link to */
  insurance_claim: OptionalLink;
  packages: Array<LabelPackage>;
  /**
   * The URL to track the package. This URL is provided by the carrier and is unique to the tracking number.
   *
   * @example "https://www.fedex.com/fedextrack/?action=track&trackingnumber=1234"
   */
  tracking_url: string;
}
