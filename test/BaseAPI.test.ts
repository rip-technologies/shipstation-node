import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import axios, { type AxiosAdapter, AxiosError } from "axios";
import type { IAxiosRetryConfig } from "axios-retry";

import {
	type GetRatesOptions,
	type PurchaseLabelOptions,
	ShipStation,
	type ShipStationCallOptions,
} from "../src";

const credentials = {
	v1: { apiKey: "v1-test-key", apiSecret: "v1-test-secret" },
	v2: { apiKey: "v2-test-key" },
};
const retryConfig: IAxiosRetryConfig = {
	retries: 2,
	retryCondition: (error) => error.code === "ECONNABORTED",
	retryDelay: () => 0,
};
const originalAdapter = axios.defaults.adapter;

const respond =
	(data: unknown): AxiosAdapter =>
	(config) =>
		Promise.resolve({
			config,
			data,
			headers: {},
			status: 200,
			statusText: "OK",
		});

const rejectTimeout: AxiosAdapter = (config) =>
	Promise.reject(new AxiosError("Timed out", "ECONNABORTED", config));

// A gateway failure carries no ShipStation error body
const rejectGatewayTimeout: AxiosAdapter = (config) =>
	Promise.reject(
		new AxiosError(
			"Request failed with status code 504",
			AxiosError.ERR_BAD_RESPONSE,
			config,
			undefined,
			{
				config,
				data: "<html>504 Gateway Time-out</html>",
				headers: {},
				status: 504,
				statusText: "Gateway Timeout",
			},
		),
	);

const isGatewayTimeout: IAxiosRetryConfig["retryCondition"] = (error) =>
	error.response?.status === 504;

beforeEach(() => {
	// A broken transport must fail locally instead of contacting ShipStation.
	axios.defaults.adapter = rejectTimeout;
});

afterEach(() => {
	axios.defaults.adapter = originalAdapter;
	axios.interceptors.request.clear();
	axios.interceptors.response.clear();
});

describe("SDK HTTP transport", () => {
	for (const version of ["v1", "v2"] as const) {
		it(`honors request configuration for ${version}`, async () => {
			const data = { result: "provider response" };
			const adapter = mock(respond(data));
			const timeout = 5000;
			const client = new ShipStation({
				credentials,
				requestConfig: { adapter, timeout },
			});

			const result = await client[version].request({
				method: "GET",
				url: "tags",
			});

			expect(result).toEqual(data);
			expect(adapter).toHaveBeenCalledTimes(1);
			expect(adapter.mock.calls[0]?.[0].timeout).toBe(timeout);
		});
	}

	it("retries POST timeouts using the configured policy", async () => {
		const data = { rates: [] };
		const adapter = mock(respond(data))
			.mockImplementationOnce(rejectTimeout)
			.mockImplementationOnce(rejectTimeout);
		const client = new ShipStation({
			credentials,
			requestConfig: { adapter },
			retryConfig,
		});

		const result = await client.v2.request({ method: "POST", url: "rates" });

		expect(result).toEqual(data);
		expect(adapter).toHaveBeenCalledTimes(3);
	});

	it("keeps retry settings separate between SDK clients", async () => {
		new ShipStation({ credentials, retryConfig });
		const adapter = mock(rejectTimeout);
		const client = new ShipStation({
			credentials,
			requestConfig: { adapter },
		});

		await expect(
			client.v2.request({ method: "POST", url: "rates" }),
		).rejects.toMatchObject({ code: "ECONNABORTED" });
		expect(adapter).toHaveBeenCalledTimes(1);
	});

	it("leaves unrelated Axios requests unretried after constructing SDK clients", async () => {
		const adapter = mock(rejectTimeout);
		axios.defaults.adapter = adapter;
		new ShipStation({ credentials, retryConfig });
		new ShipStation({ credentials, retryConfig });
		new ShipStation({ credentials, retryConfig });

		await expect(
			axios.get("https://other-service.example.com/health"),
		).rejects.toMatchObject({ code: "ECONNABORTED" });
		expect(adapter).toHaveBeenCalledTimes(1);
	});
});

