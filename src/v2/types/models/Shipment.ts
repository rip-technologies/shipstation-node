import type { InsuranceProvider, InternationalShipmentOptions, OrderSourceName } from '../resources';
import type { Address } from './Address';
import type { Package } from './Package';
import type { MonetaryValue } from './Rate';
import type { ShipmentItem } from './ShipmentItem';
import type { Tag } from './Tag';
import type { TaxIdentifier } from './TaxIdentifier';

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

export interface ShippingAddress
  extends Pick<Address, 'name' | 'address_line1' | 'city_locality' | 'state_province' | 'postal_code' | 'country_code'>,
    Partial<
      Pick<
        Address,
        'email' | 'phone' | 'company_name' | 'address_line2' | 'address_line3' | 'address_residential_indicator'
      >
    > {
  /**
   * Additional text about how to handle the shipment at this address.
   *
   * @example "any instructions"
   */
  instructions?: string | null;
  geolocation?: Array<{
    /**
     * Enum of available type of geolocation items:
     *
     * - 'what3words' functionality allows to specify a location by providing 3 words that have been assign to the
     * specific location see [link](https://what3words.com/business) for more details.
     *
     * @example "what3words"
     */
    type: 'what3words';
    /**
     * value of the geolocation item
     *
     * @example "cats.with.thumbs"
     */
    value: string;
  }>;
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

export interface Shipment {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  shipment_id: string;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id: string;
  /**
   * A carrier service such as `fedex_ground`, `usps_first_class_mail`, `flat_rate_envelope`, etc.
   * `^[a-z0-9]+(_[a-z0-9-]+)* ?$`
   *
   * @example "usps_first_class_mail"
   */
  service_code: string;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  shipping_rule_id?: string;
  /**
   * ID that the Order Source assigned
   *
   * @example "1232434"
   */
  external_order_id?: string | null;
  /**
   * Describe the packages included in this shipment as related to potential metadata that was imported from external
   * order sources
   *
   * @default []
   */
  /**
   * Describe the packages included in this shipment as related to potential metadata that was imported from external
   * order sources
   *
   * @default []
   */
  items: Array<ShipmentItem>;
  tax_identifiers?: Array<TaxIdentifier>;
  /**
   * A unique user-defined key to identify a shipment. This can be used to retrieve the shipment. (<= 50 characters)
   *
   * **Warning: The `external_shipment_id` is limited to 50 characters. Any additional characters will be truncated.**
   *
   * @example "1234556"
   */
  external_shipment_id?: string | null;
  /**
   * A non-unique user-defined number used to identify a shipment. If undefined, this will match the
   * external_shipment_id of the shipment. (<= 50 characters)
   *
   * **Warning: The `shipment_number` is limited to 50 characters. Any additional characters will be truncated.**
   *
   * @example "se-1234545"
   */
  shipment_number?: string | null;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date, but not a specific time. The
   * value may contain a time component, but it will be set to `00:00:00` UTC by ShipStation .
   *
   * @example "2018-09-23"
   */
  ship_date?: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T00:00:00Z"
   */
  created_at: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T00:00:00Z"
   */
  modified_at: string;
  /**
   * @default "pending"
   */
  shipment_status: 'pending' | 'processing' | 'label_purchased' | 'cancelled';
  /** A complete or partial mailing address. */
  ship_to: ShippingAddress;
  /** A complete or partial mailing address. */
  ship_from: Omit<ShippingAddress, 'geolocation'>;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @default null
   * @example "se-28529731"
   */
  warehouse_id?: string | null;
  /** A complete or partial mailing address. */
  return_to?: Omit<ShippingAddress, 'geolocation'>;
  /**
   * An optional indicator if the shipment is intended to be a return. Defaults to false if not provided.
   *
   * @default false
   * @example true
   */
  is_return?: boolean | null;
  /**
   * @default "none"
   */
  confirmation?: DeliveryConfirmation;
  /**
   * Options for international shipments, such as customs declarations.
   *
   * @default null
   */
  customs?: InternationalShipmentOptions | null;
  /** Advanced shipment options */
  advanced_options?: AdvancedShipmentOptions;
  /**
   * @default "none"
   */
  insurance_provider?: InsuranceProvider;
  /**
   * Arbitrary tags associated with this shipment. Tags can be used to categorize shipments, and shipments can be queried by their tags.
   *
   * @default []
   */
  tags: Array<Tag>;
  order_source_code?: OrderSourceName;
  /**
   * The packages in the shipment.
   *
   * **Note: Some carriers only allow one package per shipment. If you attempt to create a multi-package shipment for a
   * carrier that doesn't allow it, an error will be returned.**
   */
  packages: Array<Partial<Package>>;
  /** The weight of a package */
  total_weight: Weight;
  /**
   * Calculate a rate for this shipment with the requested carrier using a ratecard that differs from the default. Only
   * supported for UPS and USPS.
   *
   * @example "retail"
   */
  comparison_rate_type?: string | null;
}
