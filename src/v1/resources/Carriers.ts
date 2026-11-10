import type ShipStation from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type {
	AddFundsResponse,
	CarrierResponseItem,
	ListCarriersResponse,
	ListPackagesResponse,
	ListServicesResponse,
} from "../types";

export class Carriers extends BaseResource {
	constructor(shipstation: ShipStation) {
		super(shipstation, "carriers");
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/carriers/get/)
	 *
	 * Retrieves the shipping carrier account details for the specified `carrierCode`. Use this method to determine a
	 * carrier's account balance.
	 *
	 * To find a specific `carrierCode`, make an API Call to [list the carriers](https://www.shipstation.com/docs/api/carriers/list/)
	 * associated with your account.
	 *
	 * @param carrierCode The code of the carrier to retrieve.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The carrier details.
	 */
	public async get(
		carrierCode: string,
		callOptions?: ShipStationCallOptions,
	): Promise<CarrierResponseItem> {
		return this.shipstation.request<CarrierResponseItem>(
			{
				url: this.baseUrl,
				method: "GET",
				params: { carrierCode },
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/carriers/list/)
	 *
	 * List all shipping providers connected to this account.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns A list of carriers.
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
	 * [Official Documentation](https://www.shipstation.com/docs/api/carriers/add-funds/)
	 *
	 * **Requires approval from apisupport@shipstation.com before use...**
	 *
	 * Adds funds to a carrier account using the payment information on file.
	 *
	 * **Requirements:**
	 * - You'll need a `carrierCode` to make this API call.
	 * - To find a specific `carrierCode`, make an API call to
	 * [list the carriers](https://www.shipstation.com/docs/api/carriers/list/) associated with your account.
	 *
	 * @param carrierCode The carrier to add funds to.
	 * @param amount The dollar amount to add to the account. The minimum value that can be added is $10.00. The maximum value is $10,000.00.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The updated carrier details.
	 */
	public async addFunds(
		carrierCode: string,
		amount: number,
		callOptions?: ShipStationCallOptions,
	): Promise<AddFundsResponse> {
		return this.shipstation.request<AddFundsResponse>(
			{
				url: `${this.baseUrl}/addfunds`,
				method: "POST",
				data: { carrierCode, amount },
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/carriers/list-packages/)
	 *
	 * Retrieves a list of packages for the specified carrier.
	 *
	 * To find a specific `carrierCode`, make an API Call to
	 * [list the carriers](https://www.shipstation.com/docs/api/carriers/list/) associated with your account.
	 *
	 * @param carrierCode The carrier's code
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns A list of packages.
	 */
	public async listPackages(
		carrierCode: string,
		callOptions?: ShipStationCallOptions,
	): Promise<ListPackagesResponse> {
		return this.shipstation.request<ListPackagesResponse>(
			{
				url: `${this.baseUrl}/listpackages`,
				method: "GET",
				params: { carrierCode },
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/carriers/list-packages/)
	 *
	 * Retrieves the list of available shipping services provided by the specified carrier.
	 *
	 * To find a specific `carrierCode`, make an API Call to
	 * [list the carriers](https://www.shipstation.com/docs/api/carriers/list/) associated with your account.
	 *
	 * @param carrierCode The carrier's code
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns A list of services.
	 */
	public async listServices(
		carrierCode: string,
		callOptions?: ShipStationCallOptions,
	): Promise<ListServicesResponse> {
		return this.shipstation.request<ListServicesResponse>(
			{
				url: `${this.baseUrl}/listservices`,
				method: "GET",
				params: { carrierCode },
			},
			callOptions,
		);
	}
}
