<script>
	import CrudTable from '$lib/components/CrudTable.svelte';

	// Sample data for settings
	let systemSettings = [
		{
			id: 1,
			category: 'General',
			settingName: 'Company Name',
			settingValue: 'Acme Corporation',
			description: 'Name of the organization',
			dataType: 'text',
			isEditable: true,
			lastModified: '2024-03-01',
			modifiedBy: 'Admin'
		},
		{
			id: 2,
			category: 'Reviews',
			settingName: 'Review Cycle Frequency',
			settingValue: 'Quarterly',
			description: 'How often performance reviews are conducted',
			dataType: 'select',
			isEditable: true,
			lastModified: '2024-02-15',
			modifiedBy: 'HR Manager'
		},
		{
			id: 3,
			category: 'Security',
			settingName: 'Session Timeout',
			settingValue: '30',
			description: 'Session timeout in minutes',
			dataType: 'number',
			isEditable: true,
			lastModified: '2024-01-20',
			modifiedBy: 'IT Admin'
		}
	];

	// Define columns for the settings table
	const columns = [
		{
			key: 'category',
			label: 'Category',
			type: 'select',
			required: true,
			options: [
				{ value: 'General', label: 'General' },
				{ value: 'Reviews', label: 'Reviews' },
				{ value: 'Security', label: 'Security' },
				{ value: 'Notifications', label: 'Notifications' },
				{ value: 'Integration', label: 'Integration' }
			]
		},
		{
			key: 'settingName',
			label: 'Setting Name',
			type: 'text',
			required: true,
			placeholder: 'Enter setting name'
		},
		{
			key: 'settingValue',
			label: 'Value',
			type: 'text',
			required: true,
			placeholder: 'Enter setting value'
		},
		{
			key: 'description',
			label: 'Description',
			type: 'textarea',
			placeholder: 'Describe the setting'
		},
		{
			key: 'dataType',
			label: 'Data Type',
			type: 'select',
			options: [
				{ value: 'text', label: 'Text' },
				{ value: 'number', label: 'Number' },
				{ value: 'boolean', label: 'Boolean' },
				{ value: 'select', label: 'Select' },
				{ value: 'date', label: 'Date' }
			]
		},
		{ key: 'isEditable', label: 'Editable', type: 'checkbox' },
		{ key: 'lastModified', label: 'Last Modified', type: 'date', placeholder: 'Select date' },
		{ key: 'modifiedBy', label: 'Modified By', type: 'text', placeholder: 'User name' }
	];

	// CRUD handlers
	/**
	 * @param {any} newSetting
	 */
	function handleCreate(newSetting) {
		const setting = {
			...newSetting,
			id: Date.now(),
			lastModified: new Date().toISOString().split('T')[0],
			modifiedBy: 'Current User'
		};
		systemSettings = [...systemSettings, setting];
	}

	/**
	 * @param {any} updatedSetting
	 */
	function handleUpdate(updatedSetting) {
		const setting = {
			...updatedSetting,
			lastModified: new Date().toISOString().split('T')[0],
			modifiedBy: 'Current User'
		};
		systemSettings = systemSettings.map((s) => (s.id === setting.id ? setting : s));
	}

	/**
	 * @param {number} id
	 */
	function handleDelete(id) {
		systemSettings = systemSettings.filter((setting) => setting.id !== id);
	}

	// Settings categories for organization
	const settingsCategories = [
		{
			name: 'General',
			description: 'Basic company and application settings',
			settings: systemSettings.filter((s) => s.category === 'General')
		},
		{
			name: 'Reviews',
			description: 'Performance review and evaluation settings',
			settings: systemSettings.filter((s) => s.category === 'Reviews')
		},
		{
			name: 'Security',
			description: 'Security and access control settings',
			settings: systemSettings.filter((s) => s.category === 'Security')
		}
	];
</script>

<div class="space-y-6">
	<!-- Settings Overview -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 text-xl font-semibold">Settings Overview</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			{#each settingsCategories as category}
				<div class="rounded-lg border p-4">
					<h3 class="text-lg font-medium">{category.name}</h3>
					<p class="mb-2 text-sm text-gray-600">{category.description}</p>
					<span class="font-semibold text-blue-600">{category.settings.length} settings</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Settings Management -->
	<CrudTable
		title="System Settings"
		addButtonText="Add New Setting"
		items={systemSettings}
		{columns}
		onCreate={handleCreate}
		onUpdate={handleUpdate}
		onDelete={handleDelete}
	/>
</div>
