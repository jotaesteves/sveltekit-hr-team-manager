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
		alias: {
			$components: path.resolve('./src/lib/components'),
			$stores: path.resolve('./src/stores'),
			$assets: path.resolve('./src/assets'),
			$lib: path.resolve('./src/lib')
		}
	}
};

export default config;
