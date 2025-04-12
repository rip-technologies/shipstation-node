import type { Webhook } from '../models';

export type ListWebhooksResponse = Array<Webhook>;

export type CreateWebhookData = Pick<Webhook, 'url' | 'event'> & Partial<Pick<Webhook, 'headers'>>;

export type UpdateWebhookData = Pick<Webhook, 'url'> & Partial<Pick<Webhook, 'headers'>>;
