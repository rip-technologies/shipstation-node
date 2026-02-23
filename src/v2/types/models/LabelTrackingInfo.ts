import type { TrackEvent } from './TrackEvent';

export type TrackingStatusCode =
  /** Shipment pickup failed. The delivery company will try again soon. */
  | 'COLLECTION_FAILED'
  /** Your shipment is ready to go and is waiting for pickup. */
  | 'AWAITING_DESPATCH'
  /** Your shipment pickup has been scheduled. */
  | 'COLLECTION_REQUESTED'
  /**
   * Your shipment has been handed over to the carrier or dropped off at collection point. It will soon start its
   * journey.
   */
  | 'DESPATCHED'
  /** Your shipment is now in the carrier's system. */
  | 'ELEC_ADVICE_RECD_BY_CARRIER'
  /** The sender couldn't hand over your shipment. The delivery company will try to collect it again. */
  | 'NOT_YET_RECEIVED_BY_CARRIER'
  /** Your shipment has been picked up by the carrier. */
  | 'COLLECTION_MADE'
  /** Delivery attempt failed. Please check the carrier's instructions for next steps. */
  | 'ATTEMPTED_DELIVERY'
  /** Second delivery attempt failed. Please check the carrier's instructions for next steps. */
  | 'ATTEMPTED_DELIVERY_2ND'
  /** Third delivery attempt failed. Please check the carrier's instructions for next steps. */
  | 'ATTEMPTED_DELIVERY_3RD'
  /** Delivery failed due to unpaid cash on delivery. Please check carrier instructions. */
  | 'COD_AMOUNT_NOT_PAID'
  /** Cash on delivery payment received. */
  | 'COD_AMOUNT_PAID'
  /** Delivery attempt failed. Please check for delivery instructions left by the carrier. */
  | 'CUSTOMER_CARDED'
  /** There was a recipient identification issue. Please check carrier instructions. */
  | 'CUSTOMER_IDENTIFICATION_FAILED'
  /** Delivery failed due to incorrect payment. Please check carrier instructions. */
  | 'INVALID_METHOD_OF_PAYMENT'
  /** Delivery couldn't be completed due to issues with accessing address. Please follow carrier instructions. */
  | 'NO_ACCESS_TO_RECIPIENTS_ADDRESS'
  /** Your shipment is out for delivery. */
  | 'OUT_FOR_DELIVERY'
  /** Your shipment has been delivered. */
  | 'DELIVERED'
  /** Your shipment was delivered but arrived damaged. */
  | 'DELIVERED_DAMAGED'
  /** Part of your shipment has been delivered. Check for updates on the rest. */
  | 'DELIVERED_IN_PART'
  /** Your shipment has been left in your designated safe place. */
  | 'DELIVERED_SPECIFIED_SAFE_PLACE'
  /**
   * Your shipment was delivered to an alternative location due to the delivery company being unable to deliver it to the
   * specified address. Check carrier instructions for pickup details.
   */
  | 'DELIVERED_TO_ALTERNATIVE_DELIVERY_LOCATION'
  /** Your shipment was delivered to your neighbor. */
  | 'DELIVERED_TO_NEIGHBOUR'
  /** Your shipment was delivered to your PO Box. */
  | 'DELIVERED_TO_PO_BOX'
  /** Your package has been picked up from the collection point. */
  | 'PARCEL_COLLECTED_FROM_PICKUP_POINT'
  /** The carrier has added more information about your delivery. */
  | 'POST_TRANSIT_STATUS'
  /** Delivery confirmed. */
  | 'PROOF_OF_DELIVERY'
  /** Your shipment has been cancelled. */
  | 'CANCELLED'
  /** Your shipment was cancelled before pickup. Contact the sender if unexpected. */
  | 'CANCELLED_BEFORE_DESPATCH'
  /** Recipient not at address. Your shipment is being returned. */
  | 'CUSTOMER_MOVED'
  /** Your parcel contained a prohibited item and is being returned. Contact the sender. */
  | 'HAZARDOUS_PROHIBITED'
  /** Shipment not collected from the pickup point. Your parcel is being returned to the sender. */
  | 'NOT_COLLECTED_FROM_PICKUP_POINT'
  /** Delivery attempts failed. Your parcel is being returned to the sender. */
  | 'NOT_DELIVERED'
  /** Delivery not possible due to recipient's passing. */
  | 'NOT_DELIVERED_ADDRESSEE_DECEASED'
  /** Your parcel was damaged and can't be delivered. It's being returned. Contact the sender. */
  | 'PARCEL_DAMAGED'
  /** Shipment was disposed of. Contact the sender for details. */
  | 'PARCEL_DISPOSED'
  /** Your parcel is lost. Contact the sender for next steps. */
  | 'PARCEL_LOST'
  /** Shipment is too large/heavy for delivery. Being returned. Contact sender. */
  | 'PARCEL_OUTSIDE_OF_SERVICE_CAPABILITY'
  /** Delivery refused. Shipment being returned. Contact the sender. */
  | 'REFUSED_BY_CUSTOMER'
  /** Your shipment is being returned to the sender. Contact them for details. */
  | 'RETURN_TO_SENDER'
  /** There's an issue with your delivery address. This may cause a delay or return. Contact sender or carrier. */
  | 'ADDRESS_QUERY'
  /** There's a delivery delay. We'll update you when there's more info. */
  | 'CARRIER_DELAYS'
  /** Your shipment has passed customs clearance. */
  | 'CUSTOMS_CLEARED'
  /** Your shipment is going through customs. */
  | 'CUSTOMS_PROCESSING'
  /** Unexpected delivery delay. We'll update you soon. */
  | 'DELAYED_NOT_CARRIER'
  /** Delivery arranged by recipient. */
  | 'DELIVERY_ARRANGED_WITH_RECIPIENT'
  /** Your shipment is on hold due to a carrier issue. We'll update you soon. */
  | 'HELD_BY_CARRIER'
  /** Your shipment is held by carrier due to customs issues. We'll update you. */
  | 'HELD_BY_CARRIER_FOR_CLEARANCE_PRE_PROCESSING'
  /** Your shipment is held in customs. We'll update you. */
  | 'HELD_BY_CUSTOMS'
  /** Your shipment is held in export customs. We'll update you. */
  | 'HELD_BY_EXPORT_CUSTOMS'
  /** Your shipment is held in import customs. We'll update you. */
  | 'HELD_BY_IMPORT_CUSTOMS'
  /** Your shipment is at the main delivery depot. */
  | 'HUB_SCAN_OUT'
  /** Your shipment is on its way between depots. */
  | 'IN_TRANSIT'
  /** Incorrect shipment dimensions. Delivery may be delayed or returned. We'll update you. */
  | 'INCORRECT_DECLARATION'
  /** The carrier has shared additional shipment information. */
  | 'INFORMATION'
  /** Your shipment was missorted. There might be a delivery delay. We'll update you. */
  | 'MISSORTED'
  /** Your shipment was over labelled by the delivery company to improve processing. */
  | 'PARCEL_OVER_LABELLED'
  /** Your shipment packaging was damaged. It's being repacked. This might delay delivery. */
  | 'PARCEL_REPACKED'
  /** You've received an email with a shipment update. */
  | 'PARCEL_UPDATE_NOTIFICATION_VIA_EMAIL'
  /** You've received a text message with a shipment update. */
  | 'PARCEL_UPDATE_NOTIFICATION_VIA_SMS'
  /** Your shipment has been received by the carrier. */
  | 'RECEIVED_BY_CARRIER'
  /** Your shipment is at the local delivery depot, ready for delivery. */
  | 'RECEIVED_LOCAL_DELIVERY_DEPOT'
  /** Your shipment was sent to the wrong place. There might be a delay. */
  | 'ROUTING_ERROR'
  /** Your shipment is with the local delivery partner. */
  | 'SUB_CONTRACTOR_EVENT'
  /** Your shipment has been received by the local delivery partner. */
  | 'SUB_CONTRACTOR_RECEIVED'
  /** There's a system issue with your shipment. Tracking updates might be delayed. */
  | 'RECD_BY_CARRIER_NO_ELEC_ADVICE'
  /**
   * Your tracking number is ready. Your shipment is waiting to be registered in the carrier system and scheduled for
   * pickup.
   */
  | 'AWAITING_ELECTRONIC_ADVICE'
  /** Your shipment is ready for pickup at the specified location. */
  | 'AWAITING_COLLECTION_FROM_PICKUP_POINT'
  /** Your shipment has been redirected to the local post office for pickup. Check carrier instructions. */
  | 'COLLECT_AT_LOCAL_PO'
  /** Your shipment is being held for pickup. Check carrier instructions. */
  | 'CUSTOMER_TO_COLLECT_FROM_CARRIER'
  /** Your shipment has been delivered to your locker. */
  | 'DELIVERED_TO_LOCKER_COLLECTION_POINT'
  /** Status not mapped. Please check the carrier's website for updates. */
  | 'CARRIER_STATUS_NOT_MAPPED';

export interface LabelTrackingInfo extends Pick<
  TrackEvent,
  | 'status_code'
  | 'status_detail_code'
  | 'status_description'
  | 'status_detail_description'
  | 'carrier_status_code'
  | 'carrier_detail_code'
> {
  /**
   * A tracking number for a package. The format depends on the carrier.
   *
   * @example "1Z932R800392060079"
   */
  tracking_number: string;
  /**
   * Carrier Tracking Url, if available
   *
   * @example "https://www.fedex.com/fedextrack/?action=track&trackingnumber=1234"
   */
  tracking_url: string;
  /**
   * The tracking status deatil codes
   *
   * @example "COLLECTION_FAILED"
   */
  carrier_code: 'dhl_express';
  /**
   * The unique ID of the carrier account that was used to create this label (int32)
   *
   * @example 1234567
   */
  carrier_id: number;
  /**
   * Status description
   *
   * @example "Delivered"
   */
  ship_date: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  estimated_delivery_date: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string that represents a date and time.
   *
   * @example "2018-09-23T15:00:00.000Z"
   */
  actual_delivery_date: string;
  /** The events that have occured during the lifetime of this tracking number. */
  exception_description: Array<TrackEvent>;
}
