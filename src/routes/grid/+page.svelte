<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { peopleStore, criteriaStore, performanceGridStore } from '../../stores/dataStore.js';
	import Grid from '$lib/components/Grid/Grid.svelte';

	// Grid component - The main star of the HR application
	$: employees = browser ? $peopleStore : [];
	$: criteria = browser ? $criteriaStore : [];
	/**
	 * @type {Record<number, Record<number, { score: number, notes?: string }>>}
	 */
	$: evaluationGrid =
		/** @type {Record<number, Record<number, { score: number, notes?: string }>>} */ (
			browser ? $performanceGridStore : {}
		);

	// Current view mode
	let viewMode = 'scores'; // 'scores', 'heatmap', 'detailed', 'matrix'
	let selectedPeriod = '2024 Q1';
	let showWeights = true;

	// Grid matrix view properties
	let showNames = true;
	let isDraggable = true; // Enable drag and drop by default
	let isEditable = true;

	// Sample data for the matrix view
	const reviewSettings = {
		scales: {
			4: {
				1: {
					1: { name: 'Poor' },
					2: { name: 'Below Average' },
					3: { name: 'Good' },
					4: { name: 'Excellent' }
				},
				2: {
					1: { name: 'Low' },
					2: { name: 'Medium' },
					3: { name: 'High' },
					4: { name: 'Very High' }
				}
			}
		},
		dimensions: {
			1: { name: 'Performance' },
			2: { name: 'Potential' },
			3: { name: 'Employability' }
		},
		roles: [
			{ name: 'Under Performer' },
			{ name: 'Core Performer' },
			{ name: 'Solid Performer' },
			{ name: 'High Performer' },
			{ name: 'Top Performer' }
		]
	};

	const review = {
		createdAt: new Date().toISOString(),
		reviewerName: 'HR Manager',
		name: 'Performance Review',
		reviewName: 'Q1 2024 Review',
		type: 'Quarterly'
	};

	// Convert employees to memberships format for the matrix view
	$: membershipData = (employees || []).map((emp, index) => ({
		id: emp.id,
		membershipId: emp.id,
		firstName: (emp.name || '').split(' ')[0],
		name: emp.name || 'Unknown',
		score: {
			values: {
				1: Math.floor(Math.random() * 4) + 1, // Performance (1-4)
				2: Math.floor(Math.random() * 4) + 1, // Potential (1-4)
				3: Math.floor(Math.random() * 4) + 1 // Employability (1-4)
			}
		}
	}));

	$: memberships = membershipData;

	const scale = {};
	const scaleColors = {};

	// Initialize the grid when component mounts
	onMount(() => {
		performanceGridStore.initializeGrid(employees, criteria);
	});

	/**
	 * @param {number} employeeId
	 * @param {number} criteriaId
	 * @param {number} newScore
	 */
	function updateScore(employeeId, criteriaId, newScore) {
		performanceGridStore.updateScore(employeeId, criteriaId, newScore);
	}

	/**
	 * @param {number} employeeId
	 * @param {number} criteriaId
	 * @param {string} notes
	 */
	function updateNotes(employeeId, criteriaId, notes) {
		const currentEvaluation = evaluationGrid[employeeId]?.[criteriaId];
		if (currentEvaluation) {
			performanceGridStore.updateScore(employeeId, criteriaId, currentEvaluation.score, notes);
		}
	}

	/**
	 * Handle drag and drop of members to update their performance and potential scores
	 * @param {CustomEvent} event
	 */
	function handleMemberDrop(event) {
		const { membership, d1, d2 } = event.detail;

		if (!membership || !membership.id) {
			console.error('Invalid membership data in drop event');
			return;
		}

		// Find the member in our data
		const memberIndex = membershipData.findIndex((m) => m.id === membership.id);
		if (memberIndex === -1) {
			console.error('Member not found:', membership.id);
			return;
		}

		// Update the member's scores based on the new grid position
		// d1 = performance index, d2 = potential index
		const updatedMember = {
			...membershipData[memberIndex],
			score: {
				...membershipData[memberIndex].score,
				values: {
					...membershipData[memberIndex].score.values,
					1: d1, // Performance score
					2: d2 // Potential score
				}
			}
		};

		// Update the membershipData array
		membershipData = [
			...membershipData.slice(0, memberIndex),
			updatedMember,
			...membershipData.slice(memberIndex + 1)
		];

		console.log(`Updated ${membership.firstName || membership.name}'s scores:`, {
			performance: d1,
			potential: d2,
			employability: updatedMember.score.values[3]
		});
	}

	/**
	 * @param {number} employeeId
	 */
	function calculateWeightedScore(employeeId) {
		let totalScore = 0;
		let totalWeight = 0;

		(criteria || []).forEach((crit) => {
			const evaluation = evaluationGrid[employeeId]?.[crit.id];
			if (evaluation?.score) {
				totalScore += evaluation.score * (crit.weight / 100);
				totalWeight += crit.weight / 100;
			}
		});

		return totalWeight > 0 ? (totalScore / totalWeight).toFixed(1) : '0';
	}

	/**
	 * @param {string | number} score
	 */
	function getScoreColor(score) {
		const numScore = typeof score === 'string' ? parseFloat(score) : score;
		if (numScore >= 4.5) return 'bg-green-500';
		if (numScore >= 3.5) return 'bg-blue-500';
		if (numScore >= 2.5) return 'bg-yellow-500';
		if (numScore >= 1.5) return 'bg-orange-500';
		return 'bg-red-500';
	}

	/**
	 * @param {string | number} score
	 */
	function getScoreLabel(score) {
		const numScore = typeof score === 'string' ? parseFloat(score) : score;
		if (numScore >= 4.5) return 'Excellent';
		if (numScore >= 3.5) return 'Good';
		if (numScore >= 2.5) return 'Average';
		if (numScore >= 1.5) return 'Below Average';
		return 'Poor';
	}

	// Export functionality
	function exportGrid() {
		const data = (employees || []).map((emp) => {
			/** @type {Record<string, any>} */
			const row = {
				Employee: emp.name,
				Role: emp.role,
				Department: emp.department,
				'Weighted Score': calculateWeightedScore(Number(emp.id))
			};

			(criteria || []).forEach((crit) => {
				const evaluation = evaluationGrid[emp.id]?.[crit.id];
				row[crit.name] = evaluation?.score || 0;
				row[`${crit.name} Notes`] = evaluation?.notes || '';
			});

			return row;
		});

		console.log('Export data:', data);
		alert('Grid data exported (check console for data)');
	}

	// Import functionality
	/**
	 * @param {Event} event
	 */
	function handleImport(event) {
		const target = /** @type {HTMLInputElement} */ (event.target);
		const file = target.files?.[0];
		if (file) {
			alert(`Import functionality would process: ${file.name}`);
		}
	}
