import type ShipStation from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type { CustomerResponseItem, ListCustomersOptions, ListCustomersResponse } from '../types';

export class Customers extends BaseResource {
  constructor(shipstation: ShipStation) {
    super(shipstation, 'customers');
  }

  /**
   * [Official Documentation](https://www.shipstation.com/docs/api/customers/get-customer/)
   *
   * To find a specific customerId, make an API Call to
   * [list customers](https://www.shipstation.com/docs/api/customers/list/) associated with your account.
   *
   * @param customerId The system-generated identifier for the Customer.
   *
   * @returns The details of the customer.
   */
  public async get(customerId: number): Promise<CustomerResponseItem> {
    return this.shipstation.request<CustomerResponseItem>({
      url: `${this.baseUrl}/${customerId}`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://www.shipstation.com/docs/api/customers/list/)
   *
   * Obtains a list of customers that match the specified criteria.
   *
   * @returns A list of tags for the account.
   */
  public async list(params: ListCustomersOptions): Promise<ListCustomersResponse> {
    return this.shipstation.request<ListCustomersResponse>({
      url: this.baseUrl,
      method: 'GET',
      params
    });
  }
}
