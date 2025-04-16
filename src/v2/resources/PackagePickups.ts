import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type {
  DeleteScheduledPickupResponse,
  ListPackagePickupsOptions,
  ListPackagePickupsResponse,
  PackagePickup,
  SchedulePackagePickupData
} from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/package_pickups)
 *
 * Scheduled pickups and manage pickup requests for supported carriers.
 */
export class PackagePickups extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'pickups');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/package_pickups/get_pickup_by_id)
   *
   * Get Pickup By ID
   *
   * @param pickupId Pickup Resource ID (>= 4 characters)
   * @example "pik_3YcKU5zdtJuCqoeNwyqqbW"
   *
   * @returns Package pickup details
   */
  public async getById(pickupId: string): Promise<PackagePickup> {
    return this.shipstation.request<PackagePickup>({
      url: `${this.baseUrl}/${pickupId}`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/package_pickups/list_scheduled_pickups)
   *
   * List all pickups that have been scheduled for this carrier
   *
   * @param options List package pickups options
   *
   * @returns List of package pickups
   */
  public async listScheduled(options?: ListPackagePickupsOptions): Promise<ListPackagePickupsResponse> {
    return this.shipstation.request<ListPackagePickupsResponse>({
      url: this.baseUrl,
      method: 'GET',
      params: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/package_pickups/schedule_pickup)
   *
   * Schedule a package pickup with a carrier
   *
   * @param labelIds Label IDs that will be included in the pickup request
   * @example ["se-28529731"]
   *
   * @returns Scheduled package pickup details
   */
  public async schedule(data: SchedulePackagePickupData): Promise<PackagePickup> {
    return this.shipstation.request<PackagePickup>({
      url: this.baseUrl,
      method: 'POST',
      data
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/package_pickups/delete_scheduled_pickup)
   *
   * Delete a previously-scheduled pickup by ID
   *
   * @param pickupId Pickup Resource ID (>= 4 characters)
   * @example "pik_3YcKU5zdtJuCqoeNwyqqbW"
   *
   * @returns Deleted package pickup ID
   */
  public async deleteScheduled(pickupId: string): Promise<DeleteScheduledPickupResponse> {
    return this.shipstation.request<DeleteScheduledPickupResponse>({
      url: `${this.baseUrl}/${pickupId}`,
      method: 'DELETE'
    });
  }
}
