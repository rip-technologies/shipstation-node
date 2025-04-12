import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type { DownloadFileOptions, DownloadFileResponse } from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/downloads)
 *
 * Download your label files in PDF, PNG, and ZPL.
 */
export class Downloads extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'downloads');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/downloads/download_file)
   *
   * Download labels and other shipment-related documents.
   *
   * @param options Options for the download request
   *
   * @returns Carrier details
   */
  public async downloadFile(options: DownloadFileOptions): Promise<DownloadFileResponse> {
    const { dir, subdir, filename, ...params } = options;
    return this.shipstation.request<DownloadFileResponse>({
      url: `${this.baseUrl}/${dir}/${subdir}/${filename}`,
      method: 'GET',
      params
    });
  }
}
