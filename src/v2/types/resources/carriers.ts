import type { Carrier, CarrierAdvancedOption, CarrierService, ErrorResponse, PackageType } from '../models';

export type GetCarrierByIdResponse = Carrier;

export interface ListCarriersResponse extends Partial<ErrorResponse> {
  carriers: Array<Carrier>;
}

export interface ListCarriersResponseError extends ErrorResponse {
  carriers: Array<Carrier>;
}

export interface GetCarrierOptionsResponse {
  options: Array<CarrierAdvancedOption>;
}

export interface ListCarrierServicesResponse {
  services: Array<CarrierService>;
}

export interface ListCarrierPackageTypesResponse {
  packages: Array<PackageType>;
}
