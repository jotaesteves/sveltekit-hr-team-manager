<script>
	import CrudTable from '$components/CrudTable.svelte';
	import { criteriaStore } from '../../stores/dataStore.js';

	// Use the criteria store
	$: criterias = $criteriaStore;

	// Handler functions for CRUD operations using the store
	/**
	 * @param {any} newCriteria
	 */
	function handleCreate(newCriteria) {
		criteriaStore.add(newCriteria);
	}

	/**
	 * @param {any} updatedCriteria
	 */
	function handleUpdate(updatedCriteria) {
		criteriaStore.update(updatedCriteria);
	}

	/**
	 * @param {number} id
	 */
	function handleDelete(id) {
		criteriaStore.remove(id);
	}
</script>

<CrudTable
	title="Evaluation Criterias"
	addButtonText="Add New Criteria"
	items={criterias}
	columns={[
		{ key: 'name', label: 'Name', placeholder: 'Enter criteria name' },
		{ key: 'description', label: 'Description', placeholder: 'Enter criteria description' },
		{ key: 'weight', label: 'Weight (%)', type: 'number', placeholder: 'Enter weight percentage' }
	]}
	onCreate={handleCreate}
	onUpdate={handleUpdate}
	onDelete={handleDelete}
/>
