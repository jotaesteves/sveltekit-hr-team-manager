<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import GridCell from './GridCell.svelte';

	const dispatch = createEventDispatcher();

	// Define types for better type safety
	interface ReviewSettings {
		scales?: Record<number, Record<number, Record<number, { name: string }>>>;
		dimensions?: Record<number, { name: string }>;
		roles?: Record<number, { name: string }>;
	}

	interface Review {
		createdAt?: string | Date;
		reviewerName?: string;
		name?: string;
		reviewName?: string;
		type?: string;
	}

	interface Membership {
		id: number | string;
		[key: string]: any;
	}

	export let reviewSettings: ReviewSettings = {};
	export let review: Review = {};
	export let reviewScale: number = 4;
	export let memberships: Membership[] = [];
	export let isDraggable: boolean = false;
	export let isEditable: boolean = false;
	export let equalMembership: string = '';
	export let showNames: boolean = true;
	export let hideTitle: boolean = false;
	// Remove unused exports
	// export let scale: Record<string, any> = {};
	// export let scaleColors: Record<string, any> = {};

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
	function startDrag(event: DragEvent, member: Membership) {
		if (!event.dataTransfer) return;

		event.dataTransfer.dropEffect = 'move';
		event.dataTransfer.effectAllowed = 'move';

		// Store both the full member object and just the ID as backup
		event.dataTransfer.setData('membership', JSON.stringify(member));
		event.dataTransfer.setData('membershipId', String(member.membershipId || member.id));

		console.log('Starting drag for member:', member.firstName || member.name);
	}

	function onDrop(event: DragEvent, d1: number, d2: number) {
		event.preventDefault();
		try {
			if (!event.dataTransfer) return;

			const membershipData = event.dataTransfer.getData('membership');
			const membershipId = event.dataTransfer.getData('membershipId');

			if (!membershipData && !membershipId) {
				console.error('No membership data found in drag event');
				return;
			}

			let membership;
			if (membershipData) {
				membership = JSON.parse(membershipData);
			} else {
				// Fallback: find membership by ID
				membership = memberships.find(
					(m) => m.id.toString() === membershipId || m.membershipId.toString() === membershipId
				);
			}

			if (!membership) {
				console.error('Could not find membership for ID:', membershipId);
				return;
			}

			dispatch('drop-member', { membership, d1, d2 });
		} catch (e) {
			console.error('Error parsing dropped data:', e);
		}
	}

	function evaluateCriteriaScores() {
		// This function is meant to be overridden by parent components
		dispatch('open-membership-evaluation-dialog');
	}

	function selectMembership(event: Event | null, membership: string | number) {
		dispatch('selectMembership', { event, membership });
	}

	function deselectMembership() {
		dispatch('deselectMembership');
	}

	function dateTime(date: string | Date | null | undefined): string {
		if (!date) return '';
		const d = new Date(date);
		return d.toLocaleString();
	}

	function handleDragEnter(event: CustomEvent) {
		event.detail?.preventDefault?.();
	}

	function handleDragOver(event: CustomEvent) {
		event.detail?.preventDefault?.();
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
						{reviewSettingsScalePotential[parseInt(potential)]?.name || `Level ${potential}`}
					</span>
				</th>
				{#each Object.keys(reviewSettingsScale) as performance, performanceindex}
					<GridCell
						potentialIndex={parseInt(potential)}
						performanceIndex={parseInt(performance)}
						{showNames}
						{isDraggable}
						{isEditable}
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
					{reviewSettingsScalePerfomance[parseInt(performance)]?.name || `Level ${performance}`}
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
