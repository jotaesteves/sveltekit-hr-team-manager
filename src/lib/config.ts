import { base } from '$app/paths';

export const config = {
	// Base path for GitHub Pages deployment
	basePath: base,

	// API endpoints (adjust as needed)
	api: {
		base: `${base}/api`
	},

	// Application metadata
	app: {
		name: 'SvelteKit HR Team Manager',
		version: '0.0.1',
		description: 'A modern HR management application'
	}
};
