<script>
	import CrudTable from '$components/CrudTable.svelte';
	import { peopleStore } from '../../stores/dataStore.js';

	// Use the people store
	$: users = $peopleStore;

	// Define columns for the table
	columns={[
		{ key: 'name', label: 'Name', placeholder: 'Enter employee name' },
		{ key: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address' },
		{ key: 'position', label: 'Position', placeholder: 'Enter job position' },
		{ key: 'department', label: 'Department', placeholder: 'Enter department' },
		{ key: 'hireDate', label: 'Hire Date', type: 'date' },
		{ key: 'isActive', label: 'Active', type: 'checkbox' }
	]}	// CRUD handlers using the store
	/**
	 * @param {any} newUser
	 */
	function handleCreate(newUser) {
		peopleStore.add(newUser);
	}

	/**
	 * @param {any} updatedUser
	 */
	function handleUpdate(updatedUser) {
		peopleStore.update(updatedUser);
	}

	/**
	 * @param {number} id
	 */
	function handleDelete(id) {
		peopleStore.remove(id);
	}
</script>

<CrudTable
	title="People Management"
	addButtonText="Add New Person"
	items={users}
	{columns}
	onCreate={handleCreate}
	onUpdate={handleUpdate}
	onDelete={handleDelete}
/>
