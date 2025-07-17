<script>
	import CrudTable from '$components/CrudTable.svelte';

	// Example initial data for evaluation criterias
	let criterias = [
		{ id: 1, name: 'Teamwork', description: 'Ability to work in a team' },
		{ id: 2, name: 'Communication', description: 'Effectiveness in communication' }
	];

	// Handler functions for CRUD operations
	/**
	 * @param {{ id: number; name: string; description: string; }} newCriteria
	 */
	function handleCreate(newCriteria) {
		criterias = [...criterias, { ...newCriteria, id: Date.now() }];
	}

	/**
	 * @param {{ id: number; }} updatedCriteria
	 */
	function handleUpdate(updatedCriteria) {
		criterias = criterias.map((c) =>
			c.id === updatedCriteria.id ? { ...c, ...updatedCriteria } : c
		);
	}

	/**
	 * @param {number} id
	 */
	function handleDelete(id) {
		criterias = criterias.filter((c) => c.id !== id);
	}
</script>

<h1>Evaluation Criterias</h1>
<CrudTable
	items={criterias}
	columns={[
		{ key: 'name', label: 'Name' },
		{ key: 'description', label: 'Description' }
	]}
	onCreate={handleCreate}
	onUpdate={handleUpdate}
	onDelete={handleDelete}
/>
