<script>
	import { page } from '$app/stores';

	// Navigation structure
	export let core = [
		{ name: 'Dashboard', route: '/', icon: '🏠' },
		{ name: 'Performance Grid', route: '/grid', icon: '📊' },
		{ name: 'People', route: '/people', icon: '👥' },
		{ name: 'Evaluation Criterias', route: '/evaluation-criterias', icon: '📋' },
		{ name: 'Reviews', route: '/reviews', icon: '📝' }
	];

	export let workflow = [
		{ name: 'Feedback', route: '/feedback', icon: '💬' },
		{ name: 'One-on-One', route: '/one-on-one', icon: '👥' },
		{ name: 'Performance Reviews', route: '/performance-reviews', icon: '⭐' }
	];

	export let management = [
		{ name: 'Import/Export', route: '/import-export', icon: '📥' },
		{ name: 'Modules', route: '/modules', icon: '🧩' },
		{ name: 'Settings', route: '/settings', icon: '⚙️' }
	];

	export let help = [{ name: 'Tutorial', route: '/tutorial', icon: '📚' }];

	// Check if route is active
	/**
	 * @param {string} route
	 */
	function isActive(route) {
		return $page.url.pathname === route;
	}
</script>

<aside class="h-full w-64 overflow-y-auto bg-gray-800 text-white">
	<!-- Logo/Header -->
	<div class="border-b border-gray-700 p-6">
		<h1 class="text-xl font-bold text-white">HR Manager</h1>
		<p class="text-sm text-gray-300">Team Performance Tool</p>
	</div>

	<!-- Navigation Sections -->
	<nav class="mt-6">
		<!-- Core Features -->
		<div class="mb-6 px-4">
			<h2 class="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
				Core Features
			</h2>
			<ul class="space-y-1">
				{#each core as item}
					<li>
						<a
							href={item.route}
							class="flex items-center rounded-lg px-3 py-2 text-sm transition-colors duration-200 {isActive(
								item.route
							)
								? 'bg-blue-600 text-white'
								: 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
						>
							<span class="mr-3">{item.icon}</span>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Workflow -->
		<div class="mb-6 px-4">
			<h2 class="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Workflow</h2>
			<ul class="space-y-1">
				{#each workflow as item}
					<li>
						<a
							href={item.route}
							class="flex items-center rounded-lg px-3 py-2 text-sm transition-colors duration-200 {isActive(
								item.route
							)
								? 'bg-blue-600 text-white'
								: 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
						>
							<span class="mr-3">{item.icon}</span>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Management -->
		<div class="mb-6 px-4">
			<h2 class="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Management</h2>
			<ul class="space-y-1">
				{#each management as item}
					<li>
						<a
							href={item.route}
							class="flex items-center rounded-lg px-3 py-2 text-sm transition-colors duration-200 {isActive(
								item.route
							)
								? 'bg-blue-600 text-white'
								: 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
						>
							<span class="mr-3">{item.icon}</span>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Help & Support -->
		<div class="mb-6 px-4">
			<h2 class="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
				Help & Support
			</h2>
			<ul class="space-y-1">
				{#each help as item}
					<li>
						<a
							href={item.route}
							class="flex items-center rounded-lg px-3 py-2 text-sm transition-colors duration-200 {isActive(
								item.route
							)
								? 'bg-blue-600 text-white'
								: 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
						>
							<span class="mr-3">{item.icon}</span>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</aside>
