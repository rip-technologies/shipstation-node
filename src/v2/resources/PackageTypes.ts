import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type { CreateOrUpdatePackageTypeOptions, ListPackageTypesResponse, PackageType } from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/package_types)
 *
 * Create custom package types to use for your shipments, rather than the carriers' default package types.
 */
export class PackageTypes extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'packages');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/package_types/list_package_types)
   *
   * List the custom package types associated with the account
   *
   * @returns Package pickup details
   */
  public async list(): Promise<ListPackageTypesResponse> {
    return this.shipstation.request<ListPackageTypesResponse>({
      url: this.baseUrl,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/package_types/create_package_type)
   *
   * Create a custom package type
   *
   * @param data Data for creating the package type
   *
   * @returns The newly created package type
   */
  public async create(data: CreateOrUpdatePackageTypeOptions): Promise<PackageType> {
    return this.shipstation.request<PackageType>({
      url: this.baseUrl,
      method: 'POST',
      data
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/package_types/get_package_type_by_id)
   *
   * Get Custom Package Type by ID
   *
   * @param packageId ID of the package type to get [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @returns The package type with the given ID
   */
  public async getById(packageId: string): Promise<PackageType> {
    return this.shipstation.request<PackageType>({
      url: `${this.baseUrl}/${packageId}`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/package_types/update_package_type)
   *
   * Update the custom package type object by ID
   *
   * @param packageId ID of the package type to update [1-25] characters `^se(-[a-z0-9]+)+$`
   * @param data Data for updating the package type
   *
   * @returns The updated package type
   */
  public async update(packageId: string, data: CreateOrUpdatePackageTypeOptions): Promise<PackageType> {
    return this.shipstation.request<PackageType>({
      url: `${this.baseUrl}/${packageId}`,
      method: 'PUT',
      data
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/package_types/delete_package_typ)
   *
   * Delete a custom package using the ID
   *
   * @param packageId ID of the package type to delete [1-25] characters `^se(-[a-z0-9]+)+$`
   */
  public async delete(packageId: string): Promise<void> {
    await this.shipstation.request({
      url: `${this.baseUrl}/${packageId}`,
      method: 'DELETE'
    });
  }
}
