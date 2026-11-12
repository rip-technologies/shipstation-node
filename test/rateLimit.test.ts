import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import axios, { type AxiosAdapter, AxiosError } from "axios";
import type { IAxiosRetryConfig } from "axios-retry";

import {
	ShipStation,
	type ShipStationAttempt,
	type ShipStationOptions,
} from "../src";

const credentials = {
	v1: { apiKey: "v1-test-key", apiSecret: "v1-test-secret" },
	v2: { apiKey: "v2-test-key" },
};

type Reply =
	| { status: number; headers?: Record<string, string>; data?: unknown }
	| "timeout";

/**
 * An adapter that answers each request with the next reply (200 once they run out) and records the fake-clock time
 * each request was sent, relative to when the test started.
 */
const scripted = (...replies: Reply[]) => {
	const sentAt: number[] = [];
	const urls: (string | undefined)[] = [];
	const startedAt = Date.now();
	const adapter: AxiosAdapter = (config) => {
		sentAt.push(Date.now() - startedAt);
		urls.push(config.url);
		const reply = replies.shift() ?? { status: 200 };
		if (reply === "timeout") {
			return Promise.reject(
				new AxiosError("Timed out", "ECONNABORTED", config),
			);
		}

		const response = {
			config,
			data: reply.data ?? {},
			headers: reply.headers ?? {},
			status: reply.status,
			statusText: String(reply.status),
		};
		if (reply.status >= 400) {
			return Promise.reject(
				new AxiosError(
					`Request failed with status code ${reply.status}`,
					AxiosError.ERR_BAD_REQUEST,
					config,
					undefined,
					response,
				),
			);
		}
		return Promise.resolve(response);
	};
	return { adapter, sentAt, urls };
};

const tooManyRequests = (retryAfterSeconds?: number): Reply => ({
	status: 429,
	headers:
		retryAfterSeconds === undefined
			? {}
			: { "Retry-After": String(retryAfterSeconds) },
});

// setImmediate is not faked, so waiting for it drains every pending promise callback
const settle = () => new Promise((resolve) => setImmediate(resolve));

/** Moves the fake clock forward in small steps, letting requests progress between steps */
const advance = async (ms: number, step = 50) => {
	await settle();
	for (let elapsed = 0; elapsed < ms; elapsed += step) {
		jest.advanceTimersByTime(Math.min(step, ms - elapsed));
		await settle();
	}
};

const client = (
	adapter: AxiosAdapter,
	options: Omit<ShipStationOptions, "credentials" | "requestConfig"> = {},
) => new ShipStation({ credentials, requestConfig: { adapter }, ...options });

const is429: IAxiosRetryConfig["retryCondition"] = (error) =>
	error.response?.status === 429;
const isGatewayTimeout: IAxiosRetryConfig["retryCondition"] = (error) =>
	error.response?.status === 504;

const originalAdapter = axios.defaults.adapter;

beforeEach(() => {
	jest.useFakeTimers();
	// A broken transport must fail locally instead of contacting ShipStation.
	axios.defaults.adapter = () => Promise.reject(new Error("no network"));
});

afterEach(() => {
	jest.useRealTimers();
	axios.defaults.adapter = originalAdapter;
});

