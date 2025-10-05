<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated, isLoading } from '$lib/stores/auth';
	
	interface Props {
		children?: any;
		redirectTo?: string;
	}
	
	let { children, redirectTo = '/auth/signin' }: Props = $props();
	
	let showContent = $state(false);
	
	onMount(() => {
		// Wait for auth to initialize
		const unsubscribe = isLoading.subscribe(loading => {
			if (!loading) {
				const authenticated = $isAuthenticated;
				if (!authenticated) {
					goto(redirectTo);
				} else {
					showContent = true;
				}
			}
		});
		
		return unsubscribe;
	});
</script>

{#if $isLoading}
	<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
		<div class="text-center">
			<div class="text-6xl mb-4 animate-bounce">🔐</div>
			<p class="text-gray-600">Checking authentication...</p>
		</div>
	</div>
{:else if showContent}
	{@render children?.()}
{/if}
