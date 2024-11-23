import { useEffect, useMemo } from "react";
import { Util } from "../index.ts";

/**
 * A React hook that returns a debounced version of the provided function.
 * The debounced function delays the execution of the original function until
 * after the specified wait time has elapsed since the last time it was invoked.
 * The hook ensures proper cleanup of the debounce timer when the component unmounts.
 *
 * @template A - The type of the arguments expected by the input function.
 * @template R - The return type of the input function.
 *
 * @param {(args: A) => R} fn - The function to debounce.
 * @param {number} ms - The debounce delay in milliseconds.
 *
 * @returns {(args: A) => Promise<R>} A debounced version of the input function
 * that returns a Promise resolving to the original function's return value.
 *
 * @example
 * import { useDebounce } from '@disgruntleddevs/prelude/react';
 *
 * function SearchComponent() {
 *   const handleSearch = useDebounce((query: string) => {
 *     console.log("Searching for:", query);
 *   }, 500);
 *
 *   return (
 *     <input
 *       type="text"
 *       placeholder="Search..."
 *       onChange={(e) => handleSearch(e.target.value)}
 *     />
 *   );
 * }
 *
 * @remarks
 * - The hook creates a debounced function that prevents the provided function
 *   from being executed too frequently.
 * - Automatically cleans up the debounce timer when the component unmounts.
 */
export function useDebounce<A = unknown[], R = void>(
	fn: (args: A) => R,
	ms: number,
): Promise<R> {
	const [debounceFn, tearDown] = useMemo(
		() => Util.debounce<A, R>(fn, ms),
		[fn, ms],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		return () => tearDown();
	}, []);

	return debounceFn;
}

/**
 * A React hook that provides a throttled version of the provided function. The function
 * is throttled to ensure it is executed at most once within the specified time interval.
 * The teardown logic is automatically handled when the component unmounts.
 *
 * @template A - The arguments type of the input function.
 * @template R - The return type of the input function.
 *
 * @param {(args: A) => R} fn - The function to throttle.
 * @param {number} ms - The throttle delay in milliseconds.
 *
 * @returns {(args: A) => void} A throttled version of the input function.
 *
 * @example
 * import { useThrottle } from '@disgruntleddevs/prelude/react';
 *
 * function App() {
 *   const log = useThrottle((message: string) => console.log(message), 1000);
 *
 *   return (
 *     <button onClick={() => log("Button clicked!")}>
 *       Click Me
 *     </button>
 *   );
 * }
 *
 * @remarks
 * - The hook ensures the provided function is called at most once per specified interval.
 * - Automatically cleans up the throttle timer on component unmount using `useEffect`.
 */
export function useThrottle<A = unknown[], R = void>(
	fn: (args: A) => R,
	ms: number,
	// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
): () => void | R {
	const [throttleFn, tearDown] = useMemo(() => Util.throttle(fn, ms), [fn, ms]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		return () => tearDown();
	}, []);

	return throttleFn;
}
