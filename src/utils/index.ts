import { withTrailingSlash, withLeadingSlash, joinURL } from "ufo"
import { useRuntimeConfig } from "#imports"

export const isDev = process.env.NODE_ENV === "development";

export const getPublicPath = function (path: string): string {
	if (path?.startsWith("/") && !path.startsWith("//")) {
		const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL));
		if (_base !== "/" && !path.startsWith(_base)) {
			return joinURL(_base, path);
		}
	}
	return path;
}

// datetime format
