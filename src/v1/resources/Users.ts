import type ShipStation from "../../BaseAPI";
import type { ShipStationCallOptions } from "../../BaseAPI";
import { BaseResource } from "../../BaseResource";
import type { ListUsersOptions, ListUsersResponse } from "../types";

export class Users extends BaseResource {
	constructor(shipstation: ShipStation) {
		super(shipstation, "users");
	}

	/**
	 * [Official Documentation](https://www.shipstation.com/docs/api/users/list/)
	 *
	 * @param callOptions Axios request config for this call only
	 *
	 * @returns A list of users.
	 */
	public async list(
		params: ListUsersOptions,
		callOptions?: ShipStationCallOptions,
	): Promise<ListUsersResponse> {
		return this.shipstation.request<ListUsersResponse>(
			{
				url: this.baseUrl,
				method: "GET",
				params,
			},
			callOptions,
		);
	}
}
