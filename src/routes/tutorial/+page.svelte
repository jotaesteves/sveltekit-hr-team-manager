<script>
	import CrudTable from '$components/CrudTable.svelte';

	// Sample data for tutorials and help content
	let tutorials = [
		{
			id: 1,
			title: 'Getting Started with HR Manager',
			category: 'Basic',
			description: 'Learn the basics of navigating and using the HR management system',
			content: 'This tutorial covers system navigation, user interface overview, and basic functionality...',
			difficulty: 'Beginner',
			estimatedTime: '10 minutes',
			videoUrl: 'https://example.com/video1',
			tags: 'navigation, basics, getting-started',
			author: 'Training Team',
			lastUpdated: '2024-03-01',
			isPublished: true
		},
		{
			id: 2,
			title: 'Managing Performance Reviews',
			category: 'Performance',
			description: 'Complete guide to setting up and conducting performance reviews',
			content: 'Step-by-step instructions for creating review cycles, managing evaluations...',
			difficulty: 'Intermediate',
			estimatedTime: '25 minutes',
			videoUrl: 'https://example.com/video2',
			tags: 'performance, reviews, evaluation',
			author: 'HR Team',
			lastUpdated: '2024-02-28',
			isPublished: true
		},
		{
			id: 3,
			title: 'Advanced Reporting Features',
			category: 'Reporting',
			description: 'Learn to create custom reports and analytics dashboards',
			content: 'Advanced reporting capabilities, custom filters, export options...',
			difficulty: 'Advanced',
			estimatedTime: '45 minutes',
			videoUrl: '',
			tags: 'reporting, analytics, advanced',
			author: 'Product Team',
			lastUpdated: '2024-03-05',
			isPublished: false
		}
	];

	// FAQ data
	let faqs = [
		{
			id: 1,
			question: 'How do I reset my password?',
			answer: 'Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.',
			category: 'Account',
			helpfulness: 95
		},
		{
			id: 2,
			question: 'How can I schedule a performance review?',
			answer: 'Navigate to the Performance Reviews section, click "Add New Review", and fill in the required details including employee, reviewer, and review period.',
			category: 'Performance',
			helpfulness: 88
		},
		{
			id: 3,
			question: 'Can I export data to Excel?',
			answer: 'Yes, most data tables have an export feature. Look for the export button or use the Import/Export section for bulk operations.',
			category: 'Data',
			helpfulness: 92
		}
	];

	// Define columns for the tutorials table
	const tutorialColumns = [
		{ key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter tutorial title' },
		{ key: 'category', label: 'Category', type: 'text', required: true, placeholder: 'e.g., Basic, Performance' },
		{ key: 'description', label: 'Description', type: 'text', placeholder: 'Brief description' },
		{ key: 'difficulty', label: 'Difficulty', type: 'text', placeholder: 'Beginner, Intermediate, Advanced' },
		{ key: 'estimatedTime', label: 'Est. Time', type: 'text', placeholder: 'e.g., 10 minutes' },
		{ key: 'videoUrl', label: 'Video URL', type: 'text', placeholder: 'Enter video URL' },
		{ key: 'tags', label: 'Tags', type: 'text', placeholder: 'Comma-separated tags' },
		{ key: 'author', label: 'Author', type: 'text', placeholder: 'Content author' },
		{ key: 'lastUpdated', label: 'Last Updated', type: 'date', placeholder: 'Select date' },
		{ key: 'isPublished', label: 'Published', type: 'checkbox' }
	];

	// Define columns for FAQ table
	const faqColumns = [
		{ key: 'question', label: 'Question', type: 'text', required: true, placeholder: 'Enter question' },
		{ key: 'answer', label: 'Answer', type: 'text', required: true, placeholder: 'Enter answer' },
		{ key: 'category', label: 'Category', type: 'text', placeholder: 'FAQ category' },
		{ key: 'helpfulness', label: 'Helpfulness %', type: 'number', placeholder: 'Helpfulness rating' }
	];

	// Tutorial CRUD handlers
	/**
	 * @param {any} newTutorial
	 */
	function handleCreateTutorial(newTutorial) {
		const tutorial = {
			...newTutorial,
			id: Date.now(),
			lastUpdated: new Date().toISOString().split('T')[0],
			author: 'Current User'
		};
		tutorials = [...tutorials, tutorial];
	}

	/**
	 * @param {any} updatedTutorial
	 */
	function handleUpdateTutorial(updatedTutorial) {
		tutorials = tutorials.map((tutorial) => 
			(tutorial.id === updatedTutorial.id ? updatedTutorial : tutorial)
		);
	}

	/**
	 * @param {number} id
	 */
	function handleDeleteTutorial(id) {
		tutorials = tutorials.filter((tutorial) => tutorial.id !== id);
	}

	// FAQ CRUD handlers
	/**
	 * @param {any} newFaq
	 */
	function handleCreateFaq(newFaq) {
		const faq = {
			...newFaq,
			id: Date.now(),
			helpfulness: newFaq.helpfulness || 0
		};
		faqs = [...faqs, faq];
	}

	/**
	 * @param {any} updatedFaq
	 */
	function handleUpdateFaq(updatedFaq) {
		faqs = faqs.map((faq) => 
			(faq.id === updatedFaq.id ? updatedFaq : faq)
		);
	}

	/**
	 * @param {number} id
	 */
	function handleDeleteFaq(id) {
		faqs = faqs.filter((faq) => faq.id !== id);
	}

	// Tutorial categories for filtering
	$: tutorialCategories = [...new Set(tutorials.map(t => t.category))];
	$: publishedTutorials = tutorials.filter(t => t.isPublished);
</script>

<div class="space-y-8">
	<!-- Tutorial Overview -->
	<div class="bg-white p-6 rounded-lg shadow-md">
		<h1 class="text-2xl font-bold mb-4">Help & Tutorial Center</h1>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
			<div class="bg-blue-50 p-4 rounded-lg">
				<h3 class="text-lg font-medium text-blue-800">Total Tutorials</h3>
				<p class="text-2xl font-bold text-blue-600">{tutorials.length}</p>
			</div>
			<div class="bg-green-50 p-4 rounded-lg">
				<h3 class="text-lg font-medium text-green-800">Published</h3>
				<p class="text-2xl font-bold text-green-600">{publishedTutorials.length}</p>
			</div>
			<div class="bg-purple-50 p-4 rounded-lg">
				<h3 class="text-lg font-medium text-purple-800">Categories</h3>
				<p class="text-2xl font-bold text-purple-600">{tutorialCategories.length}</p>
			</div>
			<div class="bg-orange-50 p-4 rounded-lg">
				<h3 class="text-lg font-medium text-orange-800">FAQ Items</h3>
				<p class="text-2xl font-bold text-orange-600">{faqs.length}</p>
			</div>
		</div>
	</div>

	<!-- Quick Access Tutorials -->
	<div class="bg-white p-6 rounded-lg shadow-md">
		<h2 class="text-xl font-semibold mb-4">Featured Tutorials</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each publishedTutorials.slice(0, 6) as tutorial}
				<div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
					<div class="flex justify-between items-start mb-2">
						<h3 class="font-medium text-sm">{tutorial.title}</h3>
						<span class="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
							{tutorial.difficulty}
						</span>
					</div>
					<p class="text-sm text-gray-600 mb-2">{tutorial.description}</p>
					<div class="flex justify-between items-center text-sm text-gray-500">
						<span>{tutorial.estimatedTime}</span>
						<span>{tutorial.category}</span>
					</div>
					{#if tutorial.videoUrl}
						<button class="mt-2 w-full bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600">
							Watch Video
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Tutorials Management -->
	<CrudTable
		title="Tutorial Management"
		addButtonText="Add New Tutorial"
		items={tutorials}
		columns={tutorialColumns}
		onCreate={handleCreateTutorial}
		onUpdate={handleUpdateTutorial}
		onDelete={handleDeleteTutorial}
	/>

	<!-- FAQ Management -->
	<CrudTable
		title="FAQ Management"
		addButtonText="Add New FAQ"
		items={faqs}
		columns={faqColumns}
		onCreate={handleCreateFaq}
		onUpdate={handleUpdateFaq}
		onDelete={handleDeleteFaq}
	/>
</div>
