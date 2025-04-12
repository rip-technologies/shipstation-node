import type BaseAPI from '../../BaseAPI';
import { BaseResource } from '../../BaseResource';
import type { CreateWebhookData, ListWebhooksResponse, UpdateWebhookData, Webhook } from '../types';

/**
 * [Official Documentation](https://docs.shipstation.com/openapi/webhooks)
 *
 * Webhooks are a powerful feature that can save you from sending repeated polling requests to check on the state of
 * something. With webhooks, ShipStation will automatically contact your servers when the stage changes. This can
 * include parcel tracking events, notification when a batch operation completes, and more.
 */
export class Webhooks extends BaseResource {
  constructor(shipstation: BaseAPI) {
    super(shipstation, 'environment/webhooks');
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/webhooks/list_webhooks)
   *
   * List all webhooks currently enabled for the account.
   *
   * @returns A list of webhooks
   */
  public async list(): Promise<ListWebhooksResponse> {
    return this.shipstation.request<ListWebhooksResponse>({
      url: this.baseUrl,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/webhooks/create_webhook)
   *
   * Create a new webhook.
   *
   * @param data The data for the new webhook
   *
   * @returns The newly created webhook
   */
  public async create(data: CreateWebhookData): Promise<Webhook> {
    return this.shipstation.request<Webhook>({
      url: this.baseUrl,
      method: 'POST',
      data
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/webhooks/get_webhook_by_id)
   *
   * Retrieve individual webhook by an ID
   *
   * @param webhookId Webhook ID [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @returns The webhook specified by the ID
   */
  public async getById(webhookId: string): Promise<Webhook> {
    return this.shipstation.request<Webhook>({
      url: `${this.baseUrl}/${webhookId}`,
      method: 'GET'
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/webhooks/update_webhook)
   *
   * Update the webhook url property
   *
   * @param webhookId Webhook ID [1-25] characters `^se(-[a-z0-9]+)+$`
   * @example "se-28529731"
   *
   * @param data The data for updating the webhook
   */
  public async update(webhookId: string, data: UpdateWebhookData): Promise<void> {
    await this.shipstation.request({
      url: `${this.baseUrl}/${webhookId}`,
      method: 'PUT',
      data
    });
  }

  /**
   * [Official Documentation](https://docs.shipstation.com/openapi/webhooks/delete_webhook)
   *
   * Delete a webhook.
   *
   * @param webhookId Webhook ID [1-25] characters `^se(-[a-z0-9]+)+$`
   */
  public async deleteById(webhookId: string): Promise<void> {
    await this.shipstation.request({
      url: `${this.baseUrl}/${webhookId}`,
      method: 'DELETE'
    });
  }
}
