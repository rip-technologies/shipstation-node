import type { OptionalLink } from '../resources/pagination';
import type { ShipStationAPIError } from './Error';
import type { LabelDownload } from './LabelDownload';
import type { PaperlessDownload } from './PaperlessDownload';

export type LabelLayout = '4x6' | 'letter';

export type LabelFormat = 'pdf' | 'png' | 'zpl';

export type BatchStatus =
  | 'open'
  | 'queued'
  | 'processing'
  | 'completed'
  | 'completed_with_errors'
  | 'archived'
  | 'notifying'
  | 'invalid';

export interface Batch {
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
   * A string that uniquely identifies a ShipStation resource, such as a batch, label, shipment, etc.
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  batch_id: string;
  /**
   * The batch number. (>= 0 characters)
   *
   * @example "123456"
   */
  batch_number: string;
  /**
   * A string that uniquely identifies the external batch (>= 0 characters)
   *
   * @example "12323aaaar"
   */
  external_batch_id: string;
  /**
   * Custom notes you can add for each created batch
   *
   * @default ""
   * @example "Batch for morning shipment"
   */
  batch_notes: string;
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
  processed_at: string;
  /**
   * The number of errors that occurred while generating the batch (int32 >= 0)
   *
   * @example 2
   */
  errors: number;
  /** The errors associated with the failed API call */
  process_errors: Array<ShipStationAPIError>;
  /**
   * The number of warnings that occurred while generating the batch (int32 >= 0)
   *
   * @example 1
   */
  warnings: number;
  /**
   * The number of labels generated in the batch (int32 >= 0)
   *
   * @example 1
   */
  completed: number;
  /**
   * The number of forms for customs that are available for download (int32 >= 0)
   *
   * @example 3
   */
  forms: number;
  /**
   * The total of errors, warnings, and completed properties
   *
   * @example 2
   */
  count: number;
  /** A link to a related resource, or an empty object if there is no resource to link to */
  batch_shipments_url: OptionalLink;
  /** A link to a related resource, or an empty object if there is no resource to link to */
  batch_labels_url: OptionalLink;
  /** A link to a related resource, or an empty object if there is no resource to link to */
  batch_errors_url: OptionalLink;
  /** Reference to the various downloadable file formats for the generated label */
  label_download: LabelDownload;
  /** A link to a related resource, or an empty object if there is no resource to link to */
  form_download: OptionalLink;
  /** The paperless details which may contain elements like `href`, `instructions` and `handoff_code`. */
  paperless_download: PaperlessDownload;
  status: BatchStatus;
}
