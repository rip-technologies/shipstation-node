import type BaseAPI from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type {
	CreateOrUpdatePackageTypeOptions,
	ListPackageTypesResponse,
	PackageType,
} from "../types";

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/package_types)
 *
 * Create custom package types to use for your shipments, rather than the carriers' default package types.
 */
export class PackageTypes extends BaseResource {
	constructor(shipstation: BaseAPI) {
		super(shipstation, "packages");
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/package_types/list_package_types)
	 *
	 * List the custom package types associated with the account
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns Package pickup details
	 */
	public async list(
		callOptions?: ShipStationCallOptions,
	): Promise<ListPackageTypesResponse> {
		return this.shipstation.request<ListPackageTypesResponse>(
			{
				url: this.baseUrl,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/package_types/create_package_type)
	 *
	 * Create a custom package type
	 *
	 * @param data Data for creating the package type
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The newly created package type
	 */
	public async create(
		data: CreateOrUpdatePackageTypeOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<PackageType> {
		return this.shipstation.request<PackageType>(
			{
				url: this.baseUrl,
				method: "POST",
				data,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/package_types/get_package_type_by_id)
	 *
	 * Get Custom Package Type by ID
	 *
	 * @param packageId ID of the package type to get [1-25] characters `^se(-[a-z0-9]+)+$`
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The package type with the given ID
	 */
	public async getById(
		packageId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<PackageType> {
		return this.shipstation.request<PackageType>(
			{
				url: `${this.baseUrl}/${packageId}`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/package_types/update_package_type)
	 *
	 * Update the custom package type object by ID
	 *
	 * @param packageId ID of the package type to update [1-25] characters `^se(-[a-z0-9]+)+$`
	 * @param data Data for updating the package type
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The updated package type
	 */
	public async update(
		packageId: string,
		data: CreateOrUpdatePackageTypeOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<PackageType> {
		return this.shipstation.request<PackageType>(
			{
				url: `${this.baseUrl}/${packageId}`,
				method: "PUT",
				data,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/package_types/delete_package_typ)
	 *
	 * Delete a custom package using the ID
	 *
	 * @param packageId ID of the package type to delete [1-25] characters `^se(-[a-z0-9]+)+$`
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 */
	public async delete(
		packageId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<void> {
		await this.shipstation.request(
			{
				url: `${this.baseUrl}/${packageId}`,
				method: "DELETE",
			},
			callOptions,
		);
	}
}
