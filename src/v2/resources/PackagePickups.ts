import type BaseAPI from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type {
	DeleteScheduledPickupResponse,
	ListPackagePickupsOptions,
	ListPackagePickupsResponse,
	PackagePickup,
	SchedulePackagePickupData,
} from "../types";

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/package_pickups)
 *
 * Scheduled pickups and manage pickup requests for supported carriers.
 */
export class PackagePickups extends BaseResource {
	constructor(shipstation: BaseAPI) {
		super(shipstation, "pickups");
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/package_pickups/get_pickup_by_id)
	 *
	 * Get Pickup By ID
	 *
	 * @param pickupId Pickup Resource ID (>= 4 characters)
	 * @example "pik_3YcKU5zdtJuCqoeNwyqqbW"
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns Package pickup details
	 */
	public async getById(
		pickupId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<PackagePickup> {
		return this.shipstation.request<PackagePickup>(
			{
				url: `${this.baseUrl}/${pickupId}`,
				method: "GET",
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/package_pickups/list_scheduled_pickups)
	 *
	 * List all pickups that have been scheduled for this carrier
	 *
	 * @param options List package pickups options
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns List of package pickups
	 */
	public async listScheduled(
		options?: ListPackagePickupsOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<ListPackagePickupsResponse> {
		return this.shipstation.request<ListPackagePickupsResponse>(
			{
				url: this.baseUrl,
				method: "GET",
				params: options,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/package_pickups/schedule_pickup)
	 *
	 * Schedule a package pickup with a carrier
	 *
	 * @param labelIds Label IDs that will be included in the pickup request
	 * @example ["se-28529731"]
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns Scheduled package pickup details
	 */
	public async schedule(
		data: SchedulePackagePickupData,
		callOptions?: ShipStationCallOptions,
	): Promise<PackagePickup> {
		return this.shipstation.request<PackagePickup>(
			{
				url: this.baseUrl,
				method: "POST",
				data,
			},
			callOptions,
		);
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/package_pickups/delete_scheduled_pickup)
	 *
	 * Delete a previously-scheduled pickup by ID
	 *
	 * @param pickupId Pickup Resource ID (>= 4 characters)
	 * @example "pik_3YcKU5zdtJuCqoeNwyqqbW"
	 *
	 * @param callOptions Per-call timeout, abort signal and retry settings
	 *
	 * @returns Deleted package pickup ID
	 */
	public async deleteScheduled(
		pickupId: string,
		callOptions?: ShipStationCallOptions,
	): Promise<DeleteScheduledPickupResponse> {
		return this.shipstation.request<DeleteScheduledPickupResponse>(
			{
				url: `${this.baseUrl}/${pickupId}`,
				method: "DELETE",
			},
			callOptions,
		);
	}
}
