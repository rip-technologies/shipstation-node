import type { DangerousGood } from './DangerousGood';
import type { MonetaryValue, Weight } from './Rate';

export interface Product {
  /**
   * Details about products inside packages (Information provided would be used on custom documentation) (>= 0 items)
   *
   * @default []
   */
  description: string;
  /**
   * The quantity of this item in the shipment. (int32 >= 0)
   *
   * @default 0
   * @example 1
   */
  quantity: number;
  /**
   * A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance.
   */
  value: MonetaryValue;
  /** The weight of a package */
  weight: Weight;
  /**
   * The [Harmonized Tariff Code](https://en.wikipedia.org/wiki/Harmonized_System) of this item.
   *
   * @default null
   * @example "3926.10"
   */
  harmonized_tariff_code: string | null;
  /**
   * A two-letter [ISO 3166-1 country code](https://en.wikipedia.org/wiki/ISO_3166-1)
   *
   * @default null
   * @example "CA"
   */
  country_of_origin: string | null;
  unit_of_measure: string | null;
  /**
   * The SKU (Stock Keeping Unit) of the item
   *
   * @example "sku-1223344"
   */
  sku: string | null;
  /**
   * Description of the Custom Item's SKU
   *
   * @example "this is a description"
   */
  sku_description: string | null;
  /**
   * Manufacturers Identification code
   *
   * @example "GBCOM15BRI"
   */
  mid_code: string | null;
  /**
   * link to the item on the seller website
   *
   * @example "https://myproduct.com"
   */
  product_url: string | null;
  /**
   * VAT rate applicable to the item
   *
   * @example 0.2
   */
  vat_rate: number | null;
  /**
   * Details about dangerous goods inside products
   *
   * @default []
   */
  dangerous_goods: Array<Partial<DangerousGood>>;
}
