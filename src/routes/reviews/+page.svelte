<script>
	import CrudTable from '$lib/components/CrudTable.svelte';

	// Sample data for reviews
	let reviews = [
		{
			id: 1,
			employeeName: 'John Doe',
			reviewerName: 'Jane Smith',
			period: '2024 Q1',
			status: 'Completed',
			overallScore: 8.5,
			reviewDate: '2024-03-15',
			goals: 'Improve communication skills, Learn new technology',
			feedback: 'Strong technical performance, needs to work on team collaboration'
		},
		{
			id: 2,
			employeeName: 'Bob Johnson',
			reviewerName: 'Alice Brown',
			period: '2024 Q1',
			status: 'In Progress',
			overallScore: null,
			reviewDate: null,
			goals: 'Complete project delivery, Mentor junior developers',
			feedback: ''
		}
	];

	// Define columns for the reviews table
	const columns = [
		{
			key: 'employeeName',
			label: 'Employee',
			type: 'text',
			required: true,
			placeholder: 'Enter employee name'
		},
		{
			key: 'reviewerName',
			label: 'Reviewer',
			type: 'text',
			required: true,
			placeholder: 'Enter reviewer name'
		},
		{
			key: 'period',
			label: 'Review Period',
			type: 'text',
			required: true,
			placeholder: 'e.g., 2024 Q1'
		},
		{
			key: 'status',
			label: 'Status',
			type: 'select',
			required: true,
			options: [
				{ value: 'Draft', label: 'Draft' },
				{ value: 'In Progress', label: 'In Progress' },
				{ value: 'Completed', label: 'Completed' },
				{ value: 'Archived', label: 'Archived' }
			]
		},
		{ key: 'overallScore', label: 'Overall Score', type: 'number', placeholder: 'Score (1-10)' },
		{ key: 'reviewDate', label: 'Review Date', type: 'date', placeholder: 'Select date' },
		{ key: 'goals', label: 'Goals', type: 'textarea', placeholder: 'Enter review goals' },
		{ key: 'feedback', label: 'Feedback', type: 'textarea', placeholder: 'Enter feedback notes' }
	];

	// CRUD handlers
	function handleCreate(newReview) {
		const review = {
			...newReview,
			id: Date.now()
		};
		reviews = [...reviews, review];
	}

	function handleUpdate(updatedReview) {
		reviews = reviews.map((review) => (review.id === updatedReview.id ? updatedReview : review));
	}

	function handleDelete(id) {
		reviews = reviews.filter((review) => review.id !== id);
	}
</script>

<CrudTable
	title="Performance Reviews"
	addButtonText="Add New Review"
	items={reviews}
	{columns}
	onCreate={handleCreate}
	onUpdate={handleUpdate}
	onDelete={handleDelete}
/>
