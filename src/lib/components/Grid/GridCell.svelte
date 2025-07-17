<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let potentialIndex = 0;
	export let performanceIndex = 0;
	export let reviewScale = 4;
	export let isDraggable = false;
	export let isEditable = false;
	export let equalMembership = '';
	export let showNames = true;
	export let memberships = [];
	export let reviewSettings = {};
	export let startDrag = () => {};
	export let selectMembership = () => {};
	export let deselectMembership = () => {};
	export let evaluateCriteriaScores = () => {};

	// Constants for roles
	const ROLES = {
		1: { id: 1, name: 'Low Performer', icon: '📉' },
		2: { id: 2, name: 'Core Performer', icon: '📊' },
		3: { id: 3, name: 'Solid Performer', icon: '📈' },
		4: { id: 4, name: 'High Performer', icon: '⭐' },
		5: { id: 5, name: 'Top Performer', icon: '🌟' }
	};

	// Computed grid role
	$: gridRole = (() => {
		const dimensions = [performanceIndex, potentialIndex].toString();
		const map = {
			3: [['1,1'], ['1,3'], ['3,1'], ['1,2', '2,3', '2,2', '3,2', '2,1'], ['3,3']],
			4: [
				['1,1', '2,1', '1,2'],
				['1,3', '1,4', '2,4'],
				['4,2', '3,1', '4,1'],
				['2,3', '3,3', '2,2', '3,2'],
				['3,4', '4,4', '4,3']
			],
			5: [
				['2,1', '1,1', '1,2', '1,3', '2,2'],
				['1,4', '1,5', '2,5', '3,5', '2,4'],
				['5,2', '5,1', '4,1', '3,1', '4,2'],
				['3,4', '2,3', '3,3', '4,3', '3,2'],
				['4,5', '5,5', '5,4', '5,3', '4,4']
			]
		};

		let roleIndex = 0;
		const scaleMap = map[reviewScale] || map[4];
		scaleMap.some((colormap, index) => {
			if (colormap.includes(dimensions)) {
				roleIndex = index;
				return true;
			}
		});

		const role = ROLES[roleIndex + 1] || ROLES[1];
		return {
			...role,
			name: reviewSettings.roles?.[roleIndex]?.name || role.name
		};
	})();

	// Filter memberships for this cell
	$: dropZoneTarget = memberships.filter(
		(member) =>
			member.score?.values?.[1] === performanceIndex && member.score?.values?.[2] === potentialIndex
	);

	function employabilityToolTip(d3) {
		if (d3 === 0) {
			return `${reviewSettings.dimensions?.[3]?.name || 'Dimension'} is not assessed`;
		} else {
			return `${reviewSettings.dimensions?.[3]?.name || 'Dimension'} is ${
				reviewSettings.scales?.[reviewScale]?.[3]?.[d3]?.name || 'unknown'
			}`;
		}
	}

	function handleDrop(event) {
		event.preventDefault();
		dispatch('drop', {
			event,
			d1: performanceIndex,
			d2: potentialIndex
		});
	}

	function handleDragEnter(event) {
		event.preventDefault();
		dispatch('dragenter', event);
	}

	function handleDragOver(event) {
		event.preventDefault();
		dispatch('dragover', event);
	}

	function handleMemberClick(member) {
		if (isEditable) {
			evaluateCriteriaScores(member);
		}
	}

	function handleMouseOver(member) {
		selectMembership(null, member.id);
	}

	function handleMouseLeave() {
		deselectMembership();
	}

	function handleKeyDown(event, member) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleMemberClick(member);
		}
	}

	function handleFocus(member) {
		selectMembership(null, member.id);
	}

	function handleBlur() {
		deselectMembership();
	}
</script>

<td
	class="grid-cell text-role-{gridRole.id}-light"
	class:donut-cell={!showNames && dropZoneTarget.length}
	on:drop={handleDrop}
	on:dragenter={handleDragEnter}
	on:dragover={handleDragOver}
	role="gridcell"
	tabindex="0"
