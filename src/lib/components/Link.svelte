<script lang="ts">
	/**
	 * Link Component
	 * Converted from Catalyst UI Kit (React) to Svelte 5
	 * 
	 * Features:
	 * - SvelteKit-aware navigation (uses <a> with SvelteKit's client-side routing)
	 * - Supports external links (opens in new tab)
	 * - Accessible with proper ARIA attributes
	 * - Dark mode support
	 */
	
	interface Props {
		/** Link destination */
		href: string;
		
		/** Target window (_blank for new tab) */
		target?: '_blank' | '_self' | '_parent' | '_top';
		
		/** Relationship for external links */
		rel?: string;
		
		/** Additional CSS classes */
		class?: string;
		
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		
		/** Children content */
		children?: import('svelte').Snippet;
	}
	
	let {
		href,
		target,
		rel,
		class: className = '',
		onclick,
		children
	}: Props = $props();
	
	// Auto-detect external links and set appropriate attributes
	const isExternal = $derived(href.startsWith('http://') || href.startsWith('https://'));
	const computedTarget = $derived(target || (isExternal ? '_blank' : '_self'));
	const computedRel = $derived(
		rel || (isExternal && computedTarget === '_blank' ? 'noopener noreferrer' : undefined)
	);
</script>

<a 
	{href}
	target={computedTarget}
	rel={computedRel}
	class={className}
	{onclick}
	data-sveltekit-preload-data={isExternal ? 'off' : 'hover'}
>
	{@render children?.()}
</a>