describe("pacing", () => {
	it("spaces request starts evenly at the configured rate", async () => {
		const { adapter, sentAt } = scripted();
		const { v2 } = client(adapter, {
			rateLimit: { v2: { requestsPerMinute: 120 } },
		});

		const calls = Promise.all(Array.from({ length: 4 }, () => v2.tags.get()));
		await advance(2000);
		await calls;

		expect(sentAt).toEqual([0, 500, 1000, 1500]);
	});

	it("keeps the 200 per minute default for v2", async () => {
		const { adapter, sentAt } = scripted();
		const { v2 } = client(adapter);

		const calls = Promise.all([v2.tags.get(), v2.tags.get(), v2.tags.get()]);
		await advance(1000);
		await calls;

		expect(sentAt).toEqual([0, 300, 600]);
	});

	it("keeps v1 at its own 40 per minute default when only v2 is configured", async () => {
		const { adapter, sentAt } = scripted();
		const { v1 } = client(adapter, {
			rateLimit: { v2: { requestsPerMinute: 600 } },
		});

		const calls = Promise.all([v1.orders.get(1), v1.orders.get(2)]);
		await advance(2000);
		await calls;

		expect(sentAt).toEqual([0, 1500]);
	});

	it("paces v1 and v2 separately", async () => {
		const { adapter, sentAt } = scripted();
		const { v1, v2 } = client(adapter, {
			rateLimit: { v1: { requestsPerMinute: 30 } },
		});

		const calls = Promise.all([v1.orders.get(1), v2.tags.get()]);
		await advance(100);
		await calls;

		expect(sentAt).toEqual([0, 0]);
	});

	it("does not burst after an idle period", async () => {
		const { adapter, sentAt } = scripted();
		const { v2 } = client(adapter, {
			rateLimit: { v2: { requestsPerMinute: 60 } },
		});

		const first = v2.tags.get();
		await advance(10_000);
		await first;
		const calls = Promise.all([v2.tags.get(), v2.tags.get()]);
		await advance(2000);
		await calls;

		expect(sentAt).toEqual([0, 10_000, 11_000]);
	});

	it("rejects a rate that is not a positive number", () => {
		const { adapter } = scripted();
		expect(() =>
			client(adapter, { rateLimit: { v2: { requestsPerMinute: 0 } } }),
		).toThrow(RangeError);
	});

	it("gives up an aborted request's turn without sending it", async () => {
		const { adapter, sentAt } = scripted();
		const { v2 } = client(adapter, {
			rateLimit: { v2: { requestsPerMinute: 60 } },
		});
		const controller = new AbortController();

		const first = v2.tags.get();
		const aborted = v2.tags.get({ signal: controller.signal });
		const last = v2.tags.get();
		await advance(500);
		controller.abort();

		await expect(aborted).rejects.toMatchObject({ code: "ERR_CANCELED" });
		await advance(1000);
		await Promise.all([first, last]);
		expect(sentAt).toEqual([0, 1000]);
	});
});

describe("retries", () => {
	it("makes every retry wait for its own turn", async () => {
		const { adapter, sentAt } = scripted({ status: 504 }, { status: 504 });
		const { v2 } = client(adapter, {
			rateLimit: { v2: { requestsPerMinute: 60 } },
			retryConfig: {
				retries: 2,
				retryCondition: isGatewayTimeout,
				retryDelay: () => 0,
			},
		});

		const call = v2.tags.get();
		await advance(3000);
		await call;

		expect(sentAt).toEqual([0, 1000, 2000]);
	});

	it("queues a retry behind requests that were already waiting", async () => {
		const { adapter, sentAt, urls } = scripted("timeout");
		const { v2 } = client(adapter, {
			rateLimit: { v2: { requestsPerMinute: 60 } },
			retryConfig: {
				retries: 1,
				retryCondition: (error) => error.code === "ECONNABORTED",
				retryDelay: () => 0,
			},
		});

		const calls = Promise.all([
			v2.request({ url: "first" }),
			v2.request({ url: "second" }),
		]);
		await advance(3000);
		await calls;

		expect(sentAt).toEqual([0, 1000, 2000]);
		expect(urls).toEqual(["first", "second", "first"]);
	});

	it("still applies retryDelay to failures other than 429", async () => {
		const { adapter, sentAt } = scripted({ status: 504 });
		const { v2 } = client(adapter, {
			retryConfig: {
				retries: 1,
				retryCondition: isGatewayTimeout,
				retryDelay: () => 5000,
			},
		});

		const call = v2.tags.get();
		await advance(6000);
		await call;

		expect(sentAt).toEqual([0, 5000]);
	});

	it("applies a per-call retry policy and its delay", async () => {
		const { adapter, sentAt } = scripted(
			{ status: 504 },
			{ status: 200 },
			{ status: 504 },
		);
		const { v2 } = client(adapter);

		const call = v2.tags.get({
			"axios-retry": {
				retries: 1,
				retryCondition: isGatewayTimeout,
				retryDelay: () => 2000,
			},
		});
		await advance(3000);
		await call;
		expect(sentAt).toEqual([0, 2000]);

		// The client itself still never retries
		await expect(v2.tags.get()).rejects.toMatchObject({
			response: { status: 504 },
		});
		expect(sentAt).toHaveLength(3);
	});
});

