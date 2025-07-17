<script lang="ts">
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
	export let items: any[] = [];
	/**
	 * @type {any[]}
	 */
	export let columns: any[] = [];
	export let onCreate = (item: any) => {};
	export let onUpdate = (item: any) => {};
	export let onDelete = (id: any) => {};

	/**
	 * @type {{ [key: string]: any }}
	 */
	let newItem: { [key: string]: any } = {};
	/**
	 * @type {null}
	 */
	let editingId: any = null;
	/**
	 * @type {{ [key: string]: any }}
	 */
	let editItem: { [key: string]: any } = {};

	/**
	 * @type {string}
	 */
	export let title: string = '';
	/**
	 * @type {string}
	 */
	export let addButtonText: string = 'Add New Item';
	/**
	 * @type {boolean}
	 */
	export let showAddButton: boolean = true;
	/**
	 * @type {boolean}
	 */
	export let showAddRow: boolean = false;

	/**
	 * @type {string}
	 */
	let searchTerm: string = '';

	/**
	 * @type {Set<any>}
	 */
	let expandedRows: Set<any> = new Set();

	/**
	 * @type {string[]}
	 */
	export let expandableColumns: string[] = ['goals', 'feedback', 'message'];

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

	function startEdit(item: any) {
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

	function remove(id: any) {
		onDelete(id);
	}

	function toggleAddRow() {
		showAddRow = !showAddRow;
		if (!showAddRow) {
			newItem = {};
		}
	}

	function toggleRowExpansion(id: any) {
		const newExpandedRows = new Set(expandedRows);
		if (newExpandedRows.has(id)) {
			newExpandedRows.delete(id);
		} else {
			newExpandedRows.add(id);
		}
		expandedRows = newExpandedRows;
	}

	function isExpandableColumn(columnKey: string): boolean {
		return expandableColumns.includes(columnKey.toLowerCase());
	}

	function hasExpandableContent(item: any): boolean {
		return expandableColumns.some((col) => {
			const column = columns.find((c) => c.key.toLowerCase() === col);
			return column && item[column.key] && item[column.key].toString().trim().length > 0;
		});
	}
</script>

<div class="space-y-4">
	{#if title}
		<div class="flex items-center justify-between">
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
	<div class="flex items-center justify-between">
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

	<div class="overflow-hidden rounded-lg border">
		<div class="overflow-x-auto">
			<Table class="w-full table-fixed">
				<TableHeader>
					<TableRow>
						<TableHead class="w-8"></TableHead>
						{#each columns as col}
							<TableHead>{col.label}</TableHead>
						{/each}
						<TableHead class="w-32">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#if showAddRow}
						<TableRow>
							<TableCell class="w-8"></TableCell>
							{#each columns as col}
								<TableCell class="max-w-0">
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
							<TableCell class="w-32">
								<div class="flex space-x-2 whitespace-nowrap">
									<button class="text-green-500 hover:text-green-700" on:click={create}>
										Save
									</button>
									<button class="text-gray-500 hover:text-gray-700" on:click={toggleAddRow}>
										Cancel
									</button>
								</div>
							</TableCell>
						</TableRow>
					{/if}
					{#each filteredItems as item}
						<TableRow>
							{#if editingId === item.id}
								<TableCell class="w-8"></TableCell>
								{#each columns as col}
									<TableCell class="max-w-0">
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
								<TableCell class="w-32">
									<div class="flex space-x-2 whitespace-nowrap">
										<button class="text-green-500 hover:text-green-700" on:click={saveEdit}>
											Save
										</button>
										<button class="text-gray-500 hover:text-gray-700" on:click={cancelEdit}>
											Cancel
										</button>
									</div>
								</TableCell>
							{:else}
								<TableCell class="w-8">
									{#if hasExpandableContent(item)}
										<button
											class="text-gray-500 hover:text-gray-700"
											on:click={() => toggleRowExpansion(item.id)}
										>
											{#if expandedRows.has(item.id)}
												▼
											{:else}
												▶
											{/if}
										</button>
									{/if}
								</TableCell>
								{#each columns as col}
									<TableCell>
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
													(opt: any) => opt.value === item[col.key]
												)}
												<span
													class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
												>
													{option ? option.label : item[col.key]}
												</span>
											{:else}
												<span class="text-gray-400">-</span>
											{/if}
										{:else if col.type === 'textarea' || isExpandableColumn(col.key)}
											{#if item[col.key]}
												<div class="max-w-xs overflow-hidden">
													<span
														class="block truncate text-sm text-gray-900"
														title="Click expand to see full content"
													>
														{item[col.key].length > 50
															? item[col.key].slice(0, 50) + '...'
															: item[col.key]}
													</span>
												</div>
											{:else}
												<span class="text-gray-400">-</span>
											{/if}
										{:else}
											<div class="max-w-xs overflow-hidden">
												<span class="block truncate" title={item[col.key]}>
													{item[col.key] || '-'}
												</span>
											</div>
										{/if}
									</TableCell>
								{/each}
								<TableCell class="w-32">
									<div class="flex space-x-2 whitespace-nowrap">
										<button
											class="text-blue-500 hover:text-blue-700"
											on:click={() => startEdit(item)}
										>
											Edit
										</button>
										<button
											class="text-red-500 hover:text-red-700"
											on:click={() => remove(item.id)}
										>
											Delete
										</button>
									</div>
								</TableCell>
							{/if}
						</TableRow>

						<!-- Expanded row for detailed content -->
						{#if expandedRows.has(item.id) && hasExpandableContent(item)}
							<TableRow class="bg-gray-50">
								<TableCell class="w-8"></TableCell>
								<TableCell colspan={columns.length + 1} class="p-4">
									<div class="space-y-4">
										{#each columns as col}
											{#if isExpandableColumn(col.key) && item[col.key]}
												<div>
													<h4 class="mb-2 text-sm font-semibold text-gray-700">{col.label}:</h4>
													<div
														class="rounded border bg-white p-3 text-sm whitespace-pre-wrap text-gray-900"
													>
														{item[col.key]}
													</div>
												</div>
											{/if}
										{/each}
									</div>
								</TableCell>
							</TableRow>
						{/if}
					{:else}
						<TableRow>
							<TableCell colspan={columns.length + 2} class="text-center text-muted-foreground">
								No items found
							</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	</div>
</div>
