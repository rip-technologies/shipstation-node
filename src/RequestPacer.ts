import type { GenericAbortSignal } from "axios";

interface Waiter {
	release: () => void;
	signal?: GenericAbortSignal;
	onAbort?: () => void;
}

/**
 * Hands out turns to start requests, one at a time and evenly spaced, in the order they were asked for.
 *
 * Two timestamps decide when the next turn is due: `nextStartAt` spaces turns `60_000 / requestsPerMinute` ms apart,
 * and `pausedUntil` holds every turn back after a 429. Waiters sit in one FIFO queue served by a single timer, so a
 * pause that starts while requests are already waiting also holds those requests back.
 */
export class RequestPacer {
	readonly intervalMs: number;
	private nextStartAt = 0;
	private pausedUntil = 0;
	private readonly queue: Waiter[] = [];
	private timer: ReturnType<typeof setTimeout> | undefined;

	constructor(requestsPerMinute: number) {
		if (!(Number.isFinite(requestsPerMinute) && requestsPerMinute > 0)) {
			throw new RangeError(
				`rateLimit.requestsPerMinute must be a positive number, got ${requestsPerMinute}`,
			);
		}

		this.intervalMs = 60_000 / requestsPerMinute;
	}

	/**
	 * Resolves when the caller may start its request. If `signal` aborts while waiting, it resolves at once without
	 * taking a turn, so axios can cancel the request before sending it.
	 */
	waitForTurn(signal?: GenericAbortSignal): Promise<void> {
		return new Promise((resolve) => {
			if (signal?.aborted) {
				resolve();
				return;
			}

			const waiter: Waiter = { release: resolve, signal };
			if (signal?.addEventListener) {
				waiter.onAbort = () => {
					const index = this.queue.indexOf(waiter);
					if (index !== -1) {
						this.queue.splice(index, 1);
					}
					resolve();
				};
				signal.addEventListener("abort", waiter.onAbort);
			}

			this.queue.push(waiter);
			if (!this.timer) {
				this.serve();
			}
		});
	}

	/** Holds back every turn, including those already waiting, until `ms` from now. */
	pauseFor(ms: number) {
		const until = Date.now() + ms;
		if (until <= this.pausedUntil) {
			return;
		}

		this.pausedUntil = until;
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = undefined;
		}
		this.serve();
	}

	private serve = () => {
		this.timer = undefined;

		while (this.queue.length > 0) {
			const now = Date.now();
			const startAt = Math.max(this.nextStartAt, this.pausedUntil);
			if (startAt > now) {
				this.timer = setTimeout(this.serve, startAt - now);
				return;
			}

			const waiter = this.queue.shift() as Waiter;
			if (waiter.onAbort) {
				waiter.signal?.removeEventListener?.("abort", waiter.onAbort);
			}
			this.nextStartAt = now + this.intervalMs;
			waiter.release();
		}
	};
}
