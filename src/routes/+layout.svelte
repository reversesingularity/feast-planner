<script lang="ts">
import { onMount } from 'svelte';
import { authStore } from '$lib/stores/auth';
import '../app.css';
import favicon from '$lib/assets/favicon.svg';

let { children } = $props();

// Initialize auth on app load
onMount(() => {
authStore.initialize();
});
</script>

<svelte:head>
<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
