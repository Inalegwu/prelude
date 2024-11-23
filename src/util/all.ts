// deno-lint-ignore-file no-namespace

/**
 * A utility namespace providing various helper functions for common tasks.
 *
 * @namespace Util
 *
 * @example
 * // Example usage of the debounce function within the Util namespace:
 * const [debouncedFn, cancel] = Util.debounce((args) => console.log(args), 200);
 * debouncedFn("Hello");
 * // Logs "Hello" after 200ms
 */
export namespace Util {
	/**
	 * Creates a debounced version of the provided function. The debounced function delays
	 * the execution of the original function until after the specified wait time has elapsed
	 * since the last time the debounced function was invoked.
	 *
	 * @template A - The arguments type of the input function.
	 * @template R - The return type of the input function.
	 *
	 * @param {function(A): R} fn - The function to debounce.
	 * @param {number} ms - The debounce delay in milliseconds.
	 *
	 * @returns {[function(A): Promise<R>, function(): void]} A tuple containing:
	 *   - A debounced version of the input function that returns a Promise resolving
	 *     to the return value of the original function.
	 *   - A teardown function to clear the debounce timeout manually.
	 *
	 * @example
	 * const [debouncedFn, cancel] = debounce((args) => console.log(args), 200);
	 * debouncedFn("Hello");
	 * // Logs "Hello" after 200ms
	 *
	 * @example
	 * const [debouncedFn, cancel] = debounce((args) => console.log(args), 500);
	 * debouncedFn("Hello");
	 * cancel(); // Cancels the pending debounced function
	 */
	export function debounce<A = unknown[], R = void>(
		fn: (args: A) => R,
		ms: number,
	): [(args: A) => Promise<R>, () => void] {
		let t: ReturnType<typeof setTimeout> | undefined = undefined;

		const debounceFn = (args: A): Promise<R> =>
			new Promise((resolve) => {
				if (t) {
					clearTimeout(t);
				}

				t = setTimeout(() => resolve(fn(args)), ms);
			});

		const teardown = () => clearTimeout(t);

		return [debounceFn, teardown];
	}

	/**
	 * Creates a throttled version of the provided function. The throttled function ensures
	 * the original function is only executed at most once within the specified interval.
	 *
	 * @template A - The arguments type of the input function.
	 * @template R - The return type of the input function.
	 *
	 * @param {(...args: A) => R} fn - The function to throttle.
	 * @param {number} interval - The time interval in milliseconds to enforce throttling.
	 *
	 * @returns {[(...args: A) => R | void, () => void]} A tuple containing:
	 *   - A throttled version of the input function.
	 *   - A teardown function to clear the throttle timeout manually.
	 *
	 * @example
	 * const [throttledFn, cancel] = throttle((message: string) => console.log(message), 1000);
	 * throttledFn("Hello"); // Executes immediately
	 * throttledFn("World"); // Ignored if called within 1 second of the last call
	 */
	export function throttle<A extends unknown[], R>(
		fn: (...args: A) => R,
		interval: number,
		// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
	): [(...args: A) => R | void, () => void] {
		let lastCallTime = 0;
		let timeoutId: ReturnType<typeof setTimeout> | null = null;

		// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
		const throttledFn = (...args: A): R | void => {
			const now = Date.now();

			if (now - lastCallTime >= interval) {
				lastCallTime = now;
				return fn(...args);
			}

			if (!timeoutId) {
				timeoutId = setTimeout(
					() => {
						lastCallTime = Date.now();
						timeoutId = null;
						fn(...args);
					},
					interval - (now - lastCallTime),
				);
			}
		};

		const teardown = () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
		};

		return [throttledFn, teardown];
	}
}
