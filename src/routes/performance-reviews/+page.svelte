<script>
	import CrudTable from '$components/CrudTable.svelte';

	// Sample data for performance reviews
	let performanceReviews = [
		{
			id: 1,
			employeeName: 'John Doe',
			reviewPeriod: '2024 Annual Review',
			reviewType: 'Annual',
			selfAssessmentScore: 8,
			managerScore: 8.5,
			peerScore: 8.2,
			overallRating: 'Exceeds Expectations',
			strengthsAreas: 'Technical expertise, Problem-solving, Initiative',
			improvementAreas: 'Communication, Time management',
			careerGoals: 'Senior Developer role, Technical leadership',
			developmentPlan: 'Leadership training, Advanced technical courses',
			reviewDate: '2024-03-01',
			nextReviewDate: '2025-03-01',
			status: 'Completed'
		},
		{
			id: 2,
			employeeName: 'Jane Smith',
			reviewPeriod: '2024 Q1 Review',
			reviewType: 'Quarterly',
			selfAssessmentScore: 9,
			managerScore: 9.2,
			peerScore: 9.1,
			overallRating: 'Outstanding',
			strengthsAreas: 'Leadership, Strategic thinking, Team development',
			improvementAreas: 'Work-life balance',
			careerGoals: 'Director level, Cross-functional leadership',
			developmentPlan: 'Executive coaching, Strategic planning course',
			reviewDate: '2024-04-01',
			nextReviewDate: '2024-07-01',
			status: 'In Progress'
		}
	];

	// Define columns for the performance reviews table
	const columns = [
		{ key: 'employeeName', label: 'Employee', type: 'text', required: true, placeholder: 'Enter employee name' },
		{ key: 'reviewPeriod', label: 'Review Period', type: 'text', required: true, placeholder: 'e.g., 2024 Annual' },
		{ key: 'reviewType', label: 'Review Type', type: 'text', required: true, placeholder: 'e.g., Annual, Quarterly' },
		{ key: 'selfAssessmentScore', label: 'Self Score', type: 'number', placeholder: 'Score (1-10)' },
		{ key: 'managerScore', label: 'Manager Score', type: 'number', placeholder: 'Score (1-10)' },
		{ key: 'peerScore', label: 'Peer Score', type: 'number', placeholder: 'Score (1-10)' },
		{ key: 'overallRating', label: 'Overall Rating', type: 'text', placeholder: 'e.g., Outstanding, Exceeds' },
		{ key: 'strengthsAreas', label: 'Strengths', type: 'text', placeholder: 'List key strengths' },
		{ key: 'improvementAreas', label: 'Improvement Areas', type: 'text', placeholder: 'Areas for development' },
		{ key: 'careerGoals', label: 'Career Goals', type: 'text', placeholder: 'Career aspirations' },
		{ key: 'developmentPlan', label: 'Development Plan', type: 'text', placeholder: 'Learning and development plan' },
		{ key: 'reviewDate', label: 'Review Date', type: 'date', placeholder: 'Select review date' },
		{ key: 'nextReviewDate', label: 'Next Review', type: 'date', placeholder: 'Select next review date' },
		{ key: 'status', label: 'Status', type: 'text', placeholder: 'e.g., Completed, In Progress' }
	];

	// CRUD handlers
	/**
	 * @param {any} newReview
	 */
	function handleCreate(newReview) {
		const review = {
			...newReview,
			id: Date.now()
		};
		performanceReviews = [...performanceReviews, review];
	}

	/**
	 * @param {any} updatedReview
	 */
	function handleUpdate(updatedReview) {
		performanceReviews = performanceReviews.map((review) => 
			(review.id === updatedReview.id ? updatedReview : review)
		);
	}

	/**
	 * @param {number} id
	 */
	function handleDelete(id) {
		performanceReviews = performanceReviews.filter((review) => review.id !== id);
	}
</script>

<CrudTable
	title="Performance Reviews"
	addButtonText="Add New Performance Review"
	items={performanceReviews}
	{columns}
	onCreate={handleCreate}
	onUpdate={handleUpdate}
	onDelete={handleDelete}
/>
