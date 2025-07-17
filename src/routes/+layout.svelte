<script lang="ts">
	import Header from '$components/Header/Header.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';

	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	const { children } = $props();
</script>

<ParaglideJS {i18n}>
	<header class="w-full bg-white shadow dark:bg-gray-700">
		<Header />
	</header>

	<div class="flex flex-grow overflow-hidden">
		<div class="overflow-y-auto bg-gray-100 dark:bg-gray-700">
			<Sidebar />
		</div>

		<main class="flex-1 overflow-y-auto p-4">
			{@render children()}
		</main>
	</div>
</ParaglideJS>
