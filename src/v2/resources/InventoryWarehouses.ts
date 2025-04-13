import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type { InventoryWarehouse, ListInventoryWarehousesOptions, ListInventoryWarehousesResponse } from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/inventory)
 *
 * Manage inventory, adjust quantities, and handle warehouses and locations.
 */
export class InventoryWarehouses extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'inventory_warehouses');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/getinventorywarehouses)
   *
   * @param options Options for the request
   *
   * @returns List of inventory warehouses
   */
  public async list(options?: ListInventoryWarehousesOptions): Promise<ListInventoryWarehousesResponse> {
    return this.shipstation.request<ListInventoryWarehousesResponse>({
      url: this.baseUrl,
      method: 'GET',
      params: options
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/addnewinventorywarehouse)
   *
   * @param name Name of the inventory warehouse
   *
   * @returns The newly created inventory warehouse
   */
  public async create(name: string): Promise<InventoryWarehouse> {
    return this.shipstation.request<InventoryWarehouse>({
      url: this.baseUrl,
      method: 'POST',
      data: { name }
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/getinventorywarehousebyid)
   *
   * @param inventoryWarehouseId ID of the inventory warehouse to get
   *
   * @returns The inventory warehouse with the given ID
   */
  public async getById(inventoryWarehouseId: string): Promise<InventoryWarehouse> {
    return this.shipstation.request<InventoryWarehouse>({
      url: `${this.baseUrl}/${inventoryWarehouseId}`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/updateinventorywarehouse)
   *
   * @param inventoryWarehouseId ID of the inventory warehouse to update
   * @param name New name for the inventory warehouse
   *
   * @returns The updated inventory warehouse
   */
  public async update(inventoryWarehouseId: string, name: string): Promise<InventoryWarehouse> {
    return this.shipstation.request<InventoryWarehouse>({
      url: `${this.baseUrl}/${inventoryWarehouseId}`,
      method: 'PUT',
      data: { name }
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/inventory/deleteinventorywarehouse)
   *
   * @param inventoryWarehouseId ID of the inventory warehouse to delete
   */
  public async delete(inventoryWarehouseId: string): Promise<void> {
    await this.shipstation.request({
      url: `${this.baseUrl}/${inventoryWarehouseId}`,
      method: 'DELETE'
    });
  }
}
