import type { Manifest, ManifestDownload } from '../models';
import type { PaginatedRequest, PaginatedResponse } from './pagination';
export interface ListManifestsOptions extends PaginatedRequest {
  /**
   * Warehouse ID [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  warehouse_id?: string;
  /**
   * ship date start range
   *
   * @example 2018-09-23T15:00:00.000Z
   */
  ship_date_start?: string;
  /**
   * ship date end range
   *
   * @example 2018-09-23T15:00:00.000Z
   */
  ship_date_end?: string;
  /**
   * Used to create a filter for when a resource was created (ex. A shipment that was created after a certain time)
   *
   * @example 2019-03-12T19:24:13.657Z
   */
  created_at_start?: string;
  /**
   * Used to create a filter for when a resource was created, (ex. A shipment that was created before a certain time)
   *
   * @example 2019-03-12T19:24:13.657Z
   */
  created_at_end?: string;
  /**
   * Carrier ID [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id?: string;
  /**
   * Array of label ids
   *
   * @example ["se-28529731"]
   */
  label_ids?: Array<string>;
}

export interface ListManifestsResponse extends PaginatedResponse {
  /** The list of available manifests */
  manifests: Array<Manifest>;
}

interface CreateManifestByLabelIdsData {
  /**
   * The list of label ids to include in the manifest
   *
   * @example ["se-28529731"]
   */
  label_ids: Array<string>;
}

interface CreateManifestByObjectData {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id: string;
  /**
   * The list of label ids to exclude from the manifest
   *
   * @example ["se-28529731"]
   */
  excluded_label_ids: Array<string>;
  /**
   * The list of label ids to include for the manifest
   *
   * @example ["se-28529731"]
   */
  label_ids: Array<string>;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  warehouse_id: string;
  /**
   * The ship date that the shipment will be sent out on
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  ship_date: string;
}

export type CreateManifestData = CreateManifestByLabelIdsData | CreateManifestByObjectData;

export interface CreateManifestResponse {
  /** Resulting Manifests */
  manifests: Array<Manifest>;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  manifest_request_id: string;
  status: 'in_progress' | 'completed';
  /**
   * A UUID (a.k.a. GUID) that uniquely identifies a resource
   *
   * @example "aa3d8e8e-462b-4476-9618-72db7f7b7009"
   */
  request_id: string;
  /**
   * @deprecated
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  manifest_id: string;
  /**
   * @deprecated
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  form_id: string;
  /**
   * @deprecated
   * The date-time that the manifest was created
   *
   * @example "2019-07-12T13:37:39.05Z"
   */
  created_at: string;
  /**
   * @deprecated
   * The date-time that the manifests shipments will be picked up
   *
   * @example "2019-07-12T13:37:39.05Z"
   */
  ship_date: string;
  /**
   * @deprecated
   * The number of shipments that are included in this manifest (int32 >= 1)
   *
   * @example 100
   */
  shipments: number;
  /**
   * @deprecated
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  warehouse_id: string;
  /**
   * @deprecated
   * A string that uniquely identifies the submission
   *
   * @example "9475711899564878915476"
   */
  submission_id: string;
  /**
   * @deprecated
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id: string;
  /**
   * @deprecated
   * Object containing the href link to download the manifest file
   */
  manifest_download: ManifestDownload;
  /**
   * @deprecated
   * An array of the label ids used in this manifest.
   *
   * @example ["se-28529731"]
   */
  label_ids: Array<string>;
}
