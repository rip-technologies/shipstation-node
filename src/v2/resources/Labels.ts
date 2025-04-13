import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type { ListLabelsOptions, ListLabelsResponse } from '../types';

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
}
