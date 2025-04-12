import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type {
  CreateManifestData,
  CreateManifestResponse,
  ListManifestsOptions,
  ListManifestsResponse,
  Manifest
} from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/manifests)
 *
 * A manifest is a document that provides a list of the day's shipments. It typically contains a barcode that allows the
 * pickup driver to scan a single document to register all shipments, rather than scanning each shipment individually.
 */
export class Manifests extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'manifests');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/manifests/list_manifests)
   *
   * Similar to querying shipments, we allow you to query manifests since there will likely be a large number over a
   * long period of time.
   *
   * @param params Options for listing the manifests
   *
   * @returns A list of manifests
   */
  public async list(params?: ListManifestsOptions): Promise<ListManifestsResponse> {
    return this.shipstation.request<ListManifestsResponse>({
      url: this.baseUrl,
      method: 'GET',
      params
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/manifests/get_manifest_by_id)
   *
   * Get Manifest By Id
   *
   * @param manifestId [1-25] characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   *
   * @returns A manifest
   */
  public async getById(manifestId: string): Promise<Manifest> {
    return this.shipstation.request<Manifest>({
      url: `${this.baseUrl}/${manifestId}`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/manifests/create_manifest)
   *
   * Each ShipStation manifest is created for a specific warehouse, so you'll need to provide the warehouse_id rather
   * than the ship_from address. You can create a warehouse for each location that you want to create manifests for.
   *
   * @param params Data for creating a manifest
   *
   * @returns A manifest
   */
  public async create(data: CreateManifestData): Promise<CreateManifestResponse> {
    return this.shipstation.request<CreateManifestResponse>({
      url: this.baseUrl,
      method: 'POST',
      data
    });
  }
}
