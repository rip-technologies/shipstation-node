import type { PackageType } from './PackageType';

export type CarrierCode =
  | 'access_worldwide'
  | 'apc'
  | 'asendia'
  | 'dhl_global_mail'
  | 'dhl_express'
  | 'dhl_express_australia'
  | 'dhl_express_canada'
  | 'dhl_express_worldwide'
  | 'dhl_express_uk'
  | 'dpd'
  | 'endicia'
  | 'fedex'
  | 'fedex_uk'
  | 'firstmile'
  | 'imex'
  | 'newgistics'
  | 'ontrac'
  | 'rr_donnelley'
  | 'stamps_com'
  | 'ups'
  | 'usps'
  | 'zpl';

export interface CarrierAdvancedOptions {
  /**
   * Name of advanced option
   *
   * @example "contains_alcohol"
   */
  name: string;
  /**
   * Default value of option
   *
   * @example "false"
   */
  default_value: string;
  /**
   * Description of option
   *
   * @example "The description"
   */
  description: string;
}

export interface CarrierService {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc.
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id: string;
  /**
   * A shipping carrier, such as `fedex`, `dhl_express`, `stamps_com`, etc. `^[a-z0-9]+(_[a-z0-9]+)*$`
   *
   * @example "dhl_express"
   */
  carrier_code: CarrierCode;
  /**
   * service code
   *
   * @example "usps_media_mail"
   */
  service_code: string;
  /**
   * User friendly service name
   *
   * @example "USPS First Class Mail"
   */
  name: string;
  /**
   * Supports domestic shipping
   *
   * @example true
   */
  domestic: boolean;
  /**
   * Supports international shipping
   *
   * @example true
   */
  international: boolean;
  /**
   * Carrier supports multiple packages per shipment
   *
   * @example true
   */
  is_multi_package_supported: boolean;
}

export interface Carrier {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc.
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id: string;
  /**
   * A shipping carrier, such as `fedex`, `dhl_express`, `stamps_com`, etc. `^[a-z0-9]+(_[a-z0-9]+)*$`
   *
   * @example "dhl_express"
   */
  carrier_code: CarrierCode;
  /**
   * The account number that the carrier is connected to.
   *
   * @example "account_570827"
   */
  account_number: string;
  /**
   * Indicates whether the carrier requires funding to use its services
   *
   * @example true
   */
  requires_funded_amount: boolean;
  /**
   * Current available balance (>= 0)
   *
   * @example 3799.52
   */
  balance: number;
  /**
   * Nickname given to the account when initially setting up the carrier.
   *
   * @example "ShipStation Account - Stamps.com"
   */
  nickname: string;
  /**
   * Screen readable name
   *
   * @example "Stamps.com"
   */
  friendly_name: string;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc.
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  funding_source_id: string | null;
  /**
   * Is this the primary carrier that is used by default when no carrier is specified in label/shipment creation
   *
   * @example true
   */
  primary: boolean;
  /**
   * Carrier supports multiple packages per shipment
   *
   * @example true
   */
  has_multi_package_supporting_services: boolean;
  /**
   * The carrier supports adding custom label messages to an order.
   *
   * @example true
   */
  supports_label_messages: boolean;
  /**
   * The carrier is disabled by the current ShipStation account's billing plan.
   *
   * @example true
   */
  disabled_by_billing_plan: boolean;
  /**
   * A list of services that are offered by the carrier
   */
  services: Array<CarrierService>;
  /**
   * A list of package types that are supported by the carrier
   */
  packages: Array<PackageType>;
  /**
   * A list of options that are available to that carrier
   */
  options: Array<CarrierAdvancedOptions>;
}