describe("per-call options", () => {
	const rateRequest = {} as GetRatesOptions;
	const labelRequest = {} as PurchaseLabelOptions;

	it("applies a per-call timeout and keeps the client's requestConfig otherwise", async () => {
		const adapter = mock(respond({}));
		const client = new ShipStation({
			credentials,
			requestConfig: { adapter, timeout: 5000 },
		});

		await client.v2.rates.get(rateRequest, { timeout: 15_000 });
		await client.v2.rates.get(rateRequest);
		await client.v1.orders.get(1, { timeout: 15_000 });
		await client.v1.orders.get(1);

		const timeouts = adapter.mock.calls.map(([config]) => config.timeout);
		expect(timeouts).toEqual([15_000, 5000, 15_000, 5000]);
	});

	it("passes a per-call abort signal to the request", async () => {
		const adapter = mock(respond({}));
		const client = new ShipStation({ credentials, requestConfig: { adapter } });
		const controller = new AbortController();

		await client.v2.tags.get({ signal: controller.signal });

		expect(adapter.mock.calls[0]?.[0].signal).toBe(controller.signal);
	});

	it("uses a per-call retry policy for that call only", async () => {
		const data = { rate_response: {} };
		const adapter = mock(rejectGatewayTimeout)
			.mockImplementationOnce(rejectGatewayTimeout)
			.mockImplementationOnce(rejectGatewayTimeout)
			.mockImplementationOnce(respond(data));
		// The default axios-retry condition never retries a POST
		const client = new ShipStation({
			credentials,
			requestConfig: { adapter },
			retryConfig: { retries: 3, retryDelay: () => 0 },
		});

		const result = await client.v2.rates.get(rateRequest, {
			"axios-retry": {
				retries: 2,
				retryCondition: isGatewayTimeout,
				retryDelay: () => 0,
			},
		});

		expect(result).toEqual(data);
		expect(adapter).toHaveBeenCalledTimes(3);

		// The next call falls back to the client's policy and is not resent
		await expect(client.v2.labels.purchase(labelRequest)).rejects.toMatchObject(
			{ response: { status: 504 } },
		);
		expect(adapter).toHaveBeenCalledTimes(4);
	});

	it("merges per-call retry settings over the client's retryConfig", async () => {
		const adapter = mock(respond({}))
			.mockImplementationOnce(rejectGatewayTimeout)
			.mockImplementationOnce(rejectGatewayTimeout);
		const client = new ShipStation({
			credentials,
			requestConfig: { adapter },
			retryConfig: {
				retries: 0,
				retryCondition: isGatewayTimeout,
				retryDelay: () => 0,
			},
		});

		// Only `retries` changes; the client's condition and delay still apply
		await client.v2.rates.get(rateRequest, { "axios-retry": { retries: 2 } });

		expect(adapter).toHaveBeenCalledTimes(3);
	});

	it("retries per call on a client without retryConfig, which still never retries by default", async () => {
		const adapter = mock(rejectGatewayTimeout)
			.mockImplementationOnce(rejectGatewayTimeout)
			.mockImplementationOnce(respond({}));
		const client = new ShipStation({ credentials, requestConfig: { adapter } });

		await client.v2.rates.get(rateRequest, {
			"axios-retry": {
				retries: 1,
				retryCondition: isGatewayTimeout,
				retryDelay: () => 0,
			},
		});
		expect(adapter).toHaveBeenCalledTimes(2);

		await expect(client.v2.rates.get(rateRequest)).rejects.toMatchObject({
			response: { status: 504 },
		});
		expect(adapter).toHaveBeenCalledTimes(3);
	});

	it("does not carry retry state over when one options object is reused", async () => {
		const adapter = mock(respond({}))
			.mockImplementationOnce(rejectGatewayTimeout)
			.mockImplementationOnce(rejectGatewayTimeout)
			.mockImplementationOnce(respond({}))
			.mockImplementationOnce(rejectGatewayTimeout)
			.mockImplementationOnce(rejectGatewayTimeout);
		const client = new ShipStation({ credentials, requestConfig: { adapter } });
		const retryPolicy: IAxiosRetryConfig = {
			retries: 2,
			retryCondition: isGatewayTimeout,
			retryDelay: () => 0,
		};
		const callOptions: ShipStationCallOptions = {
			timeout: 15_000,
			"axios-retry": retryPolicy,
		};
		const before = { ...callOptions };
		const policyBefore = { ...retryPolicy };

		await client.v2.rates.get(rateRequest, callOptions);
		// Would fail on the first 504 if the retry count had carried over
		await client.v2.rates.get(rateRequest, callOptions);

		expect(adapter).toHaveBeenCalledTimes(6);
		expect(callOptions).toStrictEqual(before);
		expect(callOptions["axios-retry"]).toBe(retryPolicy);
		expect(retryPolicy).toStrictEqual(policyBefore);
	});

	for (const version of ["v1", "v2"] as const) {
		it(`does not let call options override the SDK's request fields for ${version}`, async () => {
			const adapter = mock(respond({}));
			const client = new ShipStation({
				credentials,
				requestConfig: { adapter },
			});
			const hostile = {
				timeout: 1000,
				baseURL: "https://attacker.example.com/",
				url: "elsewhere",
				method: "DELETE",
				headers: { Authorization: "Basic stolen", "API-Key": "stolen" },
				auth: { username: "attacker", password: "secret" },
				params: { injected: true },
				data: { injected: true },
			} as ShipStationCallOptions;

			if (version === "v1") {
				await client.v1.orders.get(1, hostile);
			} else {
				await client.v2.rates.getById("se-1", hostile);
			}

			const config = adapter.mock.calls[0]?.[0];
			expect(config?.timeout).toBe(1000);
			expect(config?.auth).toBeUndefined();
			expect(config?.params).toBeUndefined();
			expect(config?.data).toBeUndefined();
			expect(config?.method).toBe("get");
			if (version === "v1") {
				expect(config?.baseURL).toBe("https://ssapi.shipstation.com/");
				expect(config?.url).toBe("orders/1");
				expect(config?.headers.Authorization).toBe(
					`Basic ${Buffer.from("v1-test-key:v1-test-secret").toString("base64")}`,
				);
			} else {
				expect(config?.baseURL).toBe("https://api.shipstation.com/v2");
				expect(config?.url).toBe("rates/se-1");
				expect(config?.headers["API-Key"]).toBe("v2-test-key");
				expect(config?.headers.Authorization).toBeUndefined();
			}
		});
	}
});
