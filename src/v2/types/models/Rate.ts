import type { CarrierCode } from './Carrier';

export interface MonetaryValue {
  /**
   * The currencies that are supported by ShipStation are the ones that specified by ISO 4217:
   * https://www.iso.org/iso-4217-currency-codes.html
   */
  currency: string;
  /**
   * The monetary amount, in the specified currency. (>= 0)
   *
   * @example 12
   */
  amount: number;
}

export interface Rate {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  rate_id: string;
  rate_type: 'check' | 'shipment';
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id: string;
  /** A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance. */
  shipping_amount: MonetaryValue;
  /** A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance. */
  insurance_amount: MonetaryValue;
  /** A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance. */
  confirmation_amount: MonetaryValue;
  /** A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance. */
  other_amount: MonetaryValue;
  /** A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance. */
  requested_comparison_amount: MonetaryValue;
  /** A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance. */
  tax_amount: MonetaryValue;
  /**
   * Certain carriers base [their rates](https://blog.stamps.com/2017/09/08/usps-postal-zones/) off of custom zones that
   * vary depending upon the ship_to and ship_from location. (int32 >= 0)
   *
   * @example 6
   */
  zone: number;
  /**
   * package type that this rate was estimated for
   *
   * @example "package"
   */
  package_type: string;
  /**
   * The number of days estimated for delivery, this will show the actual delivery time if for example, the package gets
   * shipped on a Friday (in32 >= 1)
   *
   * @example 5
   */
  delivery_days: number;
  /**
   * Indicates if the rate is guaranteed.
   *
   * @example true
   */
  guaranteed_service: boolean;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date, but not a specific time. The
   * value may contain a time component, but it will be set to `00:00:00` UTC by ShipStation.
   *
   * @example "2018-09-23"
   */
  estimated_delivery_date: string;
  /**
   * The carrier delivery days
   *
   * @example "22"
   */
  carrier_delivery_days: string;
  /**
   * ship date
   *
   * @example "10/22/2024z00:00"
   */
  ship_date: string;
  /**
   * Indicates if the rates been negotiated
   *
   * @example true
   */
  negotiated_rate: boolean;
  /**
   * service type
   *
   * @example "next_day"
   */
  service_type: string;
  /**
   * service code for the rate
   *
   * @example "usps_priority_mail_express"
   */
  service_code: string;
  /**
   * Indicates if rate is trackable
   *
   * @example true
   */
  trackable: boolean;
  /**
   * carrier code
   *
   * @example "stamps_com"
   */
  carrier_code: CarrierCode;
  /**
   * carrier nickname
   *
   * @example "Free"
   */
  carrier_nickname: string;
  /**
   * carrier friendly name
   *
   * @example "free"
   */
  carrier_friendly_name: string;
  validation_status: 'valid' | 'invalid' | 'has_warnings' | 'unknown';
  /** The warning messages */
  warning_messages: Array<string>;
  /** The error messages */
  error_messages: Array<string>;
}

export type DeliveryConfirmation =
  | 'none'
  | 'delivery'
  | 'signature'
  | 'adult_signature'
  | 'direct_signature'
  | 'delivery_mailed'
  | 'verbal_confirmation';

export interface Weight {
  /**
   * The weight, in the specified unit
   *
   * @example 23
   */
  value: number;
  unit: 'pound' | 'ounce' | 'gram' | 'kilogram';
}

interface DangerousGoodsContact {
  /**
   * Name of the contact
   *
   * @example "Michael Robinson"
   */
  name?: string;
  /**
   * Phone number of the contact
   *
   * @example "123456578789"
   */
  phone?: string;
}

interface WindsorFrameworkDetails {
  /**
   * An indicator that will tell the carrier and HMRC the type of movement for the shipment.
   *
   * @example "b2b"
   */
  movement_indicator?: 'c2c' | 'b2c' | 'c2b' | 'b2b';
  /**
   * An indicator that allows a shipper to declare the shipment as not-at-risk.
   *
   * @example true
   */
  not_at_risk?: boolean;
}

interface FedexFreight {
  /**
   * @example "shipper_load_and_count"
   */
  shipper_load_and_count?: string;
  /**
   * @example "today"
   */
  booking_confirmation?: string;
}

interface CollectOnDelivery {
  payment_type: 'any' | 'cash' | 'cash_equivalent' | 'none';
  payment_amount: MonetaryValue;
}

