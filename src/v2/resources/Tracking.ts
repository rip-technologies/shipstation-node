import type BaseAPI from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type { CarrierCode } from "../types";

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/tracking)
 *
 * Use the tracking endpoint to stop receiving tracking updates (more dedicated tracking endpoint methods coming soon).
 */
export class Tracking extends BaseResource {
	constructor(shipstation: BaseAPI) {
		super(shipstation, "downloads");
	}

	/**
	 * [Official Documentation](https://docs.shipstation.com/openapi/tracking/stop_tracking)
	 *
	 * Unsubscribe from tracking updates for a package.
	 *
	 * @param carrierCode A shipping carrier, such as fedex, dhl_express, stamps_com, etc.
	 * @example "stamps_com"
	 *
	 * @param trackingNumber The tracking number associated with a shipment
	 * @example "9405511899223197428490"
	 *
	 * @param callOptions Axios request config for this call only
	 */
	public async stop(
		carrierCode: CarrierCode,
		trackingNumber: string,
		callOptions?: ShipStationCallOptions,
	): Promise<void> {
		await this.shipstation.request(
			{
				url: `${this.baseUrl}/stop`,
				method: "POST",
				params: {
					carrier_code: carrierCode,
					tracking_number: trackingNumber,
				},
			},
			callOptions,
		);
	}
}
