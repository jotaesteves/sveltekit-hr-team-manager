<script>
	import CrudTable from '$lib/components/CrudTable.svelte';

	// Sample data for feedback
	let feedbacks = [
		{
			id: 1,
			fromPerson: 'John Doe',
			toPerson: 'Jane Smith',
			feedbackType: 'Peer Feedback',
			subject: 'Great collaboration on Project X',
			message:
				'Jane showed excellent leadership skills during our recent project. Her communication was clear and she helped resolve conflicts effectively.',
			rating: 9,
			isAnonymous: false,
			dateSubmitted: '2024-03-10',
			status: 'Reviewed'
		},
		{
			id: 2,
			fromPerson: 'Anonymous',
			toPerson: 'Bob Johnson',
			feedbackType: 'Anonymous Feedback',
			subject: 'Areas for improvement',
			message:
				'Consider being more open to feedback and collaborative approaches to problem-solving.',
			rating: 6,
			isAnonymous: true,
			dateSubmitted: '2024-03-12',
			status: 'Pending'
		}
	];

	// Define columns for the feedback table
	const columns = [
		{
			key: 'fromPerson',
			label: 'From',
			type: 'text',
			required: true,
			placeholder: 'Enter sender name'
		},
		{
			key: 'toPerson',
			label: 'To',
			type: 'text',
			required: true,
			placeholder: 'Enter recipient name'
		},
		{
			key: 'feedbackType',
			label: 'Type',
			type: 'select',
			required: true,
			options: [
				{ value: 'Peer Feedback', label: 'Peer Feedback' },
				{ value: 'Manager Feedback', label: 'Manager Feedback' },
				{ value: 'Upward Feedback', label: 'Upward Feedback' },
				{ value: 'Self Assessment', label: 'Self Assessment' },
				{ value: 'Anonymous Feedback', label: 'Anonymous Feedback' }
			]
		},
		{
			key: 'subject',
			label: 'Subject',
			type: 'text',
			required: true,
			placeholder: 'Enter feedback subject'
		},
		{
			key: 'message',
			label: 'Message',
			type: 'textarea',
			required: true,
			placeholder: 'Enter feedback message'
		},
		{ key: 'rating', label: 'Rating', type: 'number', placeholder: 'Rating (1-10)' },
		{ key: 'isAnonymous', label: 'Anonymous', type: 'checkbox' },
		{ key: 'dateSubmitted', label: 'Date Submitted', type: 'date', placeholder: 'Select date' },
		{
			key: 'status',
			label: 'Status',
			type: 'select',
			options: [
				{ value: 'Pending', label: 'Pending' },
				{ value: 'Reviewed', label: 'Reviewed' },
				{ value: 'Archived', label: 'Archived' }
			]
		}
	];

	// CRUD handlers
	function handleCreate(newFeedback) {
		const feedback = {
			...newFeedback,
			id: Date.now(),
			dateSubmitted: newFeedback.dateSubmitted || new Date().toISOString().split('T')[0]
		};
		feedbacks = [...feedbacks, feedback];
	}

	function handleUpdate(updatedFeedback) {
		feedbacks = feedbacks.map((feedback) =>
			feedback.id === updatedFeedback.id ? updatedFeedback : feedback
		);
	}

	function handleDelete(id) {
		feedbacks = feedbacks.filter((feedback) => feedback.id !== id);
	}
</script>

<CrudTable
	title="Feedback Management"
	addButtonText="Add New Feedback"
	items={feedbacks}
	{columns}
	onCreate={handleCreate}
	onUpdate={handleUpdate}
	onDelete={handleDelete}
/>
