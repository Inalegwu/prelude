// deno-lint-ignore-file no-namespace

export namespace Hash {
	export const randomXDigitHash = (length = 4) =>
		Math.random().toString(16).split(".")[1]?.substring(0, length);

	export const randomuuid = (prefix?: string, separator = "_", length = 7) =>
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
