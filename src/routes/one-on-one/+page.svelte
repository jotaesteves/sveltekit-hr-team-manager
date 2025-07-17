<script>
	import CrudTable from '$lib/components/CrudTable.svelte';

	// Sample data for one-on-one meetings
	let oneOnOnes = [
		{
			id: 1,
			employee: 'John Doe',
			manager: 'Jane Smith',
			scheduledDate: '2024-03-20',
			duration: 60,
			status: 'Scheduled',
			agenda: 'Career development, current projects discussion, feedback session',
			notes: '',
			actionItems: 'Follow up on technical training, schedule code review sessions',
			nextMeetingDate: '2024-04-20'
		},
		{
			id: 2,
			employee: 'Bob Johnson',
			manager: 'Alice Brown',
			scheduledDate: '2024-03-15',
			duration: 45,
			status: 'Completed',
			agenda: 'Performance feedback, goal setting, career aspirations',
			notes: 'Bob expressed interest in leadership roles. Discussed upcoming project assignments.',
			actionItems: 'Enroll in leadership training, shadow senior manager for 2 weeks',
			nextMeetingDate: '2024-04-15'
		}
	];

	// Define columns for the one-on-one table
	const columns = [
		{
			key: 'employee',
			label: 'Employee',
			type: 'text',
			required: true,
			placeholder: 'Enter employee name'
		},
		{
			key: 'manager',
			label: 'Manager',
			type: 'text',
			required: true,
			placeholder: 'Enter manager name'
		},
		{
			key: 'scheduledDate',
			label: 'Scheduled Date',
			type: 'date',
			required: true,
			placeholder: 'Select date'
		},
		{
			key: 'duration',
			label: 'Duration (min)',
			type: 'number',
			placeholder: 'Meeting duration in minutes'
		},
		{
			key: 'status',
			label: 'Status',
			type: 'select',
			required: true,
			options: [
				{ value: 'Scheduled', label: 'Scheduled' },
				{ value: 'In Progress', label: 'In Progress' },
				{ value: 'Completed', label: 'Completed' },
				{ value: 'Cancelled', label: 'Cancelled' },
				{ value: 'Rescheduled', label: 'Rescheduled' }
			]
		},
		{ key: 'agenda', label: 'Agenda', type: 'textarea', placeholder: 'Enter meeting agenda' },
		{ key: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Enter meeting notes' },
		{
			key: 'actionItems',
			label: 'Action Items',
			type: 'textarea',
			placeholder: 'Enter action items'
		},
		{
			key: 'nextMeetingDate',
			label: 'Next Meeting',
			type: 'date',
			placeholder: 'Select next meeting date'
		}
	];

	// CRUD handlers
	function handleCreate(newOneOnOne) {
		const oneOnOne = {
			...newOneOnOne,
			id: Date.now()
		};
		oneOnOnes = [...oneOnOnes, oneOnOne];
	}

	function handleUpdate(updatedOneOnOne) {
		oneOnOnes = oneOnOnes.map((meeting) =>
			meeting.id === updatedOneOnOne.id ? updatedOneOnOne : meeting
		);
	}

	function handleDelete(id) {
		oneOnOnes = oneOnOnes.filter((meeting) => meeting.id !== id);
	}
</script>

<CrudTable
	title="One-on-One Meetings"
	addButtonText="Schedule New Meeting"
	items={oneOnOnes}
	{columns}
	onCreate={handleCreate}
	onUpdate={handleUpdate}
	onDelete={handleDelete}
/>
