import type BaseAPI from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type {
	InventoryWarehouse,
	ListInventoryWarehousesOptions,
	ListInventoryWarehousesResponse,
} from "../types";

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/inventory)
 *
 * Manage inventory, adjust quantities, and handle warehouses and locations.
 */
export class InventoryWarehouses extends BaseResource {
	constructor(shipstation: BaseAPI) {
		super(shipstation, "inventory_warehouses");
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/inventory/getinventorywarehouses)
	 *
	 * @param options Options for the request
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns List of inventory warehouses
	 */
	public async list(
		options?: ListInventoryWarehousesOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<ListInventoryWarehousesResponse> {
		return this.shipstation.request<ListInventoryWarehousesResponse>(
			{
				url: this.baseUrl,
				method: "GET",
				params: options,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/inventory/addnewinventorywarehouse)
	 *
	 * @param name Name of the inventory warehouse
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns The newly created inventory warehouse
	 */
	public async create(
		name: string,
		callOptions?: ShipStationCallOptions,
	): Promise<InventoryWarehouse> {
		return this.shipstation.request<InventoryWarehouse>(
			{
				url: this.baseUrl,
				method: "POST",
				data: { name },
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/inventory/getinventorywarehousebyid)
	 *
	 * @param inventoryWarehouseId ID of the inventory warehouse to get
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns The inventory warehouse with the given ID
	 */
	public async getById(
		inventoryWarehouseId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<InventoryWarehouse> {
		return this.shipstation.request<InventoryWarehouse>(
			{
				url: `${this.baseUrl}/${inventoryWarehouseId}`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/inventory/updateinventorywarehouse)
	 *
	 * @param inventoryWarehouseId ID of the inventory warehouse to update
	 * @param name New name for the inventory warehouse
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns The updated inventory warehouse
	 */
	public async update(
		inventoryWarehouseId: string,
		name: string,
		callOptions?: ShipStationCallOptions,
	): Promise<InventoryWarehouse> {
		return this.shipstation.request<InventoryWarehouse>(
			{
				url: `${this.baseUrl}/${inventoryWarehouseId}`,
				method: "PUT",
				data: { name },
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/inventory/deleteinventorywarehouse)
	 *
	 * @param inventoryWarehouseId ID of the inventory warehouse to delete
	 *
	 * @param callOptions Axios request config for this call only
	 */
	public async delete(
		inventoryWarehouseId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<void> {
		await this.shipstation.request(
			{
				url: `${this.baseUrl}/${inventoryWarehouseId}`,
				method: "DELETE",
			},
			callOptions,
		);
	}
}
