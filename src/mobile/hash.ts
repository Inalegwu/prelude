// deno-lint-ignore-file no-namespace

/**
 * A namespace containing utility functions for generating random hash strings
 * and UUID-like strings, suitable for use in a React Native environment.
 *
 * @namespace Hash
 *
 * @example
 * // Example usage of the Hash namespace:
 * import { Hash } from '@disgruntleddevs/prelude/mobile';
 *
 * const shortHash = Hash.randomXDigitHash(4);
 * console.log(shortHash); // Outputs a random 4-character hexadecimal string
 *
 * const customUuid = Hash.randomuuid("user", "-", 5);
 * console.log(customUuid); // Outputs something like "user-a3f9b-c1e34-9da84"
 */
export namespace Hash {
	/**
	 * Generates a random hexadecimal hash string of the specified length.
	 *
	 * @param {number} [length=4] - The desired length of the hash. Defaults to 4.
	 *
	 * @returns {string} A random hexadecimal hash string of the specified length.
	 *
	 * @example
	 * const hash = randomXDigitHash(6);
	 * console.log(hash); // Outputs a random 6-character hexadecimal string, e.g., "a3f9b1"
	 *
	 * @example
	 * const hash = randomXDigitHash();
	 * console.log(hash); // Outputs a random 4-character hexadecimal string, e.g., "c9a2"
	 */
	export const randomXDigitHash = (length = 4): string =>
		Math.random().toString(16).split(".")[1]?.substring(0, length);

	/**
	 * Generates a random UUID-like string composed of multiple hexadecimal hash segments.
	 * Optionally includes a prefix and uses a customizable separator.
	 *
	 * @param {string} [prefix] - An optional prefix to include at the beginning of the generated string.
	 * @param {string} [separator="_"] - The string used to separate the hash segments. Defaults to "_".
	 * @param {number} [length=7] - The length of each hash segment. Defaults to 7.
	 *
	 * @returns {string} A random UUID-like string. If a prefix is provided, it is prepended with the separator.
	 *
	 * @example
	 * const uuid = randomuuid("prefix", "-", 5);
	 * console.log(uuid); // Outputs something like "prefix-a3f9b-c1e34-9da84"
	 *
	 * @example
	 * const uuid = randomuuid(undefined, ".", 6);
	 * console.log(uuid); // Outputs something like "a3f9b1.c1e349.9da841"
	 *
	 * @example
	 * const uuid = randomuuid("id");
	 * console.log(uuid); // Outputs something like "id_a3f9b1_c1e349_9da841"
	 */
	export const randomuuid = (
		prefix?: string,
		separator = "_",
		length = 7,
	): string =>
		prefix
			? `${prefix}${separator}${new Array(3)
					.fill(0)
					.map(() => randomXDigitHash(length))
					.join(separator)}`
			: new Array(3)
					.fill(0)
					.map(() => randomXDigitHash(length))
					.join(separator);
}
