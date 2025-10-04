<script lang="ts">
	/**
	 * Card Component
	 * Custom component for Feast Planner (Catalyst-inspired design)
	 * 
	 * Features:
	 * - Clean container for content
	 * - Optional header and footer sections
	 * - Hover effects
	 * - Dark mode support
	 * - Clickable variant (for links)
	 * - Shadow and border styling
	 * 
	 * Usage:
	 * <Card>
	 *   <h3>Title</h3>
	 *   <p>Content</p>
	 * </Card>
	 * 
	 * With slots:
	 * <Card>
	 *   {#snippet header()}
	 *     <h3>Header</h3>
	 *   {/snippet}
	 *   <p>Main content</p>
	 *   {#snippet footer()}
	 *     <Button>Action</Button>
	 *   {/snippet}
	 * </Card>
	 */
	
	import type { Snippet } from 'svelte';
	
	interface Props {
		/** Card header content */
		header?: Snippet;
		
		/** Card footer content */
		footer?: Snippet;
		
		/** Main content */
		children?: Snippet;
		
		/** If provided, makes card clickable and links to this URL */
		href?: string;
		
		/** Adds hover effect (automatically enabled for links) */
		hoverable?: boolean;
		
		/** Removes padding (useful for custom layouts) */
		noPadding?: boolean;
		
		/** Additional CSS classes */
		class?: string;
		
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
	}
	
	let {
		header,
		footer,
		children,
		href,
		hoverable = false,
		noPadding = false,
		class: className = '',
		onclick
	}: Props = $props();
	
	// Auto-enable hover effect for links
	const shouldHover = $derived(href || hoverable);
	
	// Base card styles
	const baseClasses = `
		bg-white
		border border-zinc-200
		rounded-xl shadow-sm
		transition-all duration-150
	`;
	
	// Hover styles
	const hoverClasses = shouldHover ? `
		hover:shadow-md hover:border-zinc-300
		cursor-pointer
	` : '';
	
	// Padding
	const paddingClasses = noPadding ? '' : 'p-6';
	
	// Combine all classes
	const cardClasses = $derived(
		[baseClasses, hoverClasses, paddingClasses, className]
			.join(' ')
			.replace(/\s+/g, ' ')
			.trim()
	);
	
	// Header styles
	const headerClasses = `
		border-b border-zinc-200
		${noPadding ? 'p-6 pb-4' : '-mt-6 -mx-6 px-6 pt-6 pb-4 mb-6'}
	`;
	
	// Footer styles
	const footerClasses = `
		border-t border-zinc-200
		${noPadding ? 'p-6 pt-4' : '-mb-6 -mx-6 px-6 pb-6 pt-4 mt-6'}
	`;
</script>

{#if href}
	<!-- Clickable card (link) -->
	<a {href} class={cardClasses} {onclick}>
		{#if header}
			<div class={headerClasses}>
				{@render header()}
			</div>
		{/if}
		
		{#if children}
			{@render children()}
		{/if}
		
		{#if footer}
			<div class={footerClasses}>
				{@render footer()}
			</div>
		{/if}
	</a>
{:else}
	<!-- Regular card -->
	<div class={cardClasses} {onclick} role={onclick ? 'button' : undefined} tabindex={onclick ? 0 : undefined}>
		{#if header}
			<div class={headerClasses}>
				{@render header()}
			</div>
		{/if}
		
		{#if children}
			{@render children()}
		{/if}
		
		{#if footer}
			<div class={footerClasses}>
				{@render footer()}
			</div>
		{/if}
	</div>
{/if}
