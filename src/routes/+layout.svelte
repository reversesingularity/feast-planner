<script lang="ts">
import { onMount } from 'svelte';
import { authStore } from '\/stores/auth';
import '../app.css';
import favicon from '\/assets/favicon.svg';

let { children } = \();

// Initialize auth on app load
onMount(() => {
authStore.initialize();
});
</script>

<svelte:head>
<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
