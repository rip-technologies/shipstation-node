import type { TrackingStatusCode } from './LabelTrackingInfo';

export interface TrackEvent {
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  occurred_at: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  carrier_occurred_at: string;
  /**
   * Event description

   * @example "Delivered, In/At Mailbox"
   */
  description: string;
  /**
   * City locality
   *
   * @example "AUSTIN"
   */
  city_locality: string;
  /**
   * State province
   *
   * @example "TX"
   */
  state_province: string;
  /**
   * Postal code
   *
   * @example "78756"
   */
  postal_code: string;
  /**
   * A two-letter [ISO 3166-1 country code](https://en.wikipedia.org/wiki/ISO_3166-1)
   *
   * @example "CA"
   */
  country_code: string;
  /**
   * Company name
   *
   * @example "Stamps.com"
   */
  company_name: string;
  /**
   * Signer information
   *
   * @example ""
   */
  signer: string;
  /**
   * Event Code
   *
   * @example "DLD"
   */
  event_code: string;
  /**
   * Carrier detail code

   * @example "OT"
   */
  carrier_detail_code: string;
  /**
   * The tracking status detail codes
   *
   * @example "COLLECTION_FAILED"
   */
  status_code: TrackingStatusCode;
  /**
   * Status detail code
   *
   * Carrier detail code
   *
   * @example "OT"
   */
  /**
   * The tracking status detail codes
   *
   * @example "IN_TRANSIT"
   */
  status_detail_code: TrackingStatusCode;
  /**
   * Event Status Description
   *
   * @example "In Transit"
   */
  status_description: string;
  /**
   * Status detail description
   *
   * @example "Your shipment is on its way between depots."
   */
  status_detail_description: string;
  /**
   * Carrier status code
   *
   * @example "01"
   */
  carrier_status_code: string;
  /**
   * carrier status description
   *
   * @example "Your item was delivered in or at the mailbox at 9:10 am on March"
   */
  carrier_status_description: string;
  /**
   * Latitude coordinate of tracking event. [-90, 90]
   *
   * @example 89
   */
  latitude: number;
  /**
   * Longitude coordinate of tracking event. [-180, 180]
   *
   * @example 23
   */
  longitude: number;
}
