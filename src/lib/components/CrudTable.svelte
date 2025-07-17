<script>
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';

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
	 * @type {string}
	 */
	let searchTerm = '';

	/**
	 * @type {any[]}
	 */
	$: filteredItems = searchTerm
		? items.filter((item) =>
				columns.some(
					(col) =>
						item[col.key] &&
						item[col.key].toString().toLowerCase().includes(searchTerm.toLowerCase())
				)
			)
		: items;

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
				class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				on:click={toggleAddRow}
			>
				{addButtonText}
			</button>
		{/if}
	</div>
{/if}

<!-- Search functionality -->
<div class="mb-4 flex items-center justify-between">
	<div class="max-w-md flex-1">
		<input
			type="text"
			placeholder="Search..."
			bind:value={searchTerm}
			class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
		/>
	</div>
	<div class="flex items-center space-x-4">
		<span class="text-sm text-gray-600">
			Showing {filteredItems.length} of {items.length} items
		</span>
		{#if searchTerm}
			<button
				on:click={() => (searchTerm = '')}
				class="rounded-md bg-gray-100 px-3 py-2 text-gray-600 hover:bg-gray-200"
			>
				Clear
			</button>
		{/if}
	</div>
</div>

<Table class="rounded-lg bg-white shadow-md">
	<TableHeader class="bg-gray-100">
		<TableRow>
			{#each columns as col}
				<TableHead class="px-4 py-3 text-left font-medium text-gray-600">{col.label}</TableHead>
			{/each}
			<TableHead class="px-4 py-3 text-left font-medium text-gray-600">Actions</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody class="divide-y divide-gray-200">
		{#if showAddRow}
			<TableRow class="bg-blue-50">
				{#each columns as col}
					<TableCell class="px-4 py-3">
						{#if col.type === 'checkbox'}
							<input
								type="checkbox"
								bind:checked={newItem[col.key]}
								class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							/>
						{:else if col.type === 'select'}
							<select
								bind:value={newItem[col.key]}
								required={col.required || false}
								class="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							>
								<option value="">Select {col.label}</option>
								{#if col.options}
									{#each col.options as option}
										<option value={option.value}>{option.label}</option>
									{/each}
								{/if}
							</select>
						{:else if col.type === 'textarea'}
							<textarea
								placeholder={col.placeholder || col.label}
								bind:value={newItem[col.key]}
								required={col.required || false}
								rows="2"
								class="block w-full resize-y rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							></textarea>
						{:else}
							<input
								type={col.type || 'text'}
								placeholder={col.placeholder || col.label}
								bind:value={newItem[col.key]}
								required={col.required || false}
								class="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							/>
						{/if}
					</TableCell>
				{/each}
				<TableCell class="px-4 py-3">
					<div class="flex space-x-2">
						<button class="text-green-500 hover:text-green-700" on:click={create}> Save </button>
						<button class="text-gray-500 hover:text-gray-700" on:click={toggleAddRow}>
							Cancel
						</button>
					</div>
				</TableCell>
			</TableRow>
		{/if}
		{#each filteredItems as item}
			<TableRow class="hover:bg-gray-50">
				{#if editingId === item.id}
					{#each columns as col}
						<TableCell class="px-4 py-3">
							{#if col.type === 'checkbox'}
								<input
									type="checkbox"
									bind:checked={editItem[col.key]}
									required={col.required || false}
									class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								/>
							{:else if col.type === 'select'}
								<select
									bind:value={editItem[col.key]}
									required={col.required || false}
									class="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								>
									<option value="">Select {col.label}</option>
									{#if col.options}
										{#each col.options as option}
											<option value={option.value}>{option.label}</option>
										{/each}
									{/if}
								</select>
							{:else if col.type === 'textarea'}
								<textarea
									bind:value={editItem[col.key]}
									required={col.required || false}
									rows="2"
									class="block w-full resize-y rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								></textarea>
							{:else}
								<input
									type={col.type || 'text'}
									bind:value={editItem[col.key]}
									required={col.required || false}
									class="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								/>
							{/if}
						</TableCell>
					{/each}
					<TableCell class="px-4 py-3">
						<div class="flex space-x-2">
							<button class="text-green-500 hover:text-green-700" on:click={saveEdit}>
								Save
							</button>
							<button class="text-gray-500 hover:text-gray-700" on:click={cancelEdit}>
								Cancel
							</button>
						</div>
					</TableCell>
				{:else}
					{#each columns as col}
						<TableCell class="px-4 py-3">
							{#if col.type === 'checkbox'}
								<span class="inline-flex items-center">
									{#if item[col.key]}
										<span class="text-green-600">✓ Yes</span>
									{:else}
										<span class="text-gray-400">✗ No</span>
									{/if}
								</span>
							{:else if col.type === 'select' && col.options}
								{#if item[col.key]}
									{@const option = col.options.find(
										/** @param {any} opt */ (opt) => opt.value === item[col.key]
									)}
									<span
										class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
									>
										{option ? option.label : item[col.key]}
									</span>
								{:else}
									<span class="text-gray-400">-</span>
								{/if}
							{:else if col.type === 'textarea'}
								{#if item[col.key]}
									<div class="max-w-xs">
										<span class="text-sm text-gray-900" title={item[col.key]}>
											{item[col.key].length > 100
												? item[col.key].slice(0, 100) + '...'
												: item[col.key]}
										</span>
									</div>
								{:else}
									<span class="text-gray-400">-</span>
								{/if}
							{:else}
								{item[col.key] || '-'}
							{/if}
						</TableCell>
					{/each}
					<TableCell class="px-4 py-3">
						<div class="flex space-x-2">
							<button class="text-blue-500 hover:text-blue-700" on:click={() => startEdit(item)}>
								Edit
							</button>
							<button class="text-red-500 hover:text-red-700" on:click={() => remove(item.id)}>
								Delete
							</button>
						</div>
					</TableCell>
				{/if}
			</TableRow>
		{:else}
			<TableRow>
				<TableCell colspan={columns.length + 1} class="py-4 px-4 text-center text-gray-500">
					No items found
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
