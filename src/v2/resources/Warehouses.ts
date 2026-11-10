import type BaseAPI from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type { ListWarehousesResponse, Warehouse } from "../types";

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/warehouses)
 *
 * Get warehouse details like warehouse ID and related addresses using the warehouses endpoint.
 */
export class Warehouses extends BaseResource {
	constructor(shipstation: BaseAPI) {
		super(shipstation, "warehouses");
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/warehouses/get_warehouse_by_id)
	 *
	 * Retrieve warehouse data based on the warehouse ID
	 *
	 * @param warehouseId [1-25] characters `^se(-[a-z0-9]+)+$`
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns Warehouse details
	 */
	public async getById(
		warehouseId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<Warehouse> {
		return this.shipstation.request<Warehouse>(
			{
				url: `${this.baseUrl}/${warehouseId}`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/warehouses/list_warehouses)
	 *
	 * Retrieve a list of warehouses associated with this account.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns A list of warehouses
	 */
	public async list(
		callOptions?: ShipStationCallOptions,
	): Promise<ListWarehousesResponse> {
		return this.shipstation.request<ListWarehousesResponse>(
			{
				url: this.baseUrl,
				method: "GET",
			},
			callOptions,
		);
	}
}
