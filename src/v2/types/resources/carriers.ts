import type { Carrier, CarrierAdvancedOption, CarrierService, ErrorResponse, PackageType } from '../models';

export type GetCarrierByIdResponse = Carrier;

export interface ListCarriersResponse extends Partial<ErrorResponse> {
  carriers: Array<Carrier>;
}

export interface ListCarriersResponseError extends ErrorResponse {
  /** The carrier response body */
  carriers: Array<Carrier>;
}

export interface GetCarrierOptionsResponse {
  /** An array of carrier options */
  options: Array<CarrierAdvancedOption>;
}

export interface ListCarrierServicesResponse {
  /** An array of services associated with the carrier */
  services: Array<CarrierService>;
}

export interface ListCarrierPackageTypesResponse {
  /** An array of custom package types */
  packages: Array<PackageType>;
}
