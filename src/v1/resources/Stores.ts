import type ShipStation from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type {
	DeactivateStoreResponse,
	GetRefreshRateResponse,
	ListMarketplacesResponse,
	ListStoresOptions,
	ListStoresResponse,
	ReactivateStoreResponse,
	RefreshStoreOptions,
	RefreshStoreResponse,
	StoreResponseItem,
} from "../types";

export class Stores extends BaseResource {
	constructor(shipstation: ShipStation) {
		super(shipstation, "stores");
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/stores/get-store/)
	 *
	 * This Get Store API call uses the `storeId` property to retrieve information related to a specific store.
	 *
	 * To find the `storeId` for a specific store and also to see the list of stores installed in your account, make a
	 * [List Stores call](https://www.shipstation.com/docs/api/stores/list/).
	 *
	 * @param storeId Unique identifier for the store.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The store details.
	 */
	public async get(
		storeId: number,
		callOptions?: ShipStationCallOptions,
	): Promise<StoreResponseItem> {
		return this.shipstation.request<StoreResponseItem>(
			{
				url: `${this.baseUrl}/${storeId}`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/stores/list/)
	 *
	 * Retrieve the list of installed stores on the account with this API call.
	 *
	 * @param params The parameters for the request.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The list of stores.
	 */
	public async list(
		params?: ListStoresOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<ListStoresResponse> {
		return this.shipstation.request<ListStoresResponse>(
			{
				params,
				url: this.baseUrl,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/stores/list-marketplaces/)
	 *
	 * Lists the marketplaces that can be integrated with ShipStation.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The list of marketplaces.
	 */
	public async listMarketplaces(
		callOptions?: ShipStationCallOptions,
	): Promise<ListMarketplacesResponse> {
		return this.shipstation.request<ListMarketplacesResponse>(
			{
				url: `${this.baseUrl}/marketplaces`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/stores/deactivate/)
	 *
	 * Deactivates the specified store.
	 *
	 * **Requirements:**
	 * - You'll need a `storeId` to make this API call.
	 * - To find the `storeId` for a specific store and also to see the list of stores installed in your account, make a
	 * [List Stores call](https://www.shipstation.com/docs/api/stores/list/).
	 *
	 * @param storeId ID of the store to deactivate.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The status of the deactivate operation.
	 */
	public async deactivate(
		storeId: number,
		callOptions?: ShipStationCallOptions,
	): Promise<DeactivateStoreResponse> {
		return this.shipstation.request<DeactivateStoreResponse>(
			{
				url: `${this.baseUrl}/deactivate`,
				method: "POST",
				data: { storeId },
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/stores/get-refresh-status/)
	 *
	 * Retrieves the refresh status of a given store.
	 *
	 * **Requirements:**
	 * - You'll need a `storeId` to make this API call.
	 * - To find the `storeId` for a specific store and also to see the list of stores installed in your account, make a
	 * [List Stores call](https://www.shipstation.com/docs/api/stores/list/).
	 *
	 * @param storeId Specifies the store whose status will be retrieved.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The refresh rate data of the store.
	 */
	public async getRefreshRate(
		storeId: number,
		callOptions?: ShipStationCallOptions,
	): Promise<GetRefreshRateResponse> {
		return this.shipstation.request<GetRefreshRateResponse>(
			{
				url: `${this.baseUrl}/getrefreshstatus`,
				method: "GET",
				params: { storeId },
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/stores/reactivate/)
	 *
	 * Reactivates the specified store.
	 *
	 * **Requirements:**
	 * - You'll need a `storeId` to make this API call.
	 * - To find the `storeId` for a specific store and also to see the list of stores installed in your account, make a
	 * [List Stores call](https://www.shipstation.com/docs/api/stores/list/).
	 *
	 * @param storeId ID of the store to reactivate.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The status of the reactivate operation.
	 */
	public async reactivate(
		storeId: number,
		callOptions?: ShipStationCallOptions,
	): Promise<ReactivateStoreResponse> {
		return this.shipstation.request<ReactivateStoreResponse>(
			{
				url: `${this.baseUrl}/reactivate`,
				method: "POST",
				data: { storeId },
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/stores/refresh/)
	 *
	 * Initiates a store refresh.
	 *
	 * To find the `storeId` for a specific store and also to see the list of stores installed in your account, make a
	 * [List Stores call](https://www.shipstation.com/docs/api/stores/list/).
	 *
	 * @param params The parameters for the request.
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The status of the refresh operation.
	 */
	public async refresh(
		params?: RefreshStoreOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<RefreshStoreResponse> {
		return this.shipstation.request<RefreshStoreResponse>(
			{
				url: `${this.baseUrl}/refresh`,
				method: "POST",
				params,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/stores/update/)
	 *
	 * Updates an existing store. This call does not currently support partial updates. The entire resource must be
	 * provided in the body of the request.
	 *
	 * This PUT call uses the `storeId` property to update information related to a specific store.
	 *
	 * To find the `storeId` for a specific store and also to see the list of stores installed in your account, make a
	 * [List Stores call](https://www.shipstation.com/docs/api/stores/list/).
	 *
	 * @param storeId Unique identifier for the store
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns The newly updated store.
	 */
	public async update(
		storeId: number,
		data: StoreResponseItem,
		callOptions?: ShipStationCallOptions,
	): Promise<StoreResponseItem> {
		return this.shipstation.request<StoreResponseItem>(
			{
				url: `${this.baseUrl}/${storeId}`,
				method: "PUT",
				data,
			},
			callOptions,
		);
	}
}
