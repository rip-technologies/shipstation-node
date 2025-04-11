import type BaseAPI from './BaseAPI';
export declare abstract class BaseResource {
    protected baseUrl: string;
    protected shipstation: BaseAPI;
    constructor(shipstation: BaseAPI, baseUrl: string);
}
