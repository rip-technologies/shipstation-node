import { expect, it } from "bun:test";

import { type RatesInformation, ShipStationRatesError } from "../src";

it("keeps the rate response and puts its diagnostics in the message", () => {
	const rateResponse = {
		errors: [
			{
				error_code: "invalid_field_value",
				error_source: "carrier",
				error_type: "validation",
				field_name: "ship_to.postal_code",
				field_value: "SW1A 1AA",
				message: "Postcode not found",
			},
		],
		invalid_rates: [
			{
				carrier_code: "ups",
				error_messages: ["Package exceeds the maximum length"],
				service_code: "ups_ground",
			},
		],
		rate_request_id: "se-1",
		rates: [],
		status: "error",
	} as unknown as RatesInformation;

	const error = new ShipStationRatesError(rateResponse);

	expect(error.name).toBe("ShipStationRatesError");
	expect(error.rateResponse).toBe(rateResponse);
	expect(JSON.parse(error.message)).toEqual({
		errors: [
			{
				error_code: "invalid_field_value",
				error_source: "carrier",
				error_type: "validation",
				field_name: "ship_to.postal_code",
				message: "Postcode not found",
			},
		],
		invalid_rates: [
			{
				carrier_code: "ups",
				error_messages: ["Package exceeds the maximum length"],
				service_code: "ups_ground",
			},
		],
		rate_request_id: "se-1",
		rates: [],
		status: "error",
	});
	expect(error.message).not.toContain("SW1A 1AA");
});
