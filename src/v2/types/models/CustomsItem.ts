import type { Weight } from './Rate';

export interface CustomsItem {
  /**
   * A description of the item (<= 100 characters)
   *
   * @default null
   * @example "This is a description"
   */
  description: string | null;
  /**
   * The quantity of this item in the shipment. (int32 >= 0)
   *
   * @default 0
   * @example 1
   */
  quantity: number;
  /**
   * The monetary amount, in the specified currency. (>= 0)
   *
   * @example 12
   */
  value: number;
  /**
   * The currencies that are supported by ShipStation are the ones that specified by ISO 4217:
   * https://www.iso.org/iso-4217-currency-codes.html
   *
   * @example "USD"
   */
  value_currency: string;
  /** The weight of a package */
  weight: Weight;
  /**
   * The [Harmonized Tariff Code](https://en.wikipedia.org/wiki/Harmonized_System) of this item.
   *
   * @default null
   * @example "3926.10"
   */
  harmonized_tarriff_code: string | null;
  /**
   * A two-letter [ISO 3166-1 country code](https://en.wikipedia.org/wiki/ISO_3166-1) (2 characters)
   *
   * @default null
   * @example "US"
   */
  country_of_origin: string | null;
  /**
   * @example "pound"
   */
  unit_of_measure: string | null;
  /**
   * The SKU (Stock Keeping Unit) of the customs item
   *
   * @example "sku-1234"
   */
  sku: string | null;
  /**
   * Description of the Custom Item's SKU
   *
   * @example "this is a description"
   */
  sku_description: string | null;
}