export interface AdvancedShipmentOptions {
  /**
   * This field is used to bill shipping costs to a third party. This field must be used in conjunction with the
   * `bill_to_country_code`, `bill_to_party`, and `bill_to_postal_code` fields.
   *
   * @default null
   * @example "1234567890"
   */
  bill_to_account?: string | null;
  /**
   * A two-letter [ISO 3166-1 country code](https://en.wikipedia.org/wiki/ISO_3166-1) (2 characters)
   *
   * @default null
   * @example "CA"
   */
  bill_to_country_code?: string | null;
  /**
   * @default null
   * @example "third_party"
   */
  bill_to_party?: 'recipient' | 'third_party' | null;
  /**
   * The postal code of the third-party that is responsible for shipping costs.
   *
   * @default null
   * @example "28005"
   */
  bill_to_postal_code?: string | null;
  /**
   * Indicates that the shipment contains alcohol.
   *
   * @default false
   * @example true
   */
  contains_alcohol?: boolean;
  /**
   * Indicates that the shipper is paying the international delivery duties for this shipment. This option is supported
   * by UPS, FedEx, and DHL Express.
   *
   * @default false
   * @example true
   */
  delivered_duty_paid?: boolean;
  /**
   * Indicates if the shipment contain dry ice
   *
   * @default false
   * @example true
   */
  dry_ice?: boolean;
  /** The weight of a package */
  dry_ice_weight?: Weight | null;
  /**
   * Indicates that the package cannot be processed automatically because it is too large or irregularly shaped. This is
   * primarily for USPS shipments. See
   * [Section 1.2 of the USPS parcel standards](https://pe.usps.com/text/dmm300/101.htm#ep1047495) for details.
   *
   * @default false
   * @example true
   */
  non_machinable?: boolean;
  /**
   * Enables Saturday delivery, if supported by the carrier.
   *
   * @default false
   * @example true
   */
  saturday_delivery?: boolean;
  /** Provide details for the Fedex freight service */
  fedex_freight?: FedexFreight;
  /**
   * Whether to use UPS Ground Freight pricing. If enabled, then a `freight_class` must also be specified.
   *
   * @default null
   * @example true
   */
  use_ups_ground_freight_pricing?: boolean | null;
  /**
   * The National Motor Freight Traffic Association
   * [freight class](http://www.nmfta.org/pages/nmfc?AspxAutoDetectCookieSupport=1), such as "77.5", "110", or "250".
   *
   * @default null
   * @example "77.5"
   */
  freight_class?: string | null;
  /**
   * An arbitrary field that can be used to store information about the shipment.
   *
   * @default null
   * @example "custom field 1"
   */
  custom_field1?: string | null;
  /**
   * An arbitrary field that can be used to store information about the shipment.
   *
   * @default null
   * @example "custom field 2"
   */
  custom_field2?: string | null;
  /**
   * An arbitrary field that can be used to store information about the shipment.
   *
   * @default null
   * @example "custom field 3"
   */
  custom_field3?: string | null;
  /**
   * Indicates that the shipment is a shipper release shipment.
   *
   * @default false
   * @example true
   */
  /**
   * Indicates if the package will be picked up or dropped off by the carrier.
   *
   * @deafult null;
   */
  origin_type?: 'pickup' | 'drop_off' | null;
  /**
   * Indicate to the carrier that this shipment requires additional handling.
   *
   * @default null
   * @example true
   */
  additional_handling?: boolean | null;
  /**
   * @default null
   * @example true
   */
  shipper_release?: boolean | null;
  /** Defer payment until package is delivered, instead of when it is ordered. */
  collect_on_delivery?: CollectOnDelivery;
  /**
   * Third Party Consignee option is a value-added service that allows the shipper to supply goods without commercial invoices being attached
   *
   * @default false
   * @example true
   */
  third_party_consignee?: boolean;
  /**
   * Indicates if the Dangerous goods are present in the shipment
   *
   * @default false
   * @example true
   */
  dangerous_goods?: boolean;
  /** Contact information for Dangerous goods */
  dangerous_goods_contact?: DangerousGoodsContact;
  /**
   * The Windsor framework is a new regulation in the UK that simplifies customs procedures for goods moved from the UK
   * mainland to Northern Ireland.
   */
  windsor_framework_details?: WindsorFrameworkDetails;
}
