<script>
	import { page } from '$app/state';
	import { derived } from 'svelte/store';

	// Function to generate a display-friendly route name
	/**
	 * @param {string} path
	 */
	function getRouteTitle(path) {
		// Handle root path
		if (path === '/') return 'Home';

		// Get the last segment of the path
		const routeName = path.split('/').pop() || '';

		// Format the route name (replace hyphens with spaces and capitalize words)
		return routeName
			.replace(/-/g, ' ')
			.replace(/\b\w/g, (/** @type {string} */ char) => char.toUpperCase());
	}

	const routeTitle = derived(page.url, ($url) => getRouteTitle($url.pathname));
</script>

<header>
	<h1>{$routeTitle}</h1>
</header>

<style>
	header {
		background-color: #333;
		color: white;
		padding: 1rem;
		text-align: center;
	}
</style>
