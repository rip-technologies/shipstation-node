import type {
  Address,
  AddressResidentialIndicator,
  CustomsItem,
  DeliveryConfirmation,
  MonetaryValue,
  PackageTypeDimensions,
  Rate,
  Shipment,
  Weight
} from '../models';
import type { PurchaseLabelOptions } from './labels';

interface GetRatesBaseRequest {
  /** A rate request body */
  rate_options: {
    /**
     * Array of carrier ids to get rates for
     *
     * @example ["se-28529731"]
     */
    carrier_ids: string;
    package_types?: Array<string>;
    service_codes?: Array<string>;
    /**
     * Calculate the duties and tariffs for cross border shipments.
     *
     * @example true
     */
    calculate_tax_amount?: boolean;
    /**
     * The currencies that are supported by ShipStation are the ones that specified by ISO 4217:
     * https://www.iso.org/iso-4217-currency-codes.html
     */
    preferred_currency?: string;
    /**
     * Indicates if it's a return shipment
     *
     * @example true
     */
    is_return?: boolean;
  };
}

interface GetRatesByShipmentIdOptions extends GetRatesBaseRequest {
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  shipment_id: string;
}

interface InvoiceAdditionalDetails {
  /**
   * A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance.
   */
  freight_charge?: MonetaryValue;
  /**
   * A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance.
   */
  insurance_charge?: MonetaryValue;
  /**
   * A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance.
   */
  discount?: MonetaryValue;
  /**
   * Estimated import charges for commercial invoices for international shipments.
   */
  estimated_import_charge?: MonetaryValue;
  /**
   * A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance.
   */
  other_charge?: MonetaryValue;
  /**
   * Description for the other charge (if provided).
   *
   * @example "Other charges description"
   */
  other_charge_description?: string;
}

export interface ImporterOfRecord
  extends Pick<Address, 'address_line1' | 'city_locality' | 'postal_code' | 'country_code'>,
    Partial<Pick<Address, 'phone' | 'email' | 'address_line2' | 'address_line3' | 'state_province'>> {
  /**
   * The name of a contact person at this address. Either `name` or the `company_name` field should always be set.
   *
   * @example "John Doe"
   */
  name?: string;
  /**
   * If this is a business address, then the company name should be specified here. Either `name` or the `company_name`
   * field should always be set.
   *
   * @example "The Home Depot"
   */
  company_name?: string | null;
}

export interface InternationalShipmentOptions {
  /**
   * @default "merchandise"
   */
  contents: 'merchandise' | 'documents' | 'gift' | 'returned_goods' | 'sample' | 'other';
  /**
   * Explanation for contents (required if the `contents` is provided as `other`)
   *
   * @example "rubber duckies"
   */
  contents_explanation?: string;
  /**
   * @default "return_to_sender"
   */
  non_delivery: 'return_to_sender' | 'treat_as_abandoned';
  /**
   * Specifies the supported terms of trade code (incoterms)
   */
  terms_of_trade_code?:
    | 'exw'
    | 'fca'
    | 'cpt'
    | 'cip'
    | 'dpu'
    | 'dap'
    | 'ddp'
    | 'fas'
    | 'fob'
    | 'cfr'
    | 'cif'
    | 'ddu'
    | 'daf'
    | 'deq'
    | 'des';
  /**
   * Declaration statement to be placed on the commercial invoice
   *
   * @example "I hereby certify that the information on this invoice is true and correct and that the contents and value of this shipment are as stated above"
   */
  declaration?: string;
  /** The additional information to put on commercial invoice */
  invoice_additional_details?: InvoiceAdditionalDetails;
  /** importer of records address, anywhere in the world. */
  importer_of_record?: ImporterOfRecord;
  /**
   * @deprecated
   * Customs declarations for each item in the shipment. (Please provide this information under `products` inside
   * `packages`) (>= 0 items)
   *
   * @default []
   */
  customs_items?: Array<Partial<CustomsItem>>;
}

export type InsuranceProvider = 'none' | 'shipsurance' | 'carrier' | 'third_party';

export type OrderSourceName =
  | 'amazon_ca'
  | 'amazon_us'
  | 'brightpearl'
  | 'channel_advisor'
  | 'cratejoy'
  | 'ebay'
  | 'etsy'
  | 'jane'
  | 'groupon_goods'
  | 'magento'
  | 'paypal'
  | 'seller_active'
  | 'shopify'
  | 'stitch_labs'
  | 'squarespace'
  | 'three_dcart'
  | 'tophatter'
  | 'walmart'
  | 'woo_commerce'
  | 'volusion';

type AddressValidatingShipment = Shipment & PurchaseLabelOptions['validate_address'];

interface GetRatesByShipmentOptions extends GetRatesBaseRequest {
  /**
   * The information necessary to ship a package, such as the origin, the destination, the carrier service, and the
   * package dimensions and weight.
   */
  shipment: AddressValidatingShipment;
}

export type GetRatesOptions = GetRatesByShipmentIdOptions | GetRatesByShipmentOptions;

export interface RatesInformation {
  /** An array of shipment rates */
  rates: Array<Rate>;
  /**
   * An array of invalid rates
   *
   * @default []
   */
  invalid_rates: Array<Rate>;
  /**
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  rate_request_id: string;
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
  created_at: string;
  status: 'working' | 'completed' | 'partial' | 'error';
}

export interface GetRatesResponse extends Shipment {
  /** A rates information resource */
  rate_response: RatesInformation;
}

interface BaseEstimateRatesRequest {
  /**
   * A two-letter [ISO 3166-1 country code](https://en.wikipedia.org/wiki/ISO_3166-1)
   *
   * @example "CA"
   */
  from_country_code: string;
  /**
   * postal code
   *
   * @example "78756-3717"
   */
  from_postal_code: string;
  /**
   * from postal code
   *
   * @example "Austin"
   */
  from_city_locality: string;
  /**
   * From state province
   *
   * @example "Austin"
   */
  from_state_province: string;
  /**
   * A two-letter [ISO 3166-1 country code](https://en.wikipedia.org/wiki/ISO_3166-1)
   *
   * @example "CA"
   */
  to_country_code: string;
  /**
   * postal code
   *
   * @example "78756-3717"
   */
  to_postal_code: string;
  /**
   * The city locality the package is being shipped to
   *
   * @example "Austin"
   */
  to_city_locality: string;
  /**
   * To state province
   *
   * @example "Houston"
   */
  to_state_province: string;
  /** The weight of a package */
  weight: Weight;
  /** The dimensions of a package */
  dimensions?: PackageTypeDimensions;
  /** Indicates how the shipment will be confirmed. */
  confirmation?: DeliveryConfirmation;
  /** Indicates whether an address is residential. */
  address_residential_indicator?: AddressResidentialIndicator;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T00:00:00Z"
   */
  ship_date: string;
}

interface EstimateRatesByCarrierIdRequest extends BaseEstimateRatesRequest {
  /**
   * @deprecated
   * A string that uniquely identifies a ShipStation resource, such as a carrier, label, shipment, etc. [1-25]
   * characters `^se(-[a-z0-9]+)+$`
   *
   * @example "se-28529731"
   */
  carrier_id: string;
}

interface EstimateRatesByCarrierIdsRequest extends BaseEstimateRatesRequest {
  /**
   * Array of Carrier Ids (non-empty)
   *
   * @example ["se-28529731"]
   */
  carrier_ids: string;
}

export type EstimateRatesOptions = EstimateRatesByCarrierIdRequest | EstimateRatesByCarrierIdsRequest;

export type EstimateRatesResponse = Array<Omit<Rate, 'rate_id' | 'requested_comparison_amount'>>;
