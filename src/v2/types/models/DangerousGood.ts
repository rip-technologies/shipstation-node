interface DangerousAmount {
  /**
   * The amount of dangerous goods.
   *
   * @default 0
   * @example 12
   */
  amount: number;
  /**
   * The unit of dangerous goods.
   *
   * @default null
   * @example "GBP"
   */
  unit: string | null;
}

export interface DangerousGood {
  /**
   * UN number to identify the dangerous goods.
   *
   * @default null
   * @example "1234r1"
   */
  id_number: string | null;
  /**
   * Trade description of the dangerous goods.
   *
   * @default null
   * @example "things with dangerous goods"
   */
  shipping_name: string | null;
  /**
   * Recognized Technical or chemical name of dangerous goods.
   *
   * @default null
   * @example "chloric acid"
   */
  technical_name: string | null;
  /**
   * Dangerous goods product class based on regulation.
   *
   * @default null
   * @example "1987"
   */
  product_class: string | null;
  /**
   * A secondary of product class for substances presenting more than one particular hazard
   *
   * @default null
   * @example "1987"
   */
  product_class_subsidiary: string | null;
  packaging_group: 'i' | 'ii' | 'iii';
  /** This model represents the amount of the dangerous goods. */
  dangerous_amount: Partial<DangerousAmount>;
  /**
   * Quantity of dangerous goods.
   *
   * @default 0
   * @example 1
   */
  quantity: number;
  /**
   * The specific standardized packaging instructions from the relevant regulatory agency that have been applied to the
   * parcel/container.
   *
   * @default null
   * @example "Packaging materials and containers that are in contact with food products must comply with the provisions established by Regulation"
   */
  packaging_instruction: string | null;
  packaging_instruction_section: 'section_1' | 'section_1a' | 'section_1b' | 'section_2';
  /**
   * The type of exterior packaging used to contain the dangerous good.
   *
   * @default null
   * @example "X"
   */
  packaging_type: string | null;
  transport_mean: 'ground' | 'water' | 'cargo_aircraft_only' | 'passenger_aircraft';
  /**
   * Transport category assign to dangerous goods for the transport purpose.
   *
   * @default null
   * @example "6.1"
   */
  transport_category: string | null;
  /**
   * Name of the regulatory authority.
   *
   * @default null
   * @example "AEAT"
   */
  regulation_authority: string | null;
  regulation_level: 'lightly_regulated' | 'fully_regulated' | 'limited_quantities' | 'excepted_quantity';
  /**
   * Indication if the substance is radioactive.
   *
   * @example false
   */
  radioactive: boolean | null;
  /**
   * Indication if the substance needs to be reported to regulatory authority based on the quantity.
   *
   * @example false
   */
  reportable_quantity: boolean | null;
  /**
   * Defines which types of tunnels the shipment is allowed to go through
   *
   * @default null
   * @example "all"
   */
  tunnel_code: string | null;
  /**
   * Provider additonal description regarding the dangerous goods. This is used as a placed holder to provider
   * additional context and varies by carrier
   *
   * @default null
   * @example "any description"
   */
  additional_description: string | null;
}
