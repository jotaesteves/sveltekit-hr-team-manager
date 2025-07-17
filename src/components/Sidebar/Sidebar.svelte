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
	
	export let help = [
		{ name: 'Tutorial', route: '/tutorial', icon: '📚' }
	];

	// Check if route is active
	/**
	 * @param {string} route
	 */
	function isActive(route) {
		return $page.url.pathname === route;
	}
</script>

<aside class="w-64 bg-gray-800 text-white h-full overflow-y-auto">
	<!-- Logo/Header -->
	<div class="p-6 border-b border-gray-700">
		<h1 class="text-xl font-bold text-white">HR Manager</h1>
		<p class="text-sm text-gray-300">Team Performance Tool</p>
	</div>

	<!-- Navigation Sections -->
	<nav class="mt-6">
		<!-- Core Features -->
		<div class="px-4 mb-6">
			<h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Core Features</h2>
			<ul class="space-y-1">
				{#each core as item}
					<li>
						<a 
							href={item.route} 
							class="flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 {isActive(item.route) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
						>
							<span class="mr-3">{item.icon}</span>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Workflow -->
		<div class="px-4 mb-6">
			<h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Workflow</h2>
			<ul class="space-y-1">
				{#each workflow as item}
					<li>
						<a 
							href={item.route} 
							class="flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 {isActive(item.route) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
						>
							<span class="mr-3">{item.icon}</span>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Management -->
		<div class="px-4 mb-6">
			<h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Management</h2>
			<ul class="space-y-1">
				{#each management as item}
					<li>
						<a 
							href={item.route} 
							class="flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 {isActive(item.route) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
						>
							<span class="mr-3">{item.icon}</span>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Help & Support -->
		<div class="px-4 mb-6">
			<h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Help & Support</h2>
			<ul class="space-y-1">
				{#each help as item}
					<li>
						<a 
							href={item.route} 
							class="flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 {isActive(item.route) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
						>
							<span class="mr-3">{item.icon}</span>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>

	<!-- Footer -->
	<div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
		<div class="text-xs text-gray-400 text-center">
			<p>© 2024 HR Manager</p>
			<p>v1.0.0</p>
		</div>
	</div>
</aside>
