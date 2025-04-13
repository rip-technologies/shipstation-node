import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type { EstimateRatesOptions, EstimateRatesResponse, GetRatesOptions, GetRatesResponse, Rate } from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/rates)
 *
 * Quickly compare rates using the Rates endpoint. You can see and compare rates for the carriers connected to your
 * account (as long as they support sending rates).
 */
export class Rates extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'rates');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/rates/get_rate_by_id)
   *
   * Retrieve a previously queried rate by its ID
   *
   * @param rateId Rate ID [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @returns The rate specified by the ID
   */
  public async getById(rateId: string): Promise<Rate> {
    return this.shipstation.request<Rate>({
      url: `${this.baseUrl}/${rateId}`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/rates/calculate_rates)
   *
   * It's not uncommon that you want to give your customer the choice between whether they want to ship the fastest,
   * cheapest, or the most trusted route. Most companies don't solely ship things using a single shipping option; so we
   * provide functionality to show you all your options!
   *
   * @param options The options for the request
   *
   * @returns
   */
  public async get(options: GetRatesOptions): Promise<GetRatesResponse> {
    return this.shipstation.request<GetRatesResponse>({
      url: this.baseUrl,
      method: 'POST',
      data: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/rates/estimate_rates)
   *
   * Get Rate Estimates
   *
   * @param options The options for the request
   *
   * @returns A list of rate estimates
   */
  public async estimate(options: EstimateRatesOptions): Promise<EstimateRatesResponse> {
    return this.shipstation.request<EstimateRatesResponse>({
      url: `${this.baseUrl}/estimate`,
      method: 'POST',
      data: options
    });
  }
}
