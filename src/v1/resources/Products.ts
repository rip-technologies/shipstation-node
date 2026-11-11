import type ShipStation from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type {
	GetProductResponse,
	ListProductsOptions,
	ListProductsResponse,
	Product,
	UpdateProductResponse,
} from "../types";

export class Products extends BaseResource {
	constructor(shipstation: ShipStation) {
		super(shipstation, "products");
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/products/get-product/)
	 *
	 * **Requirements:**
	 * - You'll need a `productId` to make this API call.
	 * - Find a list of products for this account (`productId`) by a
	 * [List Products call](https://www.shipstation.com/docs/api/products/list/).
	 *
	 * @param productId The system-generated identifier for the Product.
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns The product.
	 */
	public async get(
		productId: number,
		callOptions?: ShipStationCallOptions,
	): Promise<GetProductResponse> {
		return this.shipstation.request<GetProductResponse>(
			{
				url: `${this.baseUrl}/${productId}`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/products/list/)
	 *
	 * Obtains a list of products that match the specified criteria.
	 *
	 * @param params The parameters for the request.
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns The list of products.
	 */
	public async list(
		params?: ListProductsOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<ListProductsResponse> {
		return this.shipstation.request<ListProductsResponse>(
			{
				url: this.baseUrl,
				method: "GET",
				params,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/products/update/)
	 *
	 * Updates an existing product. This call does not currently support partial updates. The entire resource must be
	 * provided in the body of the request.
	 *
	 * **Requirements:**
	 * - You'll need a `productId` to make this API call.
	 * - Find a list of products for this account (`productId`) by a
	 * [List Products call](https://www.shipstation.com/docs/api/products/list/).
	 *
	 * @param data The product data.
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns The status of the update operation.
	 */
	public async update(
		data: Product,
		callOptions?: ShipStationCallOptions,
	): Promise<UpdateProductResponse> {
		return this.shipstation.request<UpdateProductResponse>(
			{
				url: `${this.baseUrl}/${data.productId}`,
				method: "PUT",
				data,
			},
			callOptions,
		);
	}
}
