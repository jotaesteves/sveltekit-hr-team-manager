/**
 * Parses the document.cookie string and returns an object with key-value pairs.
 * @param {string} cookieString - The cookie string to parse.
 * @returns {Object} - An object representing the parsed cookies.
 */
export function parseCookie(cookieString: string) {
	return cookieString.split(';').reduce(
		(cookies: Record<string, string>, cookie) => {
			const [name, value] = cookie.split('=').map((c) => c.trim());
			cookies[name] = decodeURIComponent(value);
			return cookies;
		},
		{} as Record<string, string>
	);
}
