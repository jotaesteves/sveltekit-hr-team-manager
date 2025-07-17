<script>
	import { createEventDispatcher } from 'svelte';
	import GridCell from './GridCell.svelte';

	const dispatch = createEventDispatcher();

	export let reviewSettings = {};
	export let review = {};
	export let reviewScale = 4;
	export let memberships = [];
	export let isDraggable = false;
	export let isEditable = false;
	export let scale = {};
	export let scaleColors = {};
	export let equalMembership = '';
	export let showNames = true;
	export let hideTitle = false;
	export let reviewRoles = {};

	// Computed values with safe defaults
	$: reviewSettingsScale = reviewSettings?.scales?.[reviewScale]?.[1] || {
		1: { name: 'Level 1' },
		2: { name: 'Level 2' },
		3: { name: 'Level 3' },
		4: { name: 'Level 4' }
	};
	$: reviewSettingsScalePerfomance = reviewSettings?.scales?.[reviewScale]?.[1] || {
		1: { name: 'Level 1' },
		2: { name: 'Level 2' },
		3: { name: 'Level 3' },
		4: { name: 'Level 4' }
	};
	$: reviewSettingsScalePotential = reviewSettings?.scales?.[reviewScale]?.[2] || {
		1: { name: 'Level 1' },
		2: { name: 'Level 2' },
		3: { name: 'Level 3' },
		4: { name: 'Level 4' }
	};

	// Event handlers
	function startDrag(event, member) {
		event.dataTransfer.dropEffect = 'move';
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('membership', JSON.stringify(member));
		event.dataTransfer.setData('membershipId', member.membershipId);
	}

	function onDrop(event, d1, d2) {
		event.preventDefault();
		try {
			const membership = JSON.parse(event.dataTransfer.getData('membership'));
			dispatch('drop-member', { membership, d1, d2 });
		} catch (e) {
			console.error('Error parsing dropped data:', e);
		}
	}

	function evaluateCriteriaScores(member) {
		dispatch('open-membership-evaluation-dialog', member);
	}

	function selectMembership(event, membership) {
		dispatch('selected-member', membership);
	}

	function deselectMembership() {
		dispatch('selected-member', '');
	}

	function dateTime(date) {
		try {
			return new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch (e) {
			return 'Invalid Date';
		}
	}

	function handleDragEnter(event) {
		event.preventDefault();
	}

	function handleDragOver(event) {
		event.preventDefault();
	}
</script>

<table class="dimensions-table dimensions-table_scale{reviewScale}">
	<tbody>
		{#each Object.keys(reviewSettingsScalePotential).reverse() as potential, potentialindex}
			<tr>
				{#if potentialindex === 0}
					<th class="scalelabel" rowspan={Object.keys(reviewSettingsScalePotential).length}>
						<span class="rotate">
							{reviewSettings.dimensions?.[2]?.name || 'Potential'}
						</span>
					</th>
				{/if}
				<th class="scalelabel">
					<span class="rotate">
						{reviewSettingsScalePotential[potential]?.name || `Level ${potential}`}
					</span>
				</th>
				{#each Object.keys(reviewSettingsScale) as performance, performanceindex}
					<GridCell
						potentialIndex={parseInt(potential)}
						performanceIndex={parseInt(performance)}
						{showNames}
						{isDraggable}
						{isEditable}
						{scale}
						{scaleColors}
						{reviewScale}
						{evaluateCriteriaScores}
						{selectMembership}
						{deselectMembership}
						{memberships}
						{reviewSettings}
						{startDrag}
						{equalMembership}
						on:drop={(e) => onDrop(e.detail.event, e.detail.d1, e.detail.d2)}
						on:dragenter={handleDragEnter}
						on:dragover={handleDragOver}
					/>
				{/each}
			</tr>
		{/each}
	</tbody>
	{#if !hideTitle}
		<thead>
			<tr>
				<th class="scalelabel"></th>
				<th class="scalelabel"></th>
				<th colspan={Object.keys(reviewSettingsScale).length}>
					{dateTime(review.createdAt || new Date())} | {review.reviewerName || 'Unknown'} |
					{review.name || 'Review'} | {review.reviewName || 'Performance Review'}
					{review.type || ''}
				</th>
			</tr>
		</thead>
	{/if}
	<tfoot>
		<tr>
			<td colspan="2"></td>
			{#each Object.keys(reviewSettingsScalePerfomance) as performance}
				<th>
					{reviewSettingsScalePerfomance[performance]?.name || `Level ${performance}`}
				</th>
			{/each}
		</tr>
		<tr>
			<th colspan="2"></th>
			<th colspan={Object.keys(reviewSettingsScalePerfomance).length}>
				{reviewSettings.dimensions?.[1]?.name || 'Performance'}
			</th>
		</tr>
	</tfoot>
</table>

<style>
	.dimensions-table {
		width: calc(100% + 1rem);
		table-layout: fixed;
		border-spacing: 0.5rem;
		margin: -0.5rem;
	}

	.dimensions-table th,
	.dimensions-table td {
		padding: 0;
		position: relative;
		font-weight: normal;
	}

	.dimensions-table th {
		line-height: 0.625rem;
		font-size: 0.625rem;
	}

	.dimensions-table th[colspan],
	.dimensions-table th[rowspan] {
		font-weight: 500;
	}

	.dimensions-table tr:first-of-type td:first-of-type {
		border-top-left-radius: 22px;
	}

	.dimensions-table tr:first-of-type td:last-of-type {
		border-top-right-radius: 22px;
	}

	.dimensions-table tr:last-of-type td:first-of-type {
		border-bottom-left-radius: 22px;
	}

	.dimensions-table tr:last-of-type td:last-of-type {
		border-bottom-right-radius: 22px;
	}

	.scalelabel {
		width: 0.625rem;
		position: relative;
		font-weight: normal;
	}

	.rotate {
		transform: rotate(-90deg) translateX(-50%);
		transform-origin: 0 0;
		position: absolute;
		left: 0;
		top: 50%;
		white-space: nowrap;
	}

	@media (min-width: 640px) {
		.dimensions-table th {
			line-height: 1.3125rem;
			font-size: 1rem;
		}

		.scalelabel {
			width: 1.3125rem;
		}
	}
</style>
