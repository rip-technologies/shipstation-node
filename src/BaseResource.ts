import type BaseAPI from './BaseAPI';

export abstract class BaseResource {
  protected baseUrl: string;
  protected shipstation: BaseAPI;

  constructor(shipstation: BaseAPI, baseUrl: string) {
    this.baseUrl = baseUrl;
    this.shipstation = shipstation;
  }
}
