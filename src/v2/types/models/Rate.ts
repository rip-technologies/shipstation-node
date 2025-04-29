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

interface RateDetail {
  rate_detail_type: string;
  carrier_description: string;
  carrier_billing_code: string;
  carrier_memo: string | null;
  amount: MonetaryValue;
  billing_source: string;
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
  /** TODO: This field is not documented in the API docs but appears in the response */
  rate_details: Array<RateDetail>;
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
