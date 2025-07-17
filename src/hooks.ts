import { i18n } from '$lib/i18n';
import { parseCookie } from '$lib/parseCookie';

export const getSession = async (ev: {
	request: { headers: { get: (arg0: string) => string | null } };
	locals: { user: { user: string | null; theme: 'light' | 'dark' } };
}) => {
	const cookies = ev.request.headers.get('cookie');
	const user = cookies ? parseCookie(cookies).user || null : null;
	const theme: 'light' | 'dark' =
		cookies && parseCookie(cookies).theme === 'dark' ? 'dark' : 'light';

	return (ev.locals.user = {
		user: user,
		theme: theme || 'light'
	});
};

export const reroute = i18n.reroute();
