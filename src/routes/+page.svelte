<script>
	import { dashboardStats, peopleStore, reviewsStore, feedbackStore } from '../stores/dataStore.js';

	// Dashboard data from stores
	$: stats = $dashboardStats;

	let recentActivities = [
		{ type: 'review', message: 'New performance review created for John Doe', time: '2 hours ago' },
		{ type: 'feedback', message: 'Feedback submitted by Jane Smith', time: '4 hours ago' },
		{
			type: 'meeting',
			message: 'One-on-one meeting scheduled with Bob Johnson',
			time: '1 day ago'
		},
		{
			type: 'evaluation',
			message: 'Evaluation criteria updated: Leadership Skills',
			time: '2 days ago'
		}
	];

	let quickActions = [
		{
			title: 'Performance Grid',
			description: 'View and manage performance evaluations',
			link: '/grid',
			icon: '📊'
		},
		{ title: 'Add Employee', description: 'Add a new team member', link: '/people', icon: '👤' },
		{
			title: 'Schedule Review',
			description: 'Create a new performance review',
			link: '/reviews',
			icon: '📝'
		},
		{
			title: 'Import Data',
			description: 'Import employee or review data',
			link: '/import-export',
			icon: '📥'
		}
	];

	// Initialize dashboard stats on component mount
	$: {
		// Update stats with real data from stores
		dashboardStats.update((stats) => ({
			...stats,
			totalEmployees: $peopleStore.length,
			activeReviews: $reviewsStore.filter((r) => r.status === 'In Progress').length,
			pendingFeedback: $feedbackStore.filter((f) => f.status === 'Pending').length,
			completedEvaluations: 95 // This could be calculated from actual data
		}));
	}
</script>

<div class="space-y-6">
	<!-- Welcome Section -->
	<div class="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white shadow-lg">
		<h1 class="mb-2 text-3xl font-bold">Welcome to HR Team Manager</h1>
		<p class="text-xl opacity-90">
			Streamline your HR processes with comprehensive performance management tools
		</p>
	</div>

	<!-- Statistics Overview -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-lg bg-white p-6 shadow-md">
			<div class="flex items-center">
				<div class="mr-4 rounded-full bg-blue-100 p-3 text-blue-600">
					<span class="text-2xl">👥</span>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Total Employees</h3>
					<p class="text-3xl font-bold text-blue-600">{stats.totalEmployees}</p>
				</div>
			</div>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-md">
			<div class="flex items-center">
				<div class="mr-4 rounded-full bg-green-100 p-3 text-green-600">
					<span class="text-2xl">📋</span>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Active Reviews</h3>
					<p class="text-3xl font-bold text-green-600">{stats.activeReviews}</p>
				</div>
			</div>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-md">
			<div class="flex items-center">
				<div class="mr-4 rounded-full bg-orange-100 p-3 text-orange-600">
					<span class="text-2xl">💬</span>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Pending Feedback</h3>
					<p class="text-3xl font-bold text-orange-600">{stats.pendingFeedback}</p>
				</div>
			</div>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-md">
			<div class="flex items-center">
				<div class="mr-4 rounded-full bg-purple-100 p-3 text-purple-600">
					<span class="text-2xl">✅</span>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Completed Evaluations</h3>
					<p class="text-3xl font-bold text-purple-600">{stats.completedEvaluations}%</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 text-xl font-semibold">Quick Actions</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{#each quickActions as action}
				<a
					href={action.link}
					class="block rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-md"
				>
					<div class="text-center">
						<div class="mb-2 text-3xl">{action.icon}</div>
						<h3 class="font-semibold text-gray-800">{action.title}</h3>
						<p class="mt-1 text-sm text-gray-600">{action.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- Recent Activities -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 text-xl font-semibold">Recent Activities</h2>
		<div class="space-y-3">
			{#each recentActivities as activity}
				<div class="flex items-start space-x-3 rounded-lg bg-gray-50 p-3">
					<div
						class="rounded-full p-2 {activity.type === 'review'
							? 'bg-blue-100 text-blue-600'
							: activity.type === 'feedback'
								? 'bg-green-100 text-green-600'
								: activity.type === 'meeting'
									? 'bg-purple-100 text-purple-600'
									: 'bg-orange-100 text-orange-600'}"
					>
						{#if activity.type === 'review'}📋
						{:else if activity.type === 'feedback'}💬
						{:else if activity.type === 'meeting'}📅
						{:else}⚙️
						{/if}
					</div>
					<div class="flex-1">
						<p class="text-gray-800">{activity.message}</p>
						<p class="text-sm text-gray-500">{activity.time}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Getting Started Guide -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 text-xl font-semibold">Getting Started</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="p-4 text-center">
				<div class="mb-3 text-4xl">1️⃣</div>
				<h3 class="mb-2 font-semibold">Set Up Your Team</h3>
				<p class="text-sm text-gray-600">
					Add your employees and define their roles in the People section
				</p>
				<a href="/people" class="text-sm text-blue-500 hover:text-blue-700">Go to People →</a>
			</div>
			<div class="p-4 text-center">
				<div class="mb-3 text-4xl">2️⃣</div>
				<h3 class="mb-2 font-semibold">Define Evaluation Criteria</h3>
				<p class="text-sm text-gray-600">
					Create the criteria that will be used for performance evaluations
				</p>
				<a href="/evaluation-criterias" class="text-sm text-blue-500 hover:text-blue-700"
					>Setup Criteria →</a
				>
			</div>
			<div class="p-4 text-center">
				<div class="mb-3 text-4xl">3️⃣</div>
				<h3 class="mb-2 font-semibold">Start Evaluating</h3>
				<p class="text-sm text-gray-600">
					Use the Performance Grid to conduct comprehensive evaluations
				</p>
				<a href="/grid" class="text-sm text-blue-500 hover:text-blue-700">Open Grid →</a>
			</div>
		</div>
	</div>
</div>
