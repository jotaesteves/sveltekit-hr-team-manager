<script>
	import CrudTable from '$components/CrudTable.svelte';

	// Sample data for import/export operations
	let importExportOperations = [
		{
			id: 1,
			operationType: 'Import',
			dataType: 'People',
			fileName: 'employees_2024.csv',
			recordsProcessed: 150,
			recordsSuccess: 148,
			recordsFailed: 2,
			status: 'Completed',
			executedBy: 'Admin User',
			executedDate: '2024-03-10',
			notes: 'Import successful with 2 validation errors'
		},
		{
			id: 2,
			operationType: 'Export',
			dataType: 'Performance Reviews',
			fileName: 'performance_reviews_q1_2024.xlsx',
			recordsProcessed: 75,
			recordsSuccess: 75,
			recordsFailed: 0,
			status: 'Completed',
			executedBy: 'HR Manager',
			executedDate: '2024-03-15',
			notes: 'Quarterly export for reporting'
		}
	];

	// Define columns for the import/export table
	const columns = [
		{ 
			key: 'operationType', 
			label: 'Operation', 
			type: 'select',
			required: true,
			options: [
				{ value: 'Import', label: 'Import' },
				{ value: 'Export', label: 'Export' }
			]
		},
		{ 
			key: 'dataType', 
			label: 'Data Type', 
			type: 'select',
			required: true,
			options: [
				{ value: 'People', label: 'People' },
				{ value: 'Performance Reviews', label: 'Performance Reviews' },
				{ value: 'Feedback', label: 'Feedback' },
				{ value: 'One-on-One Meetings', label: 'One-on-One Meetings' },
				{ value: 'Evaluation Criteria', label: 'Evaluation Criteria' }
			]
		},
		{ key: 'fileName', label: 'File Name', type: 'text', required: true, placeholder: 'Enter file name' },
		{ key: 'recordsProcessed', label: 'Records Processed', type: 'number', placeholder: 'Number of records' },
		{ key: 'recordsSuccess', label: 'Success Count', type: 'number', placeholder: 'Successful records' },
		{ key: 'recordsFailed', label: 'Failed Count', type: 'number', placeholder: 'Failed records' },
		{ 
			key: 'status', 
			label: 'Status', 
			type: 'select',
			required: true,
			options: [
				{ value: 'Pending', label: 'Pending' },
				{ value: 'In Progress', label: 'In Progress' },
				{ value: 'Completed', label: 'Completed' },
				{ value: 'Failed', label: 'Failed' },
				{ value: 'Cancelled', label: 'Cancelled' }
			]
		},
		{ key: 'executedBy', label: 'Executed By', type: 'text', required: true, placeholder: 'User name' },
		{ key: 'executedDate', label: 'Executed Date', type: 'date', placeholder: 'Select date' },
		{ key: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Additional notes' }
	];

	// CRUD handlers
	/**
	 * @param {any} newOperation
	 */
	function handleCreate(newOperation) {
		const operation = {
			...newOperation,
			id: Date.now(),
			executedDate: newOperation.executedDate || new Date().toISOString().split('T')[0]
		};
		importExportOperations = [...importExportOperations, operation];
	}

	/**
	 * @param {any} updatedOperation
	 */
	function handleUpdate(updatedOperation) {
		importExportOperations = importExportOperations.map((operation) => 
			(operation.id === updatedOperation.id ? updatedOperation : operation)
		);
	}

	/**
	 * @param {number} id
	 */
	function handleDelete(id) {
		importExportOperations = importExportOperations.filter((operation) => operation.id !== id);
	}

	// File upload and processing functions
	/**
	 * @param {Event} event
	 */
	function handleFileUpload(event) {
		const target = /** @type {HTMLInputElement} */ (event.target);
		const file = target.files?.[0];
		if (file) {
			// In a real app, this would process the file
			console.log('Processing file:', file.name);
			alert(`File ${file.name} uploaded for processing`);
		}
	}

	function exportData() {
		// In a real app, this would generate and download the export file
		alert('Export functionality would be implemented here');
	}
</script>

<div class="space-y-6">
	<!-- Import/Export Actions -->
	<div class="bg-white p-6 rounded-lg shadow-md">
		<h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
				<h3 class="text-lg font-medium mb-2">Import Data</h3>
				<p class="text-gray-600 mb-4">Upload CSV or Excel files to import data</p>
				<input 
					type="file" 
					accept=".csv,.xlsx,.xls" 
					on:change={handleFileUpload}
					class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
				/>
			</div>
			<div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
				<h3 class="text-lg font-medium mb-2">Export Data</h3>
				<p class="text-gray-600 mb-4">Download current data as CSV or Excel</p>
				<button 
					on:click={exportData}
					class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
				>
					Export Data
				</button>
			</div>
		</div>
	</div>

	<!-- Import/Export History -->
	<CrudTable
		title="Import/Export History"
		addButtonText="Add Operation Record"
		items={importExportOperations}
		{columns}
		onCreate={handleCreate}
		onUpdate={handleUpdate}
		onDelete={handleDelete}
	/>
</div>