describe("429 pause", () => {
	it("holds every request on the client until Retry-After has passed", async () => {
		const { adapter, sentAt } = scripted(tooManyRequests(5));
		const { v2 } = client(adapter, {
			rateLimit: { v2: { requestsPerMinute: 600 } },
		});

		const limited = v2.tags.get();
		// Already waiting for a turn when the 429 arrives
		const waiting = Promise.all([v2.tags.get(), v2.tags.get()]);
		await expect(limited).rejects.toMatchObject({ response: { status: 429 } });

		await advance(1000);
		// Started after the 429
		const later = v2.tags.get();
		await advance(5000);
		await Promise.all([waiting, later]);

		expect(sentAt).toEqual([0, 5000, 5100, 5200]);
	});

	it("reads Retry-After given as an HTTP date", async () => {
		const retryAt = new Date(Date.now() + 3000).toUTCString();
		const { adapter, sentAt } = scripted({
			status: 429,
			headers: { "retry-after": retryAt },
		});
		const { v2 } = client(adapter);

		await expect(v2.tags.get()).rejects.toMatchObject({
			response: { status: 429 },
		});
		const next = v2.tags.get();
		await advance(4000);
		await next;

		// HTTP dates have whole-second precision
		expect(sentAt[1]).toBeGreaterThanOrEqual(2000);
		expect(sentAt[1]).toBeLessThanOrEqual(3000);
	});

	it("falls back to a 30 second pause without Retry-After", async () => {
		const { adapter, sentAt } = scripted(tooManyRequests());
		const { v2 } = client(adapter);

		await expect(v2.tags.get()).rejects.toMatchObject({
			response: { status: 429 },
		});
		const next = v2.tags.get();
		await advance(31_000, 500);
		await next;

		expect(sentAt).toEqual([0, 30_000]);
	});

	it("uses the configured fallback pause", async () => {
		const { adapter, sentAt } = scripted(tooManyRequests());
		const { v2 } = client(adapter, {
			rateLimit: { v2: { fallbackPauseMs: 7000 } },
		});

		await expect(v2.tags.get()).rejects.toMatchObject({
			response: { status: 429 },
		});
		const next = v2.tags.get();
		await advance(8000);
		await next;

		expect(sentAt).toEqual([0, 7000]);
	});

	it("uses X-Rate-Limit-Reset for a v1 429 without Retry-After", async () => {
		const { adapter, sentAt } = scripted({
			status: 429,
			headers: { "X-Rate-Limit-Reset": "12" },
		});
		const { v1 } = client(adapter);

		await expect(v1.orders.get(1)).rejects.toMatchObject({
			response: { status: 429 },
		});
		const next = v1.orders.get(2);
		await advance(13_000, 500);
		await next;

		expect(sentAt).toEqual([0, 12_000]);
	});

	it("does not pause another client", async () => {
		const { adapter, sentAt } = scripted(tooManyRequests(30));
		const first = client(adapter);
		const second = client(adapter);

		await expect(first.v2.tags.get()).rejects.toMatchObject({
			response: { status: 429 },
		});
		const other = second.v2.tags.get();
		await advance(100);
		await other;

		expect(sentAt).toEqual([0, 0]);
	});

	it("sends the retry of a 429 when the pause ends, without adding retryDelay", async () => {
		const { adapter, sentAt } = scripted(tooManyRequests(2));
		const { v2 } = client(adapter, {
			retryConfig: {
				retries: 1,
				retryCondition: is429,
				retryDelay: () => 10_000,
			},
		});

		const call = v2.tags.get();
		await advance(3000);
		await call;

		expect(sentAt).toEqual([0, 2000]);
	});

	it("retries a 429 with the default retryDelay once, after the pause", async () => {
		const { adapter, sentAt } = scripted(tooManyRequests(4));
		const { v2 } = client(adapter, {
			retryConfig: { retries: 1, retryCondition: is429 },
		});

		const call = v2.tags.get();
		await advance(5000);
		await call;

		expect(sentAt).toEqual([0, 4000]);
	});

	it("retries a 429 even when Retry-After is longer than the timeout", async () => {
		const { adapter, sentAt } = scripted(tooManyRequests(20));
		const { v2 } = new ShipStation({
			credentials,
			requestConfig: { adapter, timeout: 15_000 },
			retryConfig: { retries: 1, retryCondition: is429 },
		});

		const call = v2.tags.get();
		await advance(21_000, 500);
		await call;

		expect(sentAt).toEqual([0, 20_000]);
	});

	it("applies the pause to per-call retries of a 429, ignoring their retryDelay", async () => {
		const { adapter, sentAt } = scripted(tooManyRequests(3));
		const { v2 } = client(adapter);

		const call = v2.tags.get({
			"axios-retry": {
				retries: 1,
				retryCondition: is429,
				retryDelay: () => 60_000,
			},
		});
		await advance(4000);
		await call;

		expect(sentAt).toEqual([0, 3000]);
	});
});

