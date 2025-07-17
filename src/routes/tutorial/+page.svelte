<script>
	import CrudTable from '$lib/components/CrudTable.svelte';

	// Sample data for tutorials and help content
	let tutorials = [
		{
			id: 1,
			title: 'Getting Started with HR Manager',
			category: 'Basic',
			description: 'Learn the basics of navigating and using the HR management system',
			content:
				'This tutorial covers system navigation, user interface overview, and basic functionality...',
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
			answer:
				'Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.',
			category: 'Account',
			helpfulness: 95
		},
		{
			id: 2,
			question: 'How can I schedule a performance review?',
			answer:
				'Navigate to the Performance Reviews section, click "Add New Review", and fill in the required details including employee, reviewer, and review period.',
			category: 'Performance',
			helpfulness: 88
		},
		{
			id: 3,
			question: 'Can I export data to Excel?',
			answer:
				'Yes, most data tables have an export feature. Look for the export button or use the Import/Export section for bulk operations.',
			category: 'Data',
			helpfulness: 92
		}
	];

	// Define columns for the tutorials table
	const tutorialColumns = [
		{
			key: 'title',
			label: 'Title',
			type: 'text',
			required: true,
			placeholder: 'Enter tutorial title'
		},
		{
			key: 'category',
			label: 'Category',
			type: 'text',
			required: true,
			placeholder: 'e.g., Basic, Performance'
		},
		{ key: 'description', label: 'Description', type: 'text', placeholder: 'Brief description' },
		{
			key: 'difficulty',
			label: 'Difficulty',
			type: 'text',
			placeholder: 'Beginner, Intermediate, Advanced'
		},
		{ key: 'estimatedTime', label: 'Est. Time', type: 'text', placeholder: 'e.g., 10 minutes' },
		{ key: 'videoUrl', label: 'Video URL', type: 'text', placeholder: 'Enter video URL' },
		{ key: 'tags', label: 'Tags', type: 'text', placeholder: 'Comma-separated tags' },
		{ key: 'author', label: 'Author', type: 'text', placeholder: 'Content author' },
		{ key: 'lastUpdated', label: 'Last Updated', type: 'date', placeholder: 'Select date' },
		{ key: 'isPublished', label: 'Published', type: 'checkbox' }
	];

	// Define columns for FAQ table
	const faqColumns = [
		{
			key: 'question',
			label: 'Question',
			type: 'text',
			required: true,
			placeholder: 'Enter question'
		},
		{ key: 'answer', label: 'Answer', type: 'text', required: true, placeholder: 'Enter answer' },
		{ key: 'category', label: 'Category', type: 'text', placeholder: 'FAQ category' },
		{
			key: 'helpfulness',
			label: 'Helpfulness %',
			type: 'number',
			placeholder: 'Helpfulness rating'
		}
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
			tutorial.id === updatedTutorial.id ? updatedTutorial : tutorial
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
		faqs = faqs.map((faq) => (faq.id === updatedFaq.id ? updatedFaq : faq));
	}

	/**
	 * @param {number} id
	 */
	function handleDeleteFaq(id) {
		faqs = faqs.filter((faq) => faq.id !== id);
	}

	// Tutorial categories for filtering
	$: tutorialCategories = [...new Set(tutorials.map((t) => t.category))];
	$: publishedTutorials = tutorials.filter((t) => t.isPublished);
</script>

