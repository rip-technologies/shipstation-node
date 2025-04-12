import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type { CreateTagResponse, GetTagsResponse } from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/tags)
 *
 * Tags are text-based identifiers you can add to shipments to help in your shipment management workflows.
 */
export class Tags extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'tags');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/tags/list_tags)
   *
   * Get a list of all tags associated with an account.
   *
   * @returns A list of tags for the account.
   */
  public async get(): Promise<GetTagsResponse> {
    return this.shipstation.request<GetTagsResponse>({
      url: this.baseUrl,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/tags/create_tag)
   *
   * Create a new Tag for customizing how you track your shipments
   *
   * @param tagName Tags are arbitrary strings that you can use to categorize shipments. For example, you may want to
   * use tags to distinguish between domestic and international shipments, or between insured and uninsured shipments.
   * Or maybe you want to create a tag for each of your customers so you can easily retrieve every shipment for a
   * customer.
   */
  public async create(tagName: string): Promise<CreateTagResponse> {
    return this.shipstation.request<CreateTagResponse>({
      url: `${this.baseUrl}/${tagName}`,
      method: 'POST'
    });
  }
}
