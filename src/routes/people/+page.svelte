<script>
	import CrudTable from '$components/CrudTable.svelte';

	// Sample data - in a real app, this would come from a store or API
	let users = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			role: 'Developer',
			department: 'Engineering'
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			role: 'Designer',
			department: 'Design'
		},
		{
			id: 3,
			name: 'Bob Johnson',
			email: 'bob@example.com',
			role: 'Manager',
			department: 'Management'
		}
	];

	// Define columns for the table
	const columns = [
		{ key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter name' },
		{ key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter email' },
		{ key: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Enter role' },
		{
			key: 'department',
			label: 'Department',
			type: 'text',
			required: true,
			placeholder: 'Enter department'
		}
	];

	// CRUD handlers
	function handleCreate(newUser) {
		const user = {
			...newUser,
			id: Date.now() // In real app, this would be handled by backend
		};
		users = [...users, user];
	}

	function handleUpdate(updatedUser) {
		users = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
	}

	function handleDelete(id) {
		// In a real app, you might want to show a confirmation dialog
		users = users.filter((user) => user.id !== id);
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
