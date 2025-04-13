export type TaxableEntityType =
  /** The shipper is responsible for this tax. */
  | 'shipper'
  /** The recipient of the shipmentis responsible for this tax. */
  | 'recipient'
  /** The importer of records is responsible for this tax. */
  | 'ior';

export type TaxIdentifierType =
  /** The tax identifier is a Value Added Tax. */
  | 'vat'
  /** The tax identifier is an Economic Operators Registration and Identification Number (EORI). */
  | 'eori'
  /** The tax identifier is a Social Security Number. */
  | 'ssn'
  /** The tax identifier is an Employer Identification Number (EIN). */
  | 'ein'
  /** The tax identifier is a Tax Identification Number (TIN). */
  | 'tin'
  /** The tax identifier is an Import One-Stop Shop (IOSS). */
  | 'ioss'
  /** The tax identifier is a Permanent Account Number (PAN). */
  | 'pan'
  /** The tax identifier is a Norwegian VAT On E-Commerce(VOEC). */
  | 'voec'
  /** The tax identifier is a Personal Customs Clearance Code (PCCC). */
  | 'pccc'
  /** The tax identifier is an One-Stop Shop (OSS). */
  | 'oss'
  /** The tax identifier is a Passport Number. */
  | 'passport'
  /** The tax identifier is an Australian Business Number. */
  | 'abn'
  /** The tax identifier is an UK Internal Market Scheme number. */
  | 'ukims';

export interface TaxIdentifier {
  /** The taxable entity type for this tax item. */
  taxable_entity_type: TaxableEntityType;
  /** Tax identifier type for customs declaration */
  identifier_type: TaxIdentifierType;
  /**
   * The authority that issued this tax. This must be a valid 2 character ISO 3166 Alpha 2 country code.
   *
   * @example "US"
   */
  issuing_authority: string;
  /**
   * The value of the identifier
   *
   * @example "value"
   */
  value: string;
}
