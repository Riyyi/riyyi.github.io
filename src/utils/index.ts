import { withTrailingSlash, withLeadingSlash, joinURL } from "ufo"
import { useRuntimeConfig } from "#imports"

/**
 * Returns if environment is in development mode
 */
export const isDev = process.env.NODE_ENV === "development";

/**
 * Gets URL path, taking into acount the baseURL
 */
export const getPublicPath = function (path: string): string {
	if (path?.startsWith("/") && !path.startsWith("//")) {
		const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL));
		if (_base !== "/" && !path.startsWith(_base)) {
			return joinURL(_base, path);
		}
	}

	return path;
}

/**
 * Return date string in format "Feb 10, 2025"
 */
export const prettyDate = function (date: string | Date): string {
	if (typeof date === "string") {
		date = new Date(date);
	}

	const formatted = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(date);

	return formatted;
}
