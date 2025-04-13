import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type {
  AddTagToShipmentResponse,
  GetShipmentRatesOptions,
  ListShipmentsOptions,
  ListShipmentsResponse,
  RatesInformation,
  Shipment
} from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/shipments)
 *
 * Shipments are at the core of most ShipStation capabilities. Shipment objects are required for cretaing labels and
 * manifests, as well as getting rates.
 */
export class Shipments extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'shipments');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/shipments/list_shipments)
   *
   * Get list of Shipments
   *
   * @param options Options for the list request
   *
   * @returns A list of shipments
   */
  public async list(options?: ListShipmentsOptions): Promise<ListShipmentsResponse> {
    return this.shipstation.request<ListShipmentsResponse>({
      url: this.baseUrl,
      method: 'GET',
      params: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/shipments/get_shipment_by_external_id)
   *
   * Query Shipments created using your own custom ID convention using this endpoint
   *
   * @param externalId The external shipment id
   * @example "0bcb569d-1727-4ff9-ab49-b2fec0cee5ae"
   *
   * @returns The shipment specified by the external shipment id
   */
  public async getByExternalId(externalId: string): Promise<Shipment> {
    return this.shipstation.request<Shipment>({
      url: `${this.baseUrl}/external_shipment_id/${externalId}`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/shipments/get_shipment_by_id)
   *
   * Get an individual shipment based on its ID
   *
   * @param shipmentId Shipment ID [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @returns The shipment specified by the shipment id
   */
  public async getById(shipmentId: string): Promise<Shipment> {
    return this.shipstation.request<Shipment>({
      url: `${this.baseUrl}/${shipmentId}`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/shipments/cancel_shipments)
   *
   * Mark a shipment cancelled, if it is no longer needed or being used by your organized. Any label associated with the
   * shipment needs to be voided first An example use case would be if a batch label creation job is going to run at a
   * set time and only queries `pending` shipments. Marking a shipment as cancelled would remove it from this process
   *
   * @param shipmentId Shipment ID [1-25] characters `^se(-[a-z0-9]+)+$`
   */
  public async cancel(shipmentId: string): Promise<void> {
    await this.shipstation.request({
      url: `${this.baseUrl}/${shipmentId}/cancel`,
      method: 'PUT'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/shipments/list_shipment_rates)
   *
   * Get Rates for the shipment information associated with the shipment ID
   *
   * @param shipmentId Shipment ID [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @param options Options for the request
   * @returns The rates for the shipment
   */
  public async getRates(shipmentId: string, options?: GetShipmentRatesOptions): Promise<RatesInformation> {
    return this.shipstation.request<RatesInformation>({
      url: `${this.baseUrl}/${shipmentId}/rates`,
      method: 'GET',
      params: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/shipments/tag_shipment)
   *
   * Add a tag to the shipment object
   *
   * @param shipmentId Shipment ID [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @param tagName Tags are arbitrary strings that you can use to categorize shipments. For example, you may want to
   * use tags to distinguish between domestic and international shipments, or between insured and uninsured shipments.
   * Or maybe you want to create a tag for each of your customers so you can easily retrieve every shipment for a
   * customer.
   * @example "Fragile"
   *
   * @returns The information about the added tag
   */
  public async addTag(shipmentId: string, tagName: string): Promise<AddTagToShipmentResponse> {
    return this.shipstation.request<AddTagToShipmentResponse>({
      url: `${this.baseUrl}/${shipmentId}/tags/${tagName}`,
      method: 'POST'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/shipments/untag_shipment)
   *
   * Remove an existing tag from the Shipment object
   *
   * @param shipmentId Shipment ID [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @param tagName Tags are arbitrary strings that you can use to categorize shipments. For example, you may want to
   * use tags to distinguish between domestic and international shipments, or between insured and uninsured shipments.
   * Or maybe you want to create a tag for each of your customers so you can easily retrieve every shipment for a
   * customer.
   * @example "Fragile"
   */
  public async removeTag(shipmentId: string, tagName: string): Promise<void> {
    await this.shipstation.request({
      url: `${this.baseUrl}/${shipmentId}/tags/${tagName}`,
      method: 'DELETE'
    });
  }
}
