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
		let t: number;

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
}
