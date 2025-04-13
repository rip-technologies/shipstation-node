import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type {
  CreateReturnLabelOptions,
  GetLabelByIdOptions,
  Label,
  LabelTrackingInfo,
  ListLabelsOptions,
  ListLabelsResponse,
  PurchaseLabelOptions,
  PurchaseLabelWithIdOptions,
  VoidLabelResponse
} from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/labels)
 *
 * Purchase and print shipping labels for any carrier active on your account. The labels endpoint also supports creating
 * return labels, voiding labels, and getting label details like tracking.
 */
export class Labels extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'labels');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/labels/list_labels)
   *
   * This method returns a list of labels that you've created. You can optionally filter the results as well as control
   * their sort order and the number of results returned at a time.
   *
   * By default all labels are returned 25 at a time, starting with the most recently created ones. You can combine
   * multiple filter options to narrow-down the results. For example, if you only want your UPS labels for your east coast
   * warehouse you could query by both `warehouse_id` and `carrier_id`.
   *
   * @param options Options for the list request
   *
   * @returns A `labels` array containing a page of results (as determined by the `page_size` query parameter). It also
   * includes other useful information, such as the total number of labels that match the query criteria, the number of
   * pages of results, and the URLs of the first, last, next, and previous pages of results.
   */
  public async list(options: ListLabelsOptions): Promise<ListLabelsResponse> {
    return this.shipstation.request<ListLabelsResponse>({
      url: this.baseUrl,
      method: 'GET',
      params: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/labels/get_label_by_id)
   *
   * Retrieve a specific label by its label id.
   *
   * @param labelId The ID of the label to get [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @param options Options for the get request
   *
   * @returns The label specified by the label id.
   */
  public async getById(labelId: string, options?: GetLabelByIdOptions): Promise<Label> {
    return this.shipstation.request<Label>({
      url: `${this.baseUrl}/${labelId}`,
      method: 'GET',
      params: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/labels/get_tracking_log_from_label)
   *
   * Retrieve the label's tracking details.
   *
   * @param labelId The ID of the label to get [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @returns The label specified by the tracking number.
   */
  public async getTrackingInfo(labelId: string): Promise<LabelTrackingInfo> {
    return this.shipstation.request<LabelTrackingInfo>({
      url: `${this.baseUrl}/${labelId}/tracking`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/labels/void_label)
   *
   * Void a specific label using its label id. For labels that are paid for at time of label creation, this will also
   * request a refund from the carrier.
   *
   * @param labelId The ID of the label to void [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @returns The status of the void operation.
   */
  public async void(labelId: string): Promise<VoidLabelResponse> {
    return this.shipstation.request<VoidLabelResponse>({
      url: `${this.baseUrl}/${labelId}/void`,
      method: 'PUT'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/labels/create_label)
   *
   * Purchase and print a label for shipment.
   *
   * @param data The data for the purchase request
   *
   * @returns The newly purchased label.
   */
  public async purchase(data: PurchaseLabelOptions): Promise<Label> {
    return this.shipstation.request<Label>({
      url: this.baseUrl,
      method: 'POST',
      data
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/labels/create_label_from_rate)
   *
   * When retrieving rates for shipments using the `/rates` endpoint, the returned information contains a `rate_id`
   * property that can be used to generate a label without having to refill in the shipment information repeatedly.
   *
   * @param rateId Rate ID [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @param options Options for the purchase request
   *
   * @returns The newly purchased label.
   */
  public async purchaseWithRateId(rateId: string, options?: PurchaseLabelWithIdOptions): Promise<Label> {
    return this.shipstation.request<Label>({
      url: `${this.baseUrl}/rates/${rateId}`,
      method: 'POST',
      data: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/labels/create_label_from_shipment)
   *
   * Purchase a label using a shipment ID that has already been created with the desired address and package info.
   *
   * @param shipmentId Shipment ID [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @param options Options for the purchase request
   *
   * @returns The newly purchased label.
   */
  public async purchaseWithShipmentId(shipmentId: string, options?: PurchaseLabelWithIdOptions): Promise<Label> {
    return this.shipstation.request<Label>({
      url: `${this.baseUrl}/shipments/${shipmentId}`,
      method: 'POST',
      data: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/labels/create_return_label)
   *
   * Create a return label for a previously created outbound label. The return label will automatically swap the ship to
   * and ship from addresses from the original label.
   *
   * @param labelId Label ID [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @param options Options for the purchase request
   *
   * @returns The newly purchased label.
   */
  public async createReturnLabel(labelId: string, options?: CreateReturnLabelOptions): Promise<Label> {
    return this.shipstation.request<Label>({
      url: `${this.baseUrl}/${labelId}/return`,
      method: 'POST',
      data: options
    });
  }
}
