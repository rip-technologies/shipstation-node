export interface ManifestDownload {
  /**
   * A URL
   *
   * @example "http://api.shipstation.com/v2/labels/se-28529731"
   */
  href: string;
}

export interface Manifest {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc.
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  manifest_id: string;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc.
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  form_id: string;
  /**
   * The date-time that the manifest was created
   *
   * @example "2019-07-12T13:37:39.05Z"
   */
  created_at: string;
  /**
   * The date-time that the manifests shipments will be picked up
   *
   * @example "2019-07-12T13:37:39.05Z"
   */
  ship_date: string;
  /**
   * The number of shipments that are included in this manifest (int32 >= 1)
   *
   * @example 100
   */
  shipments: number;
  /**
   * An array of the label ids used in this manifest.
   *
   * @example ["se-28529731"]
   */
  label_ids: Array<string>;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc.
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  warehouse_id: string;
  /**
   * A string that uniquely identifies the submission
   *
   * @example "9475711899564878915476"
   */
  submission_id: string;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc.
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id: string;
  /** Object containing the href link to download the manifest file */
  manifest_download: ManifestDownload;
}
