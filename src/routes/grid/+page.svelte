<script>
	import { onMount } from 'svelte';
	import { peopleStore, criteriaStore, performanceGridStore } from '../../stores/dataStore.js';

	// Grid component - The main star of the HR application
	$: employees = $peopleStore;
	$: criteria = $criteriaStore;
	$: evaluationGrid = $performanceGridStore;

	// Current view mode
	let viewMode = 'scores'; // 'scores', 'heatmap', 'detailed'
	let selectedPeriod = '2024 Q1';
	let showWeights = true;

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
	 * @param {number} employeeId
	 */
	function calculateWeightedScore(employeeId) {
		let totalScore = 0;
		let totalWeight = 0;
		
		criteria.forEach(crit => {
			const evaluation = evaluationGrid[employeeId]?.[crit.id];
			if (evaluation?.score) {
				totalScore += evaluation.score * (crit.weight / 100);
				totalWeight += crit.weight / 100;
			}
		});
		
		return totalWeight > 0 ? (totalScore / totalWeight).toFixed(1) : 0;
	}

	/**
	 * @param {number} score
	 */
	function getScoreColor(score) {
		if (score >= 4.5) return 'bg-green-500';
		if (score >= 3.5) return 'bg-blue-500';
		if (score >= 2.5) return 'bg-yellow-500';
		if (score >= 1.5) return 'bg-orange-500';
		return 'bg-red-500';
	}

	/**
	 * @param {number} score
	 */
	function getScoreLabel(score) {
		if (score >= 4.5) return 'Excellent';
		if (score >= 3.5) return 'Good';
		if (score >= 2.5) return 'Average';
		if (score >= 1.5) return 'Below Average';
		return 'Poor';
	}

	// Export functionality
	function exportGrid() {
		const data = employees.map(emp => {
			/** @type {Record<string, any>} */
			const row = {
				Employee: emp.name,
				Role: emp.role,
				Department: emp.department,
				'Weighted Score': calculateWeightedScore(emp.id)
			};
			
			criteria.forEach(crit => {
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
	<div class="bg-white p-6 rounded-lg shadow-md">
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
			<div>
				<h1 class="text-2xl font-bold text-gray-800">Performance Evaluation Grid</h1>
				<p class="text-gray-600">Comprehensive performance matrix for {selectedPeriod}</p>
			</div>
			
			<div class="flex flex-wrap gap-2">
				<!-- View Mode Selector -->
				<select bind:value={viewMode} class="px-3 py-2 border rounded-md">
					<option value="scores">Score View</option>
					<option value="heatmap">Heatmap View</option>
					<option value="detailed">Detailed View</option>
				</select>
				
				<!-- Period Selector -->
				<select bind:value={selectedPeriod} class="px-3 py-2 border rounded-md">
					<option value="2024 Q1">2024 Q1</option>
					<option value="2023 Q4">2023 Q4</option>
					<option value="2023 Q3">2023 Q3</option>
				</select>
				
				<!-- Export/Import -->
				<button on:click={exportGrid} class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
					Export
				</button>
				<label class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
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
		</div>
	</div>

	<!-- Grid Statistics -->
	<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
		<div class="bg-blue-50 p-4 rounded-lg">
			<h3 class="text-lg font-medium text-blue-800">Total Employees</h3>
			<p class="text-2xl font-bold text-blue-600">{employees.length}</p>
		</div>
		<div class="bg-green-50 p-4 rounded-lg">
			<h3 class="text-lg font-medium text-green-800">Evaluation Criteria</h3>
			<p class="text-2xl font-bold text-green-600">{criteria.length}</p>
		</div>
		<div class="bg-purple-50 p-4 rounded-lg">
			<h3 class="text-lg font-medium text-purple-800">Evaluations</h3>
			<p class="text-2xl font-bold text-purple-600">{employees.length * criteria.length}</p>
		</div>
		<div class="bg-orange-50 p-4 rounded-lg">
			<h3 class="text-lg font-medium text-orange-800">Completion Rate</h3>
			<p class="text-2xl font-bold text-orange-600">100%</p>
		</div>
	</div>

	<!-- Main Evaluation Grid -->
	<div class="bg-white rounded-lg shadow-md overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-4 py-3 text-left font-medium text-gray-900 sticky left-0 bg-gray-50 z-10">Employee</th>
						{#each criteria as criterion}
							<th class="px-4 py-3 text-center font-medium text-gray-900 min-w-32">
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
							<td class="px-4 py-3 sticky left-0 bg-white z-10 border-r">
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
											class="w-16 text-center border rounded px-2 py-1"
										/>
									{:else if viewMode === 'heatmap'}
										<div class="flex flex-col items-center">
											<div class="w-8 h-8 rounded {getScoreColor(evaluation?.score || 0)} flex items-center justify-center text-white text-sm font-bold">
												{evaluation?.score || 0}
											</div>
											<div class="text-xs mt-1">{getScoreLabel(evaluation?.score || 0)}</div>
										</div>
									{:else if viewMode === 'detailed'}
										<div class="text-center">
											<div class="font-bold text-lg">{evaluation?.score || 0}</div>
											<input 
												type="text" 
												placeholder="Notes..."
												value={evaluation?.notes || ''}
												on:change={(e) => {
													const target = /** @type {HTMLInputElement} */ (e.target);
													updateNotes(employee.id, criterion.id, target.value);
												}}
												class="w-24 text-xs border rounded px-1 py-1 mt-1"
											/>
										</div>
									{/if}
								</td>
							{/each}
							<td class="px-4 py-3 text-center">
								<div class="font-bold text-lg text-blue-600">{calculateWeightedScore(employee.id)}</div>
								<div class="text-xs text-gray-500">{getScoreLabel(calculateWeightedScore(employee.id))}</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Grid Legend -->
	<div class="bg-white p-6 rounded-lg shadow-md">
		<h3 class="text-lg font-semibold mb-4">Scoring Legend</h3>
		<div class="grid grid-cols-1 md:grid-cols-5 gap-4">
			<div class="flex items-center">
				<div class="w-4 h-4 bg-green-500 rounded mr-2"></div>
				<span class="text-sm">5 - Excellent</span>
			</div>
			<div class="flex items-center">
				<div class="w-4 h-4 bg-blue-500 rounded mr-2"></div>
				<span class="text-sm">4 - Good</span>
			</div>
			<div class="flex items-center">
				<div class="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
				<span class="text-sm">3 - Average</span>
			</div>
			<div class="flex items-center">
				<div class="w-4 h-4 bg-orange-500 rounded mr-2"></div>
				<span class="text-sm">2 - Below Average</span>
			</div>
			<div class="flex items-center">
				<div class="w-4 h-4 bg-red-500 rounded mr-2"></div>
				<span class="text-sm">1 - Poor</span>
			</div>
		</div>
	</div>
</div>
