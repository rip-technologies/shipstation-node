import type BaseAPI from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type {
	GetCarrierByIdResponse,
	GetCarrierOptionsResponse,
	ListCarrierPackageTypesResponse,
	ListCarrierServicesResponse,
	ListCarriersResponse,
} from "../types";

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/carriers)
 *
 * Retreive useful details about the carriers connected to your accounts, including carrier IDs, service IDs, advanced
 * options, and available carrier package types.
 */
export class Carriers extends BaseResource {
	constructor(shipstation: BaseAPI) {
		super(shipstation, "carriers");
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/carriers/get_carrier_by_id)
	 *
	 * Retrive details about a specific carrier by its carrier id.
	 *
	 * @param carrierId [1-25] characters `^se(-[a-z0-9]+)+$`
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns Carrier details
	 */
	public async getById(
		carrierId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<GetCarrierByIdResponse> {
		return this.shipstation.request<GetCarrierByIdResponse>(
			{
				url: `${this.baseUrl}/${carrierId}`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/carriers/list_carriers)
	 *
	 * List all carriers that have been added to this account.
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns A list of carriers
	 */
	public async list(
		callOptions?: ShipStationCallOptions,
	): Promise<ListCarriersResponse> {
		return this.shipstation.request<ListCarriersResponse>(
			{
				url: this.baseUrl,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/carriers/get_carrier_options)
	 *
	 * Get a list of the options available for a specific carriers.
	 *
	 * @param carrierId [1-25] characters `^se(-[a-z0-9]+)+$`
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns A list of options for the carrier
	 */
	public async getOptions(
		carrierId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<GetCarrierOptionsResponse> {
		return this.shipstation.request<GetCarrierOptionsResponse>(
			{
				url: `${this.baseUrl}/${carrierId}/options`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/carriers/list_carrier_services)
	 *
	 * List the services associated with a specific carrier id.
	 *
	 * @param carrierId [1-25] characters `^se(-[a-z0-9]+)+$`
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns A list of services for the carrier
	 */
	public async listServices(
		carrierId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<ListCarrierServicesResponse> {
		return this.shipstation.request<ListCarrierServicesResponse>(
			{
				url: `${this.baseUrl}/${carrierId}/services`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/carriers/list_carrier_services)
	 *
	 * List the package types associated with a specific carrier.
	 *
	 * @param carrierId [1-25] characters `^se(-[a-z0-9]+)+$`
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns A list of package types for the carrier
	 */
	public async listPackageTypes(
		carrierId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<ListCarrierPackageTypesResponse> {
		return this.shipstation.request<ListCarrierPackageTypesResponse>(
			{
				url: `${this.baseUrl}/${carrierId}/packages`,
				method: "GET",
			},
			callOptions,
		);
	}
}
