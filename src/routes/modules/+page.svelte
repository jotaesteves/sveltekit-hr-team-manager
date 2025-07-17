<script>
	import CrudTable from '$components/CrudTable.svelte';

	// Sample data for modules
	let modules = [
		{
			id: 1,
			moduleName: 'Performance Reviews',
			description: 'Comprehensive performance review and evaluation system',
			version: '1.2.0',
			status: 'Active',
			isEnabled: true,
			features: 'Self-assessment, Manager reviews, 360-degree feedback',
			dependencies: 'People Management, Evaluation Criteria',
			lastUpdated: '2024-03-01',
			developer: 'Internal Team'
		},
		{
			id: 2,
			moduleName: 'Goal Tracking',
			description: 'Set, track, and manage employee goals and objectives',
			version: '1.0.5',
			status: 'Active',
			isEnabled: true,
			features: 'Goal setting, Progress tracking, Achievement reports',
			dependencies: 'People Management',
			lastUpdated: '2024-02-20',
			developer: 'External Vendor'
		},
		{
			id: 3,
			moduleName: 'Learning Management',
			description: 'Training and development tracking system',
			version: '0.9.0',
			status: 'Beta',
			isEnabled: false,
			features: 'Course management, Skill tracking, Certification tracking',
			dependencies: 'People Management, Performance Reviews',
			lastUpdated: '2024-03-10',
			developer: 'Internal Team'
		}
	];

	// Define columns for the modules table
	const columns = [
		{ key: 'moduleName', label: 'Module Name', type: 'text', required: true, placeholder: 'Enter module name' },
		{ key: 'description', label: 'Description', type: 'text', required: true, placeholder: 'Module description' },
		{ key: 'version', label: 'Version', type: 'text', placeholder: 'e.g., 1.0.0' },
		{ key: 'status', label: 'Status', type: 'text', placeholder: 'e.g., Active, Beta, Deprecated' },
		{ key: 'isEnabled', label: 'Enabled', type: 'checkbox' },
		{ key: 'features', label: 'Features', type: 'text', placeholder: 'List key features' },
		{ key: 'dependencies', label: 'Dependencies', type: 'text', placeholder: 'Required modules' },
		{ key: 'lastUpdated', label: 'Last Updated', type: 'date', placeholder: 'Select date' },
		{ key: 'developer', label: 'Developer', type: 'text', placeholder: 'Developer/vendor name' }
	];

	// CRUD handlers
	/**
	 * @param {any} newModule
	 */
	function handleCreate(newModule) {
		const module = {
			...newModule,
			id: Date.now(),
			lastUpdated: new Date().toISOString().split('T')[0]
		};
		modules = [...modules, module];
	}

	/**
	 * @param {any} updatedModule
	 */
	function handleUpdate(updatedModule) {
		modules = modules.map((module) => 
			(module.id === updatedModule.id ? updatedModule : module)
		);
	}

	/**
	 * @param {number} id
	 */
	function handleDelete(id) {
		modules = modules.filter((module) => module.id !== id);
	}

	// Module management functions
	/**
	 * @param {number} moduleId
	 */
	function toggleModule(moduleId) {
		modules = modules.map((module) => 
			module.id === moduleId 
				? { ...module, isEnabled: !module.isEnabled }
				: module
		);
	}

	// Module statistics
	$: activeModules = modules.filter(m => m.status === 'Active').length;
	$: enabledModules = modules.filter(m => m.isEnabled).length;
	$: betaModules = modules.filter(m => m.status === 'Beta').length;
</script>

<div class="space-y-6">
	<!-- Module Statistics -->
	<div class="bg-white p-6 rounded-lg shadow-md">
		<h2 class="text-xl font-semibold mb-4">Module Overview</h2>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
			<div class="bg-blue-50 p-4 rounded-lg">
				<h3 class="text-lg font-medium text-blue-800">Total Modules</h3>
				<p class="text-2xl font-bold text-blue-600">{modules.length}</p>
			</div>
			<div class="bg-green-50 p-4 rounded-lg">
				<h3 class="text-lg font-medium text-green-800">Active</h3>
				<p class="text-2xl font-bold text-green-600">{activeModules}</p>
			</div>
			<div class="bg-purple-50 p-4 rounded-lg">
				<h3 class="text-lg font-medium text-purple-800">Enabled</h3>
				<p class="text-2xl font-bold text-purple-600">{enabledModules}</p>
			</div>
			<div class="bg-orange-50 p-4 rounded-lg">
				<h3 class="text-lg font-medium text-orange-800">Beta</h3>
				<p class="text-2xl font-bold text-orange-600">{betaModules}</p>
			</div>
		</div>
	</div>

	<!-- Quick Module Actions -->
	<div class="bg-white p-6 rounded-lg shadow-md">
		<h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each modules as module}
				<div class="border rounded-lg p-4 {module.isEnabled ? 'border-green-200 bg-green-50' : 'border-gray-200'}">
					<div class="flex justify-between items-start mb-2">
						<h3 class="font-medium">{module.moduleName}</h3>
						<span class="px-2 py-1 text-xs rounded {module.status === 'Active' ? 'bg-green-100 text-green-800' : module.status === 'Beta' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}">
							{module.status}
						</span>
					</div>
					<p class="text-sm text-gray-600 mb-3">{module.description}</p>
					<button 
						on:click={() => toggleModule(module.id)}
						class="w-full px-3 py-2 text-sm rounded {module.isEnabled ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'}"
					>
						{module.isEnabled ? 'Disable' : 'Enable'}
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- Module Management Table -->
	<CrudTable
		title="Module Management"
		addButtonText="Add New Module"
		items={modules}
		{columns}
		onCreate={handleCreate}
		onUpdate={handleUpdate}
		onDelete={handleDelete}
	/>
</div>
