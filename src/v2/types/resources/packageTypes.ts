import type { PackageType } from '../models';

export interface ListPackageTypesResponse {
  /** An array of custom package types */
  packages: Array<PackageType>;
}

export type CreateOrUpdatePackageTypeOptions = Omit<PackageType, 'package_id'> &
  Required<Pick<PackageType, 'package_id'>>;
