export type AddressResidentialIndicator = 'unknown' | 'yes' | 'no';

export interface Address {
  /**
   * The name of a contact person at this address. This field may be set instead of - or in addition to - the
   * `company_name` field.
   *
   * @example "John Doe"
   */
  name: string;
  /**
   * The phone number of a contact person at this address. The format of this phone number varies depending on the
   * country.
   *
   * @example "+1 204-253-9411 ext. 123"
   */
  phone: string;
  /**
   * Email for the address owner.
   *
   * @example "example@example.com"
   */
  email: string | null;
  /**
   * If this is a business address, then the company name should be specified here.
   *
   * @example "The Home Depot"
   */
  company_name: string | null;
  /**
   * The first line of the street address. For some addresses, this may be the only line. Other addresses may require 2
   * or 3 lines.
   *
   * @example "1999 Bishop Grandin Blvd."
   */
  address_line1: string;
  /**
   * The second line of the street address. For some addresses, this line may not be needed.
   *
   * @example "Unit 408"
   */
  address_line2: string | null;
  /**
   * The third line of the street address. For some addresses, this line may not be needed.
   *
   * @example "Building #7"
   */
  address_line3: string | null;
  /**
   * The name of the city or locality
   *
   * @example "Winnipeg"
   */
  city_locality: string;
  /**
   * The state or province. For some countries (including the U.S.) only abbreviations are allowed. Other countries
   * allow the full name or abbreviation.
   *
   * @example "Manitoba"
   */
  state_province: string;
  /**
   * postal code
   *
   * @example "78756-3717"
   */
  postal_code: string;
  /**
   * A two-letter [ISO 3166-1 country code](https://en.wikipedia.org/wiki/ISO_3166-1)
   *
   * @example "CA"
   */
  country_code: string;
  /**
   * Indicates whether an address is residential.
   *
   * @default "unknown"
   * @example "no"
   */
  address_residential_indicator: AddressResidentialIndicator;
}
