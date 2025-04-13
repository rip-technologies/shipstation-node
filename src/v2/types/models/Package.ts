import type { PackageTypeDimensions } from './PackageType';
import type { Product } from './Product';
import type { MonetaryValue, Weight } from './Rate';

interface LabelMessages {
  /**
   * The first line of the custom label message. Some carriers may prefix this line with something like "REF",
   * "Reference", "Trx Ref No.", etc.
   *
   * @example "Reference"
   */
  reference1: string | null;
  /**
   * The first line of the custom label message. Some carriers may prefix this line with something like "REF",
   * "Reference", "Trx Ref No.", etc.
   *
   * @example "Reference 2"
   */
  reference2: string | null;
  /**
   * The first line of the custom label message. Some carriers may prefix this line with something like "REF",
   * "Reference", "Trx Ref No.", etc.
   *
   * @example "Reference 3"
   */
  reference3: string | null;
}

export interface Package {
  /**
   * A string that uniquely identifies a ShipStation resource such as a carrier, label, shipment, etc. [1-25] characters
   * `^se(-[a-z0-9]+)+$`
   *
   * @example "se-1234567890"
   */
  package_id: string;
  /**
   * A package type, such as `thick_envelope`, `small_flat_rate_box`, `large_package`, etc. Use the code package for
   * custom or unknown package types. [1-50] characters `^[a-z0-9]+(_[a-z0-9]+)*$`
   *
   * @example "small_flat_rate_box"
   */
  package_code: string;
  /**
   * The name of the package type
   *
   * @example "Flat Rate Envelope"
   */
  package_name: string;
  /** The weight of a package */
  weight: Weight;
  /** The dimensions of a package */
  dimensions: PackageTypeDimensions;
  /**
   * A monetary value, such as the price of a shipping label, the insured value of a package, or an account balance.
   *
   * @default [{ currency: "usd", "amount": 0 }]
   */
  insured_value: MonetaryValue;
  /**
   * Custom messages to print on the shipping label for the package. These are typically used to print invoice numbers,
   * product numbers, or other internal reference numbers. Not all carriers support label messages. The number of lines
   * and the maximum length of each line also varies by carrier.
   *
   * USPS (Stamps.com) - Max lines 3; Max line length 60
   * FedEx - Max lines 3; Max line length 35 for the first line, 30 for additional lines
   * UPS - Max lines 2; Max line length 35
   * OnTrac - Max lines 2; Max line length 25
   */
  label_messages: LabelMessages;
  /**
   * An external package id.
   *
   * @example "se-1234545"
   */
  external_package_id: string;
  /**
   * A short description of the package content. Required for shipments moving to, from, and through Mexico.
   *
   * @example "Hand knitted wool socks"
   */
  content_description: string | null;
  /**
   * Details about products inside packages (Information provided would be used on custom documentation)
   *
   * @default []
   */
  products: Array<Partial<Product>>;
}