describe("onAttempt", () => {
	it("reports every attempt, successful or not", async () => {
		const { adapter } = scripted(
			{
				status: 429,
				headers: { "Retry-After": "2" },
				data: { request_id: "req-429", errors: [] },
			},
			{ status: 504 },
		);
		const attempts: ShipStationAttempt[] = [];
		const { v2 } = client(adapter, {
			rateLimit: { v2: { requestsPerMinute: 60 } },
			retryConfig: {
				retries: 2,
				retryCondition: (error) => is429(error) || isGatewayTimeout(error),
				retryDelay: () => 0,
			},
			onAttempt: (attempt) => attempts.push(attempt),
		});

		const call = v2.rates.getById("se-1");
		await advance(5000);
		await call;

		// axios-retry resends after a zero-delay timer, so a retry joins the queue one clock step after the failure
		const delays = attempts.map(({ delayMs }) => delayMs);
		expect(delays[0]).toBe(0);
		expect(delays[1]).toBeWithin(1950, 2001);
		expect(delays[2]).toBeWithin(950, 1001);

		const reported = attempts.map(({ delayMs: _, ...rest }) => rest);
		const attempt = { api: "v2", method: "GET", url: "rates/se-1" };
		expect(reported).toEqual([
			{
				...attempt,
				status: 429,
				errorCode: undefined,
				retryCount: 0,
				durationMs: 0,
				pauseMs: 2000,
				requestId: "req-429",
			},
			{
				...attempt,
				status: 504,
				errorCode: undefined,
				retryCount: 1,
				durationMs: 0,
				pauseMs: undefined,
				requestId: undefined,
			},
			{
				...attempt,
				status: 200,
				errorCode: undefined,
				retryCount: 2,
				durationMs: 0,
				pauseMs: undefined,
				requestId: undefined,
			},
		]);
	});

	it("reports a timeout by its error code", async () => {
		const { adapter } = scripted("timeout");
		const attempts: ShipStationAttempt[] = [];
		const { v1 } = client(adapter, {
			onAttempt: (attempt) => attempts.push(attempt),
		});

		await expect(v1.orders.get(1)).rejects.toMatchObject({
			code: "ECONNABORTED",
		});

		expect(attempts).toMatchObject([
			{ api: "v1", status: undefined, errorCode: "ECONNABORTED" },
		]);
	});

	it("ignores errors thrown by the hook", async () => {
		const { adapter } = scripted({ status: 200, data: { tags: [] } });
		const { v2 } = client(adapter, {
			onAttempt: () => {
				throw new Error("logging failed");
			},
		});

		await expect(v2.tags.get()).resolves.toEqual({ tags: [] });
	});
});
