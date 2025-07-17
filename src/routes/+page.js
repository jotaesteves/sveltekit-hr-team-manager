import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const prerender = true;

export function load() {
	// If we have a base path and we're at the root, redirect to the base path
	if (base && typeof window !== 'undefined' && window.location.pathname === '/') {
		throw redirect(301, base);
	}
}
