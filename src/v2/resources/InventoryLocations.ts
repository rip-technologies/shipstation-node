import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type {
  CreateInventoryLocationOptions,
  DeleteInventoryLocationOptions,
  InventoryLocation,
  ListInventoryLocationsOptions,
  ListInventoryLocationsResponse
} from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/inventory)
 *
 * Manage inventory, adjust quantities, and handle warehouses and locations.
 */
export class InventoryLocations extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'inventory_locations');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/listinventorylocations)
   *
   * @param options Options for the request
   *
   * @returns List of inventory locations
   */
  public async list(options?: ListInventoryLocationsOptions): Promise<ListInventoryLocationsResponse> {
    return this.shipstation.request<ListInventoryLocationsResponse>({
      url: this.baseUrl,
      method: 'GET',
      params: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/createinventorylocation)
   *
   * @param data Data for creating the inventory location
   *
   * @returns The newly created inventory location
   */
  public async create(data: CreateInventoryLocationOptions): Promise<InventoryLocation> {
    return this.shipstation.request<InventoryLocation>({
      url: this.baseUrl,
      method: 'POST',
      data
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/getinventorylocationbyid)
   *
   * @param inventoryLocationId ID of the inventory location to get
   *
   * @returns The inventory location with the given ID
   */
  public async getById(inventoryLocationId: string): Promise<InventoryLocation> {
    return this.shipstation.request<InventoryLocation>({
      url: `${this.baseUrl}/${inventoryLocationId}`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/updateinventorylocation)
   *
   * @param inventoryLocationId ID of the inventory location to update
   * @param name New name for the inventory location
   */
  public async update(inventoryLocationId: string, name: string): Promise<void> {
    await this.shipstation.request({
      url: `${this.baseUrl}/${inventoryLocationId}`,
      method: 'PUT',
      data: { name }
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/deleteinventorylocation)
   *
   * @param inventoryLocationId ID of the inventory location to delete
   * @param options Options for the request
   */
  public async delete(inventoryLocationId: string, options?: DeleteInventoryLocationOptions): Promise<void> {
    await this.shipstation.request({
      url: `${this.baseUrl}/${inventoryLocationId}`,
      method: 'DELETE',
      params: options
    });
  }
}
