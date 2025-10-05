<script lang="ts">
	import ProtectedRoute from '$lib/components/ProtectedRoute.svelte';
	
	let { children } = $props();
</script>

<ProtectedRoute>
	{@render children?.()}
</ProtectedRoute>
