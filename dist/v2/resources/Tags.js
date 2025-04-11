var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseResource } from '../../BaseResource';
export class Tags extends BaseResource {
    constructor(shipstation) {
        super(shipstation, 'tags');
    }
    /**
     * [Official Documentation](https://docs.shipstation.com/openapi/tags/list_tags)
     *
     * Get a list of all tags associated with an account.
     *
     * @returns A list of tags for the account.
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.shipstation.request({
                url: this.baseUrl,
                method: 'GET'
            });
        });
    }
    /**
     * [Official Documentation](https://docs.shipstation.com/openapi/tags/create_tag)
     *
     * Create a new Tag for customizing how you track your shipments
     *
     * @param tagName Tags are arbitrary strings that you can use to categorize shipments. For example, you may want to
     * use tags to distinguish between domestic and international shipments, or between insured and uninsured shipments.
     * Or maybe you want to create a tag for each of your customers so you can easily retrieve every shipment for a
     * customer.
     */
    create(tagName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.shipstation.request({
                url: `${this.baseUrl}/${tagName}`,
                method: 'POST'
            });
        });
    }
}