>
	<span class="role-name text-role-{gridRole.id}-dark">
		<span class="text-white">{gridRole.name}</span>
		<span class="role-icon text-white">{gridRole.icon}</span>
	</span>

	{#if showNames}
		<div class="drop-zone-target">
			{#each dropZoneTarget as member (member.id)}
				<button
					class="rating-chip"
					class:draggable={isDraggable}
					class:focused={equalMembership === member.id}
					draggable={isDraggable}
					on:dragstart={(e) => startDrag(e, member)}
					on:click={() => handleMemberClick(member)}
					on:keydown={(e) => handleKeyDown(e, member)}
					on:mouseover={() => handleMouseOver(member)}
					on:mouseleave={handleMouseLeave}
					on:focus={() => handleFocus(member)}
					on:blur={handleBlur}
					title={employabilityToolTip(member.score?.values?.[3])}
				>
					<span class="chip-label"
						>{member.firstName || member.name?.split(' ')[0] || 'Unknown'}</span
					>
					<span class="chip-score">{member.score?.values?.[3] || 0}</span>
				</button>
			{/each}
		</div>
	{:else}
		<div class="donut-wrapper">
			{#if dropZoneTarget.length}
				<div class="donut-chart">
					<span class="member-count">{dropZoneTarget.length}</span>
				</div>
			{/if}
		</div>
	{/if}
</td>

<style>
	.grid-cell {
		background-color: currentColor;
		position: relative;
		min-height: 60px;
		min-width: 60px;
	}

	.grid-cell.donut-cell {
		background: radial-gradient(
			closest-side circle at 50%,
			transparent 75%,
			currentColor calc(75% + 1px)
		);
	}

	.grid-cell > div {
		color: var(--body-color, #000);
	}

	.role-name {
		position: absolute;
		right: 0;
		bottom: 0;
		display: none;
		background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.8));
		z-index: 1;
		padding: 0.125rem 0.5rem 0.125rem 2rem;
		align-items: center;
		gap: 0.25rem;
		white-space: nowrap;
		border-radius: 0.25rem;
	}

	.role-name .text-white {
		color: white;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
		font-weight: 600;
	}

	.role-icon {
		font-size: 1rem;
	}

	.drop-zone-target {
		aspect-ratio: 1 / 1;
		overflow: auto;
		padding: 0.25rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		align-content: flex-start;
	}

	.donut-wrapper {
		aspect-ratio: 1 / 1;
		position: relative;
		margin: 16.667%;
	}

	.donut-chart {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.7);
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	.member-count {
		font-weight: bold;
		color: white;
		font-size: 1.2rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
	}

	.rating-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.5rem;
		border-radius: 9999px;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		font-size: 0.75rem;
		white-space: nowrap;
		transition: all 0.2s;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.rating-chip.draggable {
		cursor: grab;
	}

	.rating-chip.draggable:active {
		cursor: grabbing;
	}

	.rating-chip.focused {
		box-shadow: 0 0 0 2px #3b82f6;
		background: rgba(0, 0, 0, 0.85);
	}

	.rating-chip:hover {
		background: rgba(0, 0, 0, 0.85);
		transform: scale(1.05);
		border-color: rgba(255, 255, 255, 0.5);
	}

	.chip-label {
		font-weight: 500;
		color: white;
	}

	.chip-score {
		background: rgba(255, 255, 255, 0.9);
		color: #1f2937;
		border-radius: 50%;
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.625rem;
		font-weight: bold;
	}

	/* Role color classes with better contrast */
	.text-role-1-light {
		background-color: #fca5a5; /* Red-300 for better visibility */
	}
	.text-role-2-light {
		background-color: #fbbf24; /* Amber-400 for better visibility */
	}
	.text-role-3-light {
		background-color: #60a5fa; /* Blue-400 for better visibility */
	}
	.text-role-4-light {
		background-color: #34d399; /* Emerald-400 for better visibility */
	}
	.text-role-5-light {
		background-color: #a78bfa; /* Violet-400 for better visibility */
	}

	.text-role-1-dark {
		color: #7f1d1d; /* Red-900 for better contrast */
	}
	.text-role-2-dark {
		color: #78350f; /* Amber-900 for better contrast */
	}
	.text-role-3-dark {
		color: #1e3a8a; /* Blue-900 for better contrast */
	}
	.text-role-4-dark {
		color: #064e3b; /* Emerald-900 for better contrast */
	}
	.text-role-5-dark {
		color: #4c1d95; /* Violet-900 for better contrast */
	}

	/* Show role names in specific positions */
	:global(tr:first-child td:first-of-type .role-name),
	:global(tr:first-child td:last-of-type .role-name),
	:global(tr:last-child td:first-of-type .role-name),
	:global(tr:last-child td:last-of-type .role-name) {
		display: inline-flex;
	}

	:global(tr:first-child td:first-of-type .role-name),
	:global(tr:last-child td:first-of-type .role-name) {
		left: 0;
		right: unset;
		background: linear-gradient(-90deg, transparent, rgba(0, 0, 0, 0.8));
		flex-direction: row-reverse;
		padding: 0.125rem 2rem 0.125rem 0.5rem;
	}

	@media (min-width: 640px) {
		.role-icon {
			font-size: 1.5rem;
		}
	}
</style>
