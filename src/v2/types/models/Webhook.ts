type WebhookEventType =
  | 'batch'
  | 'carrier_connected'
  | 'order_source_refresh_complete'
  | 'rate'
  | 'report_complete'
  | 'sales_orders_imported'
  | 'track';

export interface WebhookHeader {
  /**
   * Key/name of a header
   *
   * @example "custom-key"
   */
  key: string;
  /**
   * Value of a header
   *
   * @example "custom-value"
   */
  value: string;
}

export interface Webhook {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  webhook_id: string;
  /**
   * A URL
   *
   * @example "http://api.shipstation.com/v2/labels/se-28529731"
   */
  url: string;
  /** The possible webook event values */
  event: WebhookEventType;
  /** Array of custom webhook headers */
  headers: Array<WebhookHeader>;
}
