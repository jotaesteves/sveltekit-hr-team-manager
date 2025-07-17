<script>
	/**
	 * @type {any[]}
	 */
	export let items = [];
	/**
	 * @type {any[]}
	 */
	export let columns = [];
	export let onCreate = (/** @type {{}} */ item) => {};
	export let onUpdate = (/** @type {{}} */ item) => {};
	export let onDelete = (/** @type {any} */ id) => {};

	/**
	 * @type {{ [key: string]: any }}
	 */
	let newItem = {};
	/**
	 * @type {null}
	 */
	let editingId = null;
	/**
	 * @type {{ [key: string]: any }}
	 */
	let editItem = {};

	/**
	 * @type {string}
	 */
	export let title = '';
	/**
	 * @type {string}
	 */
	export let addButtonText = 'Add New Item';
	/**
	 * @type {boolean}
	 */
	export let showAddButton = true;
	/**
	 * @type {boolean}
	 */
	export let showAddRow = false;

	/**
	 * @param {{ id?: any; }} item
	 */
	function startEdit(item) {
		editingId = item.id;
		editItem = { ...item };
	}

	function cancelEdit() {
		editingId = null;
		editItem = {};
	}

	function saveEdit() {
		onUpdate(editItem);
		cancelEdit();
	}

	function create() {
		onCreate(newItem);
		newItem = {};
	}

	/**
	 * @param {any} id
	 */
	function remove(id) {
		onDelete(id);
	}

	function toggleAddRow() {
		showAddRow = !showAddRow;
		if (!showAddRow) {
			newItem = {};
		}
	}
</script>

{#if title}
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-800">{title}</h1>
		{#if showAddButton}
			<button
				class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				on:click={toggleAddRow}
			>
				{addButtonText}
			</button>
		{/if}
	</div>
{/if}

<div class="overflow-x-auto rounded-lg bg-white shadow-md">
	<table class="min-w-full">
		<thead class="bg-gray-100">
			<tr>
				{#each columns as col}
					<th class="px-4 py-3 text-left font-medium text-gray-600">{col.label}</th>
				{/each}
				<th class="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200">
			{#if showAddRow}
				<tr class="bg-blue-50">
					{#each columns as col}
						<td class="px-4 py-3">
							<input
								type={col.type || 'text'}
								placeholder={col.placeholder || col.label}
								bind:value={newItem[col.key]}
								required={col.required || false}
								class="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							/>
						</td>
					{/each}
					<td class="px-4 py-3">
						<div class="flex space-x-2">
							<button class="text-green-500 hover:text-green-700" on:click={create}> Save </button>
							<button class="text-gray-500 hover:text-gray-700" on:click={toggleAddRow}>
								Cancel
							</button>
						</div>
					</td>
				</tr>
			{/if}
			{#each items as item}
				<tr class="hover:bg-gray-50">
					{#if editingId === item.id}
						{#each columns as col}
							<td class="px-4 py-3">
								<input
									type={col.type || 'text'}
									bind:value={editItem[col.key]}
									required={col.required || false}
									class="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								/>
							</td>
						{/each}
						<td class="px-4 py-3">
							<div class="flex space-x-2">
								<button class="text-green-500 hover:text-green-700" on:click={saveEdit}>
									Save
								</button>
								<button class="text-gray-500 hover:text-gray-700" on:click={cancelEdit}>
									Cancel
								</button>
							</div>
						</td>
					{:else}
						{#each columns as col}
							<td class="px-4 py-3">{item[col.key]}</td>
						{/each}
						<td class="px-4 py-3">
							<div class="flex space-x-2">
								<button class="text-blue-500 hover:text-blue-700" on:click={() => startEdit(item)}>
									Edit
								</button>
								<button class="text-red-500 hover:text-red-700" on:click={() => remove(item.id)}>
									Delete
								</button>
							</div>
						</td>
					{/if}
				</tr>
			{:else}
				<tr>
					<td colspan={columns.length + 1} class="py-4 px-4 text-center text-gray-500">
						No items found
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	/* Remove old styles as we're using Tailwind classes */
</style>
