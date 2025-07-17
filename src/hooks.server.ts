import type { Handle } from '@sveltejs/kit';
// import { i18n } from '$lib/i18n';
// const handleParaglide: Handle = i18n.handle();
// export const handle: Handle = handleParaglide;

// Temporary disable i18n to fix error
export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};