</script>

<div class="space-y-6">
	<!-- Grid Header -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
			<div>
				<h1 class="text-2xl font-bold text-gray-800">Performance Evaluation Grid</h1>
				<p class="text-gray-600">Comprehensive performance matrix for {selectedPeriod}</p>
			</div>

			<div class="flex flex-wrap gap-2">
				<!-- View Mode Selector -->
				<select bind:value={viewMode} class="rounded-md border px-3 py-2">
					<option value="scores">Score View</option>
					<option value="heatmap">Heatmap View</option>
					<option value="detailed">Detailed View</option>
					<option value="matrix">Performance Matrix</option>
				</select>

				<!-- Period Selector -->
				<select bind:value={selectedPeriod} class="rounded-md border px-3 py-2">
					<option value="2024 Q1">2024 Q1</option>
					<option value="2023 Q4">2023 Q4</option>
					<option value="2023 Q3">2023 Q3</option>
				</select>

				<!-- Export/Import -->
				<button
					on:click={exportGrid}
					class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
				>
					Export
				</button>
				<label class="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
					Import
					<input type="file" accept=".csv,.xlsx" on:change={handleImport} class="hidden" />
				</label>
			</div>
		</div>

		<!-- Options -->
		<div class="mt-4 flex gap-4">
			<label class="flex items-center">
				<input type="checkbox" bind:checked={showWeights} class="mr-2" />
				Show Criteria Weights
			</label>
			{#if viewMode === 'matrix'}
				<label class="flex items-center">
					<input type="checkbox" bind:checked={showNames} class="mr-2" />
					Show Names
				</label>
				<label class="flex items-center">
					<input type="checkbox" bind:checked={isDraggable} class="mr-2" />
					Enable Drag & Drop
				</label>
			{/if}
		</div>
	</div>

	<!-- Grid Statistics -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
		<div class="rounded-lg bg-blue-50 p-4">
			<h3 class="text-lg font-medium text-blue-800">Total Employees</h3>
			<p class="text-2xl font-bold text-blue-600">{employees.length}</p>
		</div>
		<div class="rounded-lg bg-green-50 p-4">
			<h3 class="text-lg font-medium text-green-800">Evaluation Criteria</h3>
			<p class="text-2xl font-bold text-green-600">{criteria.length}</p>
		</div>
		<div class="rounded-lg bg-purple-50 p-4">
			<h3 class="text-lg font-medium text-purple-800">Evaluations</h3>
			<p class="text-2xl font-bold text-purple-600">{employees.length * criteria.length}</p>
		</div>
		<div class="rounded-lg bg-orange-50 p-4">
			<h3 class="text-lg font-medium text-orange-800">Completion Rate</h3>
			<p class="text-2xl font-bold text-orange-600">100%</p>
		</div>
	</div>

	<!-- Main Evaluation Grid -->
	{#if viewMode === 'matrix'}
		<!-- Performance Matrix View -->
		<div class="overflow-hidden rounded-lg bg-white shadow-md">
			<div class="p-6">
				<h2 class="mb-4 text-xl font-semibold">Performance vs Potential Matrix</h2>
				<div class="overflow-x-auto">
					<Grid
						{reviewSettings}
						{review}
						reviewScale={4}
						{memberships}
						{isDraggable}
						{isEditable}
						{showNames}
						hideTitle={false}
						on:drop-member={handleMemberDrop}
						on:selected-member={(e) => console.log('Member selected:', e.detail)}
						on:open-membership-evaluation-dialog={(e) => console.log('Open evaluation:', e.detail)}
					/>
				</div>
			</div>
		</div>
	{:else}
		<!-- Traditional Grid View -->
		<div class="overflow-hidden rounded-lg bg-white shadow-md">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50">
						<tr>
							<th
								class="sticky left-0 z-10 bg-gray-50 px-4 py-3 text-left font-medium text-gray-900"
								>Employee</th
							>
							{#each criteria as criterion}
								<th class="min-w-32 px-4 py-3 text-center font-medium text-gray-900">
									<div>{criterion.name}</div>
									{#if showWeights}
										<div class="text-xs text-gray-500">({criterion.weight}%)</div>
									{/if}
								</th>
							{/each}
							<th class="px-4 py-3 text-center font-medium text-gray-900">Weighted Score</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each employees as employee}
							<tr class="hover:bg-gray-50">
								<td class="sticky left-0 z-10 border-r bg-white px-4 py-3">
									<div class="font-medium text-gray-900">{employee.name}</div>
									<div class="text-sm text-gray-500">{employee.role} • {employee.department}</div>
								</td>
								{#each criteria as criterion}
									{@const evaluation = evaluationGrid[employee.id]?.[criterion.id]}
									<td class="px-4 py-3 text-center">
										{#if viewMode === 'scores'}
											<input
												type="number"
												min="1"
												max="5"
												value={evaluation?.score || 0}
												on:change={(e) => {
													const target = /** @type {HTMLInputElement} */ (e.target);
													updateScore(employee.id, criterion.id, parseInt(target.value));
												}}
												class="w-16 rounded border px-2 py-1 text-center"
											/>
										{:else if viewMode === 'heatmap'}
											<div class="flex flex-col items-center">
												<div
													class="h-8 w-8 rounded {getScoreColor(
														evaluation?.score || 0
													)} flex items-center justify-center text-sm font-bold text-white"
												>
													{evaluation?.score || 0}
												</div>
												<div class="mt-1 text-xs">{getScoreLabel(evaluation?.score || 0)}</div>
											</div>
										{:else if viewMode === 'detailed'}
											<div class="text-center">
												<div class="text-lg font-bold">{evaluation?.score || 0}</div>
												<input
													type="text"
													placeholder="Notes..."
													value={evaluation?.notes || ''}
													on:change={(e) => {
														const target = /** @type {HTMLInputElement} */ (e.target);
														updateNotes(employee.id, criterion.id, target.value);
													}}
													class="mt-1 w-24 rounded border px-1 py-1 text-xs"
												/>
											</div>
										{/if}
									</td>
								{/each}
								<td class="px-4 py-3 text-center">
									<div class="text-lg font-bold text-blue-600">
										{calculateWeightedScore(Number(employee.id))}
									</div>
									<div class="text-xs text-gray-500">
										{getScoreLabel(calculateWeightedScore(Number(employee.id)))}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}

	<!-- Grid Legend -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h3 class="mb-4 text-lg font-semibold">Scoring Legend</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-5">
			<div class="flex items-center">
				<div class="mr-2 h-4 w-4 rounded bg-green-500"></div>
				<span class="text-sm">5 - Excellent</span>
			</div>
			<div class="flex items-center">
				<div class="mr-2 h-4 w-4 rounded bg-blue-500"></div>
				<span class="text-sm">4 - Good</span>
			</div>
			<div class="flex items-center">
				<div class="mr-2 h-4 w-4 rounded bg-yellow-500"></div>
				<span class="text-sm">3 - Average</span>
			</div>
			<div class="flex items-center">
				<div class="mr-2 h-4 w-4 rounded bg-orange-500"></div>
				<span class="text-sm">2 - Below Average</span>
			</div>
			<div class="flex items-center">
				<div class="mr-2 h-4 w-4 rounded bg-red-500"></div>
				<span class="text-sm">1 - Poor</span>
			</div>
		</div>
	</div>
</div>
