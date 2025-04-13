import type { Batch, BatchStatus } from '../models';
import type { PaginatedRequest, PaginatedResponse } from './pagination';

interface BatchProcessLabelsOptions extends Pick<Batch, 'label_layout' | 'label_format'> {
  /**
   * When 'true', the batch will be enqueued for processing
   *
   * @example true
   */
  create_batch_and_process_labels?: boolean;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  ship_date?: string;
  /**
   * The display format that the label should be shown in.
   *
   * @default "label"
   */
  display_scheme?: 'label' | 'qr_code' | 'label_and_qr_code' | 'paperless' | 'label_and_paperless';
}

export interface ListBatchesOptions extends PaginatedRequest {
  status?: BatchStatus;
  /** Batch Number */
  batch_number?: string;
  sort_by?: 'ship_date' | 'processed_at' | 'created_at';
}

export interface ListBatchesResponse extends PaginatedResponse {
  /** Batch List */
  batches: Array<Batch>;
}

export interface CreateBatchOptions {
  /**
   * A string that uniquely identifies the external batch [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  external_batch_id?: string;
  /**
   * Add custom messages for a particular batch
   *
   * @example "This is my batch"
   */
  batch_notes?: string;
  /**
   * Array of shipment IDs used in the batch
   *
   * @example ["se-28529731"]
   */
  shipment_ids?: Array<string>;
  /**
   * Array of rate IDs used in the batch
   *
   * @example ["se-28529731"]
   */
  rate_ids?: Array<string>;
  process_labels?: BatchProcessLabelsOptions;
}

export interface GetBatchErrorsOptions extends Pick<PaginatedRequest, 'page'> {
  /** int32 (>= 1) */
  pagesize?: number;
}

export interface BatchResponseError {
  /**
   * Error message associated with the shipment.
   *
   * @example "Recipient address has not been verified."
   */
  error?: string;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a batch, label, shipment, etc. [1-25] characters
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  shipment_id?: string;
  /**
   * An external shipment id associated with the shipment
   *
   * @example "1234567"
   */
  external_shipment_id?: string;
}

export interface GetBatchErrorsResponse extends Pick<PaginatedResponse, 'links'> {
  /** Batch Errors */
  errors: Array<BatchResponseError>;
}

export interface ProcessBatchLabelsOptions
  extends Partial<Pick<Batch, 'label_layout' | 'label_format'>>,
    Pick<BatchProcessLabelsOptions, 'display_scheme'> {
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  ship_date: string;
}

export type RemoveFromBatchOptions = Required<Pick<CreateBatchOptions, 'shipment_ids'>> &
  Pick<CreateBatchOptions, 'rate_ids'>;
