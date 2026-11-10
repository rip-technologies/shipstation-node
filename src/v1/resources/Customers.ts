import type ShipStation from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type {
	CustomerResponseItem,
	ListCustomersOptions,
	ListCustomersResponse,
} from "../types";

export class Customers extends BaseResource {
	constructor(shipstation: ShipStation) {
		super(shipstation, "customers");
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/customers/get-customer/)
	 *
	 * To find a specific customerId, make an API Call to
	 * [list customers](https://www.shipstation.com/docs/api/customers/list/) associated with your account.
	 *
	 * @param customerId The system-generated identifier for the Customer.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The details of the customer.
	 */
	public async get(
		customerId: number,
		callOptions?: ShipStationCallOptions,
	): Promise<CustomerResponseItem> {
		return this.shipstation.request<CustomerResponseItem>(
			{
				url: `${this.baseUrl}/${customerId}`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/customers/list/)
	 *
	 * Obtains a list of customers that match the specified criteria.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns A list of tags for the account.
	 */
	public async list(
		params: ListCustomersOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<ListCustomersResponse> {
		return this.shipstation.request<ListCustomersResponse>(
			{
				url: this.baseUrl,
				method: "GET",
				params,
			},
			callOptions,
		);
	}
}
