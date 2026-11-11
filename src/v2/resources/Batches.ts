import type BaseAPI from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type {
	Batch,
	CreateBatchOptions,
	GetBatchErrorsOptions,
	GetBatchErrorsResponse,
	ListBatchesOptions,
	ListBatchesResponse,
	ProcessBatchLabelsOptions,
	RemoveFromBatchOptions,
} from "../types";

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/batches)
 *
 * Process labels in bulk and receive a large number of labels and customs forms in bulk responses. Batching is ideal
 * for workflows that need to process hundreds or thousands of labels quickly.
 */
export class Batches extends BaseResource {
	constructor(shipstation: BaseAPI) {
		super(shipstation, "batches");
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/batches/list_batches)
	 *
	 * List the batches associated with your ShipStation account.
	 *
	 * @param options Options for the list request
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns A list of batches
	 */
	public async list(
		options: ListBatchesOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<ListBatchesResponse> {
		return this.shipstation.request<ListBatchesResponse>(
			{
				url: this.baseUrl,
				method: "GET",
				params: options,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/batches/create_batch)
	 *
	 * Create a batch containing multiple labels.
	 *
	 * @param options Options for the create request
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns The newly created batch
	 */
	public async create(
		options: CreateBatchOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<Batch> {
		return this.shipstation.request<Batch>(
			{
				url: this.baseUrl,
				method: "POST",
				data: options,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/batches/get_batch_by_id)
	 *
	 * Get batch details for a specific batch id.
	 *
	 * @param batchId The batch ID of the batch to retrieve [1-25] characters `^se(-[a-z0-9]+)+$`
	 * @example "se-28529731"
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns A batch specified by its batch ID
	 */
	public async getById(
		batchId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<Batch> {
		return this.shipstation.request<Batch>(
			{
				url: `${this.baseUrl}/${batchId}`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/batches/get_batch_by_external_id)
	 *
	 * Retreive a batch using an external batch ID
	 *
	 * @param externalBatchId The external batch ID of the batch to retrieve
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns A batch specified by its external batch ID
	 */
	public async getByExternalId(
		externalBatchId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<Batch> {
		return this.shipstation.request<Batch>(
			{
				url: `${this.baseUrl}/external_batch_id/${externalBatchId}`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/batches/delete_batch)
	 *
	 * Delete a batch based on its batch id. Sets its status to 'archived'.
	 *
	 * @param batchId The batch ID of the batch to retrieve [1-25] characters `^se(-[a-z0-9]+)+$`
	 * @example "se-28529731"
	 *
	 * @param callOptions Axios request config for this call only
	 */
	public async delete(
		batchId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<void> {
		await this.shipstation.request(
			{
				url: `${this.baseUrl}/${batchId}`,
				method: "DELETE",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/batches/update_batch)
	 *
	 * Update a batch by id setting its status to 'archived'.
	 *
	 * @param batchId The batch ID of the batch to retrieve [1-25] characters `^se(-[a-z0-9]+)+$`
	 * @example "se-28529731"
	 *
	 * @param callOptions Axios request config for this call only
	 */
	public async updateToArchived(
		batchId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<void> {
		await this.shipstation.request(
			{
				url: `${this.baseUrl}/${batchId}`,
				method: "PUT",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/batches/add_to_batch)
	 *
	 * Add a shipment or rate to a batch.
	 *
	 * @param batchId The batch ID of the batch to retrieve [1-25] characters `^se(-[a-z0-9]+)+$`
	 * @example "se-28529731"
	 *
	 * @param data The data to add to the batch
	 *
	 * @param callOptions Axios request config for this call only
	 */
	public async addToBatch(
		batchId: string,
		data: CreateBatchOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<void> {
		await this.shipstation.request(
			{
				url: `${this.baseUrl}/${batchId}/add`,
				method: "POST",
				data,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/batches/list_batch_errors)
	 *
	 * Errors in batches must be handled differently from synchronous requests. You must retrieve the status of your batch
	 * by getting a batch and getting an overview of the statuses or by listing the batch errors.
	 *
	 * @param batchId The batch ID of the batch to retrieve [1-25] characters `^se(-[a-z0-9]+)+$`
	 * @example "se-28529731"
	 *
	 * @param options Options for the list request
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns A list of batch errors
	 */
	public async getErrors(
		batchId: string,
		options?: GetBatchErrorsOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<GetBatchErrorsResponse> {
		return this.shipstation.request<GetBatchErrorsResponse>(
			{
				url: `${this.baseUrl}/${batchId}/errors`,
				method: "GET",
				params: options,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/batches/process_batch)
	 *
	 * Create and purchase the labels for the shipments included in the batch.
	 *
	 * @param batchId The batch ID of the batch to retrieve [1-25] characters `^se(-[a-z0-9]+)+$`
	 * @example "se-28529731"
	 *
	 * @param options Options for the process request
	 *
	 * @param callOptions Axios request config for this call only
	 */
	public async processLabels(
		batchId: string,
		options: ProcessBatchLabelsOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<void> {
		await this.shipstation.request(
			{
				url: `${this.baseUrl}/${batchId}/process/labels`,
				method: "POST",
				data: options,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/batches/remove_from_batch)
	 *
	 * Remove specific shipment ids or rate ids from a batch.
	 *
	 * @param batchId The batch ID of the batch to retrieve [1-25] characters `^se(-[a-z0-9]+)+$`
	 * @example "se-28529731"
	 *
	 * @param data The data to remove from the batch
	 *
	 * @param callOptions Axios request config for this call only
	 */
	public async removeFromBatch(
		batchId: string,
		data: RemoveFromBatchOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<void> {
		await this.shipstation.request(
			{
				url: `${this.baseUrl}/${batchId}/remove`,
				method: "POST",
				data,
			},
			callOptions,
		);
	}
}
