<script>
	import { page } from '$app/stores';

	// Function to generate a display-friendly route name
	/**
	 * @param {string} path
	 */
	function getRouteTitle(path) {
		// Handle root path
		if (path === '/') return 'Dashboard';

		// Get the last segment of the path
		const routeName = path.split('/').pop() || '';

		// Format the route name (replace hyphens with spaces and capitalize words)
		return routeName
			.replace(/-/g, ' ')
			.replace(/\b\w/g, (/** @type {string} */ char) => char.toUpperCase());
	}

	/**
	 * @param {string} path
	 */
	function getBreadcrumbs(path) {
		if (path === '/') return [{ name: 'Dashboard', path: '/' }];
		
		const segments = path.split('/').filter(Boolean);
		const breadcrumbs = [{ name: 'Dashboard', path: '/' }];
		
		let currentPath = '';
		segments.forEach(segment => {
			currentPath += `/${segment}`;
			breadcrumbs.push({
				name: segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
				path: currentPath
			});
		});
		
		return breadcrumbs;
	}

	// Use runes syntax - page.url is reactive
	$: routeTitle = getRouteTitle($page.url.pathname);
	$: breadcrumbs = getBreadcrumbs($page.url.pathname);
	$: currentTime = new Date().toLocaleString();

	// Mock user data - in a real app this would come from authentication
	const user = {
		name: 'John Doe',
		role: 'HR Manager',
		avatar: '👤'
	};
</script>

<header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
	<div class="flex items-center justify-between">
		<!-- Left side: Page title and breadcrumbs -->
		<div>
			<h1 class="text-2xl font-bold text-gray-800">{routeTitle}</h1>
			{#if breadcrumbs.length > 1}
				<nav class="flex mt-1" aria-label="Breadcrumb">
					<ol class="inline-flex items-center space-x-1 md:space-x-3">
						{#each breadcrumbs as crumb, index}
							<li class="inline-flex items-center">
								{#if index > 0}
									<span class="mx-2 text-gray-400">/</span>
								{/if}
								{#if index === breadcrumbs.length - 1}
									<span class="text-sm font-medium text-blue-600">{crumb.name}</span>
								{:else}
									<a href={crumb.path} class="text-sm font-medium text-gray-500 hover:text-blue-600">
										{crumb.name}
									</a>
								{/if}
							</li>
						{/each}
					</ol>
				</nav>
			{/if}
		</div>

		<!-- Right side: User info and actions -->
		<div class="flex items-center space-x-4">
			<!-- Current time -->
			<div class="hidden md:block text-sm text-gray-500">
				{currentTime}
			</div>

			<!-- Quick actions -->
			<div class="flex space-x-2">
				<button 
					class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
					title="Notifications"
				>
					🔔
				</button>
				<button 
					class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
					title="Settings"
				>
					⚙️
				</button>
			</div>

			<!-- User menu -->
			<div class="flex items-center space-x-3 pl-4 border-l border-gray-200">
				<div class="hidden md:block text-right">
					<div class="text-sm font-medium text-gray-800">{user.name}</div>
					<div class="text-xs text-gray-500">{user.role}</div>
				</div>
				<div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
					{user.avatar}
				</div>
			</div>
		</div>
	</div>
</header>
