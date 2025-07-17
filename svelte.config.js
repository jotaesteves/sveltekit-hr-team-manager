import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use static adapter for GitHub Pages deployment
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			base: dev ? '' : (process.env.BASE_PATH ?? '')
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignore 404 errors for the root path when using a base path in production
				if (path === '/' && !dev && process.env.BASE_PATH) {
					console.warn(`Ignoring 404 for root path '/' - this is expected when using BASE_PATH`);
					return;
				}
				// For any other errors, throw to fail the build
				throw new Error(message);
			},
			entries: ['*']
		},
		alias: {
			$components: path.resolve('./src/lib/components'),
			$stores: path.resolve('./src/stores'),
			$assets: path.resolve('./src/assets'),
			$lib: path.resolve('./src/lib')
		}
	}
};

export default config;
