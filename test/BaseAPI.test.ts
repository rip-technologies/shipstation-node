import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import axios, { type AxiosAdapter, AxiosError } from "axios";
import type { IAxiosRetryConfig } from "axios-retry";

import { ShipStation } from "../src";

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
