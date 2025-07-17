// @ts-check
import { writable } from 'svelte/store';

// People store
const createPeopleStore = () => {
	const { subscribe, set, update } = writable([
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
	]);

	return {
		subscribe,
		/** @param {any} person */
		add: (person) => update((people) => [...people, { ...person, id: Date.now() }]),
		/** @param {any} updatedPerson */
		update: (updatedPerson) =>
			update((people) => people.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))),
		/** @param {number} id */
		remove: (id) => update((people) => people.filter((p) => p.id !== id)),
		reset: () => set([])
	};
};

// Evaluation Criteria store
const createCriteriaStore = () => {
	const { subscribe, set, update } = writable([
		{ id: 1, name: 'Teamwork', description: 'Ability to work in a team', weight: 20 },
		{ id: 2, name: 'Communication', description: 'Effectiveness in communication', weight: 25 },
		{
			id: 3,
			name: 'Technical Skills',
			description: 'Technical competency and expertise',
			weight: 30
		},
		{ id: 4, name: 'Leadership', description: 'Leadership qualities and potential', weight: 25 }
	]);

	return {
		subscribe,
		/** @param {any} criteria */
		add: (criteria) => update((criterias) => [...criterias, { ...criteria, id: Date.now() }]),
		/** @param {any} updatedCriteria */
		update: (updatedCriteria) =>
			update((criterias) =>
				criterias.map((c) => (c.id === updatedCriteria.id ? updatedCriteria : c))
			),
		/** @param {number} id */
		remove: (id) => update((criterias) => criterias.filter((c) => c.id !== id)),
		reset: () => set([])
	};
};

// Reviews store
const createReviewsStore = () => {
	const { subscribe, set, update } = writable([
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
	]);

	return {
		subscribe,
		/** @param {any} review */
		add: (review) => update((reviews) => [...reviews, { ...review, id: Date.now() }]),
		/** @param {any} updatedReview */
		update: (updatedReview) =>
			update((reviews) => reviews.map((r) => (r.id === updatedReview.id ? updatedReview : r))),
		/** @param {number} id */
		remove: (id) => update((reviews) => reviews.filter((r) => r.id !== id)),
		reset: () => set([])
	};
};

// Feedback store
const createFeedbackStore = () => {
	const { subscribe, set, update } = writable([
		{
			id: 1,
			fromPerson: 'John Doe',
			toPerson: 'Jane Smith',
			feedbackType: 'Peer Feedback',
			subject: 'Great collaboration on Project X',
			message: 'Jane showed excellent leadership skills during our recent project.',
			rating: 9,
			isAnonymous: false,
			dateSubmitted: '2024-03-10',
			status: 'Reviewed'
		}
	]);

	return {
		subscribe,
		/** @param {any} feedback */
		add: (feedback) => update((feedbacks) => [...feedbacks, { ...feedback, id: Date.now() }]),
		/** @param {any} updatedFeedback */
		update: (updatedFeedback) =>
			update((feedbacks) =>
				feedbacks.map((f) => (f.id === updatedFeedback.id ? updatedFeedback : f))
			),
		/** @param {number} id */
		remove: (id) => update((feedbacks) => feedbacks.filter((f) => f.id !== id)),
		reset: () => set([])
	};
};

// Performance grid store
const createPerformanceGridStore = () => {
	/** @type {import('svelte/store').Writable<Record<number, Record<number, {score: number, notes: string, lastUpdated: string, evaluatedBy: string}>>>} */
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
		/**
		 * @param {number} employeeId
		 * @param {number} criteriaId
		 * @param {number} score
		 * @param {string} notes
		 */
		updateScore: (employeeId, criteriaId, score, notes = '') =>
			update((grid) => ({
				...grid,
				[employeeId]: {
					...grid[employeeId],
					[criteriaId]: {
						score,
						notes,
						lastUpdated: new Date().toISOString().split('T')[0],
						evaluatedBy: 'Current User'
					}
				}
			})),
		/**
		 * @param {any[]} employees
		 * @param {any[]} criteria
		 */
		initializeGrid: (employees, criteria) => {
			/** @type {Record<number, Record<number, {score: number, notes: string, lastUpdated: string, evaluatedBy: string}>>} */
			const newGrid = {};
			employees.forEach((emp) => {
				newGrid[emp.id] = {};
				criteria.forEach((crit) => {
					newGrid[emp.id][crit.id] = {
						score: Math.floor(Math.random() * 5) + 1,
						notes: '',
						lastUpdated: '2024-03-15',
						evaluatedBy: 'Manager'
					};
				});
			});
			set(newGrid);
		},
		reset: () => set({})
	};
};

// Application settings store
const createSettingsStore = () => {
	const { subscribe, set, update } = writable({
		companyName: 'Acme Corporation',
		reviewCycle: 'Quarterly',
		enableNotifications: true,
		defaultTheme: 'light',
		sessionTimeout: 30
	});

	return {
		subscribe,
		/**
		 * @param {string} key
		 * @param {any} value
		 */
		updateSetting: (key, value) => update((settings) => ({ ...settings, [key]: value })),
		reset: () =>
			set({
				companyName: 'Acme Corporation',
				reviewCycle: 'Quarterly',
				enableNotifications: true,
				defaultTheme: 'light',
				sessionTimeout: 30
			})
	};
};

// Export all stores
export const peopleStore = createPeopleStore();
export const criteriaStore = createCriteriaStore();
export const reviewsStore = createReviewsStore();
export const feedbackStore = createFeedbackStore();
export const performanceGridStore = createPerformanceGridStore();
export const settingsStore = createSettingsStore();

// Computed stores
export const dashboardStats = writable({
	totalEmployees: 0,
	activeReviews: 0,
	pendingFeedback: 0,
	completedEvaluations: 0
});

// Update dashboard stats when other stores change
peopleStore.subscribe((people) => {
	dashboardStats.update((stats) => ({ ...stats, totalEmployees: people.length }));
});

reviewsStore.subscribe((reviews) => {
	const activeReviews = reviews.filter((r) => r.status === 'In Progress').length;
	dashboardStats.update((stats) => ({ ...stats, activeReviews }));
});

feedbackStore.subscribe((feedbacks) => {
	const pendingFeedback = feedbacks.filter((f) => f.status === 'Pending').length;
	dashboardStats.update((stats) => ({ ...stats, pendingFeedback }));
});
