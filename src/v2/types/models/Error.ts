export type ShipStationAPIErrorSource = 'carrier' | 'order_source' | 'ShipStation';
export type ShipStationAPIErrorType =
  | 'account_status'
  | 'business_rules'
  | 'validation'
  | 'security'
  | 'system'
  | 'integrations';
export type ShipStationAPIErrorCode =
  | 'auto_fund_not_supported'
  | 'batch_cannot_be_modified'
  | 'carrier_conflict'
  | 'carrier_disconnected'
  | 'carrier_not_connected'
  | 'carrier_not_supported'
  | 'confirmation_not_supported'
  | 'default_warehouse_cannot_be_deleted'
  | 'field_conflict'
  | 'field_value_required'
  | 'forbidden'
  | 'identifier_conflict'
  | 'identifiers_must_match'
  | 'insufficient_funds'
  | 'invalid_address'
  | 'invalid_billing_plan'
  | 'invalid_field_value'
  | 'invalid_identifier'
  | 'invalid_status'
  | 'invalid_string_length'
  | 'label_images_not_supported'
  | 'meter_failure'
  | 'order_source_not_active'
  | 'rate_limit_exceeded'
  | 'refresh_not_supported'
  | 'request_body_required'
  | 'return_label_not_supported'
  | 'settings_not_supported'
  | 'subscription_inactive'
  | 'terms_not_accepted'
  | 'tracking_not_supported'
  | 'trial_expired'
  | 'unauthorized'
  | 'unknown'
  | 'unspecified'
  | 'verification_failure'
  | 'warehouse_conflict'
  | 'webhook_event_type_conflict'
  | 'customs_items_required'
  | 'incompatible_paired_labels'
  | 'invalid_charge_event'
  | 'invalid_object'
  | 'no_rates_returned';

export interface ShipStationAPIError {
  /**
   * The source of the error, as indicated by the name this informs us if the API call failed because of the carrier,
   * the order source, or the ShipStation API itself.
   */
  error_source: ShipStationAPIErrorSource;
  /** The type of error */
  error_type: ShipStationAPIErrorType;
  /** The error code specified for the failed API call */
  error_code: ShipStationAPIErrorCode;
  /**
   * An error message associated with the failed API call
   *
   * @example "Body of request cannot be null"
   */
  message: string;
}

export interface ErrorResponse {
  /**
   * A UUID (a.k.a. GUID) that uniquely identifies a resource
   *
   * @example "aa3d8e8e-462b-4476-9618-72db7f7b7009"
   */
  request_id: string;
  /** The errors associated with the failed API call */
  errors: Array<ShipStationAPIError>;
}
