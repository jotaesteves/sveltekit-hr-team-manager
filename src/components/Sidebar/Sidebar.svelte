<script>
	export let core = [
		{ name: 'People', route: '/people' },
		{ name: 'Evaluation Criterias', route: '/evaluation-criterias' },
		{ name: 'Reviews', route: '/reviews' }
	];
	export let management = [
		{ name: 'Flows of Management', route: '/flows-management' },
		{ name: 'Company management', route: '/company-management' },
		{ name: 'Settings', route: '/settings' }
	];
	export let feedback = [
		{ name: 'Dialogs', route: '/dialogs' },
		{ name: 'Feedback', route: '/feedback' },
		{ name: '1on1', route: '/one-on-one' },
		{ name: 'Performance Reviews', route: '/performance-reviews' }
	];
	export const settings = [
		{ name: 'Settings / Configurations', route: '/settings/configurations' },
		{ name: 'Import / Export data tables (CSV, Excel)', route: '/settings/import-export' },
		{ name: 'Modules', route: '/settings/modules' },
		{ name: 'Roles', route: '/settings/roles' },
		{ name: 'Permissions', route: '/settings/permissions' }
	];
	export const tutorial = [
		{ name: 'Tutorial', route: '/tutorial' },
		{ name: 'FAQ', route: '/faq' },
		{ name: 'Support', route: '/support' },
		{ name: 'Contact', route: '/contact' }
	];
	export const mainFeatures = [{ name: 'Grid', route: '/grid' }];
	// export const navigationList = [...coreItems, ...managementItems];
</script>

<aside>
	<ul>
		{#each core as item}
			<li><a href={item.route}>{item.name}</a></li>
		{/each}
	</ul>

	<ul>
		{#each management as item}
			<li><a href={item.route}>{item.name}</a></li>
		{/each}
	</ul>

	<ul>
		{#each feedback as item}
			<li><a href={item.route}>{item.name}</a></li>
		{/each}
	</ul>

	<ul>
		{#each settings as item}
			<li><a href={item.route}>{item.name}</a></li>
		{/each}
	</ul>

	<ul>
		{#each tutorial as item}
			<li><a href={item.route}>{item.name}</a></li>
		{/each}
	</ul>

	<ul>
		{#each mainFeatures as item}
			<li><a href={item.route}>{item.name}</a></li>
		{/each}
	</ul>
</aside>

<style>
	aside {
		background-color: #f4f4f4;
		width: 200px;
		padding: 1rem;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		padding: 0.5rem 0;
		cursor: pointer;
		&:hover {
			background-color: #e4e4e4;
		}
		&:last-child {
			border-bottom-width: 2px;
		}
	}
	a {
		text-decoration: none;
		color: inherit;
		display: block;
	}
</style>
