import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type {
  ListSKUInventoryLevelsOptions,
  ListSKUInventoryLevelsResponse,
  UpdateSKULevelsAndPropertiesOptions
} from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/inventory)
 *
 * Manage inventory, adjust quantities, and handle warehouses and locations.
 */
export class Inventory extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'inventory');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/getinventorylevels)
   *
   * @param options Options for the request
   *
   * @returns SKU inventory levels
   */
  public async listSKUInventoryLevels(options: ListSKUInventoryLevelsOptions): Promise<ListSKUInventoryLevelsResponse> {
    return this.shipstation.request<ListSKUInventoryLevelsResponse>({
      url: this.baseUrl,
      method: 'GET',
      params: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/updateskustocklevels)
   *
   * @param data Data for the request
   */
  public async updateSKULevelsAndProperties(options: UpdateSKULevelsAndPropertiesOptions): Promise<void> {
    await this.shipstation.request({
      url: this.baseUrl,
      method: 'POST',
      data: options
    });
  }
}
