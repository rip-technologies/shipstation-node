export interface PackageTypeDimensions {
  /**
   * The dimension units that are supported by ShipStation.
   *
   * @default "inch"
   */
  unit: 'inch' | 'cm';
  /**
   * The length of the package, in the specified unit (>= 0)
   *
   * @default 0
   * @example 2
   */
  length: number;
  /**
   * The width of the package, in the specified unit (>= 0)
   *
   * @default 0
   * @example 2
   */
  width: number;
  /**
   * The height of the package, in the specified unit (>= 0)
   *
   * @default 0
   * @example 1
   */
  height: number;
}

export interface PackageType {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a package type, label, shipment, etc.
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  package_id?: string;
  /**
   * A package type, such as `thick_envelope`, `small_flat_rate_box`, `large_package`, etc. Use the code `package` for
   * custom or unknown package types.
   *
   * @example "small_flat_rate_box"
   */
  package_code: string;
  /**
   * @example "laptop_box"
   */
  name: string;
  /**
   * The dimensions of a package
   */
  dimensions?: Array<PackageTypeDimensions>;
  /**
   * Provides a helpful description for the custom package. (<= 500 characters)
   *
   * @example "Packaging for laptops"
   */
  description: string | null;
}