<div class="mx-auto max-w-4xl space-y-8">
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-800">HR Team Manager Tutorial</h1>
		<p class="text-xl text-gray-600">Learn how to use our comprehensive HR management system</p>
	</div>

	<!-- Getting Started -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 flex items-center text-2xl font-semibold text-gray-800">
			<span
				class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white"
				>1</span
			>
			Getting Started
		</h2>
		<div class="space-y-4 text-gray-600">
			<p>
				Welcome to the HR Team Manager! This system helps you manage all aspects of human resources
				including employee data, performance reviews, feedback, and one-on-one meetings.
			</p>
			<div class="border-l-4 border-blue-500 bg-blue-50 p-4">
				<p class="font-medium text-blue-800">Navigation</p>
				<p class="text-blue-700">
					Use the sidebar on the left to navigate between different modules. The main modules
					include People, Reviews, Feedback, One-on-One meetings, and more.
				</p>
			</div>
		</div>
	</div>

	<!-- Managing People -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 flex items-center text-2xl font-semibold text-gray-800">
			<span
				class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white"
				>2</span
			>
			Managing People
		</h2>
		<div class="space-y-4 text-gray-600">
			<p>The People module allows you to manage employee information including:</p>
			<ul class="list-disc space-y-2 pl-6">
				<li><strong>Personal Information:</strong> Names, email addresses, positions</li>
				<li><strong>Employment Details:</strong> Department, hire date, active status</li>
				<li><strong>Search & Filter:</strong> Use the search bar to quickly find employees</li>
			</ul>
			<div class="border-l-4 border-green-500 bg-green-50 p-4">
				<p class="font-medium text-green-800">Pro Tip</p>
				<p class="text-green-700">
					Click "Add New Employee" to add team members. Use the checkbox fields to mark employees as
					active or inactive.
				</p>
			</div>
		</div>
	</div>

	<!-- Performance Reviews -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 flex items-center text-2xl font-semibold text-gray-800">
			<span
				class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white"
				>3</span
			>
			Performance Reviews
		</h2>
		<div class="space-y-4 text-gray-600">
			<p>Manage the complete performance review lifecycle:</p>
			<ul class="list-disc space-y-2 pl-6">
				<li>
					<strong>Review Creation:</strong> Set up reviews with employee, reviewer, and period
				</li>
				<li><strong>Status Tracking:</strong> Monitor review progress from Draft to Completed</li>
				<li><strong>Scoring:</strong> Record overall performance scores and detailed feedback</li>
				<li>
					<strong>Goal Setting:</strong> Document goals and action items for future development
				</li>
			</ul>
		</div>
	</div>

	<!-- Feedback System -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 flex items-center text-2xl font-semibold text-gray-800">
			<span
				class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white"
				>4</span
			>
			Feedback System
		</h2>
		<div class="space-y-4 text-gray-600">
			<p>Facilitate continuous feedback culture:</p>
			<ul class="list-disc space-y-2 pl-6">
				<li>
					<strong>Multiple Types:</strong> Peer, Manager, Upward, and Self-Assessment feedback
				</li>
				<li>
					<strong>Anonymous Options:</strong> Enable anonymous feedback for honest communication
				</li>
				<li><strong>Rating System:</strong> Use 1-10 scoring for quantitative assessment</li>
				<li><strong>Status Management:</strong> Track feedback from submission to review</li>
			</ul>
		</div>
	</div>

	<!-- One-on-One Meetings -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 flex items-center text-2xl font-semibold text-gray-800">
			<span
				class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white"
				>5</span
			>
			One-on-One Meetings
		</h2>
		<div class="space-y-4 text-gray-600">
			<p>Schedule and track regular one-on-one meetings:</p>
			<ul class="list-disc space-y-2 pl-6">
				<li><strong>Scheduling:</strong> Set meeting dates and duration</li>
				<li><strong>Agenda Planning:</strong> Document discussion topics in advance</li>
				<li><strong>Meeting Notes:</strong> Record key discussion points</li>
				<li><strong>Action Items:</strong> Track follow-up tasks and commitments</li>
				<li><strong>Next Meeting:</strong> Schedule recurring meetings efficiently</li>
			</ul>
		</div>
	</div>

	<!-- Advanced Features -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 flex items-center text-2xl font-semibold text-gray-800">
			<span
				class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white"
				>6</span
			>
			Advanced Features
		</h2>
		<div class="space-y-6 text-gray-600">
			<div>
				<h3 class="mb-2 font-semibold text-gray-800">Performance Grid</h3>
				<p>
					Visualize team performance with the interactive performance grid. Compare employee ratings
					across different criteria with color-coded heatmaps.
				</p>
			</div>
			<div>
				<h3 class="mb-2 font-semibold text-gray-800">Evaluation Criteria</h3>
				<p>
					Define custom evaluation criteria with weighted scoring. Set up criteria that align with
					your organization's values and goals.
				</p>
			</div>
			<div>
				<h3 class="mb-2 font-semibold text-gray-800">Import/Export</h3>
				<p>
					Bulk import employee data and export reports for analysis. Track all import/export
					operations with detailed logs.
				</p>
			</div>
			<div>
				<h3 class="mb-2 font-semibold text-gray-800">Settings Management</h3>
				<p>
					Configure system-wide settings including company information, review cycles, and security
					preferences.
				</p>
			</div>
		</div>
	</div>

	<!-- Best Practices -->
	<div class="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
		<h2 class="mb-4 text-2xl font-semibold text-gray-800">💡 Best Practices</h2>
		<div class="grid gap-6 text-gray-600 md:grid-cols-2">
			<div>
				<h3 class="mb-2 font-semibold text-gray-800">Regular Updates</h3>
				<p>Keep employee information current and schedule regular review cycles.</p>
			</div>
			<div>
				<h3 class="mb-2 font-semibold text-gray-800">Consistent Feedback</h3>
				<p>Encourage ongoing feedback rather than waiting for formal review periods.</p>
			</div>
			<div>
				<h3 class="mb-2 font-semibold text-gray-800">Goal Tracking</h3>
				<p>Set SMART goals and regularly review progress during one-on-ones.</p>
			</div>
			<div>
				<h3 class="mb-2 font-semibold text-gray-800">Data Security</h3>
				<p>Regularly review access permissions and maintain confidentiality.</p>
			</div>
		</div>
	</div>

	<!-- Support -->
	<div class="rounded-lg bg-white p-6 text-center shadow-md">
		<h2 class="mb-4 text-2xl font-semibold text-gray-800">Need Help?</h2>
		<p class="mb-4 text-gray-600">
			Our HR Team Manager is designed to be intuitive, but we're here to help if you need
			assistance.
		</p>
		<div class="flex justify-center space-x-4">
			<button class="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600">
				Contact Support
			</button>
			<button class="rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 hover:bg-gray-200">
				View Documentation
			</button>
		</div>
	</div>

	<!-- Tutorial Overview -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h1 class="mb-4 text-2xl font-bold">Help & Tutorial Center</h1>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
			<div class="rounded-lg bg-blue-50 p-4">
				<h3 class="text-lg font-medium text-blue-800">Total Tutorials</h3>
				<p class="text-2xl font-bold text-blue-600">{tutorials.length}</p>
			</div>
			<div class="rounded-lg bg-green-50 p-4">
				<h3 class="text-lg font-medium text-green-800">Published</h3>
				<p class="text-2xl font-bold text-green-600">{publishedTutorials.length}</p>
			</div>
			<div class="rounded-lg bg-purple-50 p-4">
				<h3 class="text-lg font-medium text-purple-800">Categories</h3>
				<p class="text-2xl font-bold text-purple-600">{tutorialCategories.length}</p>
			</div>
			<div class="rounded-lg bg-orange-50 p-4">
				<h3 class="text-lg font-medium text-orange-800">FAQ Items</h3>
				<p class="text-2xl font-bold text-orange-600">{faqs.length}</p>
			</div>
		</div>
	</div>

	<!-- Quick Access Tutorials -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 text-xl font-semibold">Featured Tutorials</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each publishedTutorials.slice(0, 6) as tutorial}
				<div class="rounded-lg border p-4 transition-shadow hover:shadow-md">
					<div class="mb-2 flex items-start justify-between">
						<h3 class="text-sm font-medium">{tutorial.title}</h3>
						<span class="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
							{tutorial.difficulty}
						</span>
					</div>
					<p class="mb-2 text-sm text-gray-600">{tutorial.description}</p>
					<div class="flex items-center justify-between text-sm text-gray-500">
						<span>{tutorial.estimatedTime}</span>
						<span>{tutorial.category}</span>
					</div>
					{#if tutorial.videoUrl}
						<button
							class="mt-2 w-full rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
						>
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
