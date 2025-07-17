<script>
	import CrudTable from '$components/CrudTable.svelte';

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
		{ key: 'category', label: 'Category', type: 'text', required: true, placeholder: 'e.g., General, Security' },
		{ key: 'settingName', label: 'Setting Name', type: 'text', required: true, placeholder: 'Enter setting name' },
		{ key: 'settingValue', label: 'Value', type: 'text', required: true, placeholder: 'Enter setting value' },
		{ key: 'description', label: 'Description', type: 'text', placeholder: 'Describe the setting' },
		{ key: 'dataType', label: 'Data Type', type: 'text', placeholder: 'e.g., text, number, boolean' },
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
		systemSettings = systemSettings.map((s) => 
			(s.id === setting.id ? setting : s)
		);
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
			settings: systemSettings.filter(s => s.category === 'General')
		},
		{
			name: 'Reviews',
			description: 'Performance review and evaluation settings',
			settings: systemSettings.filter(s => s.category === 'Reviews')
		},
		{
			name: 'Security',
			description: 'Security and access control settings',
			settings: systemSettings.filter(s => s.category === 'Security')
		}
	];
</script>

<div class="space-y-6">
	<!-- Settings Overview -->
	<div class="bg-white p-6 rounded-lg shadow-md">
		<h2 class="text-xl font-semibold mb-4">Settings Overview</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			{#each settingsCategories as category}
				<div class="border rounded-lg p-4">
					<h3 class="font-medium text-lg">{category.name}</h3>
					<p class="text-gray-600 text-sm mb-2">{category.description}</p>
					<span class="text-blue-600 font-semibold">{category.settings.length} settings</span>
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
