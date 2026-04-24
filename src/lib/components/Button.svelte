<script lang="ts">
	/**
	 * Button Component
	 * Converted from Catalyst UI Kit (React) to Svelte 5
	 * 
	 * Features:
	 * - Multiple color variants (dark/zinc, blue, green, red, etc.)
	 * - Three styles: solid (default), outline, plain
	 * - Touch-optimized with 44x44px minimum hit area
	 * - Dark mode support
	 * - Icon slot support
	 * - Link or button element rendering
	 */
	
	interface Props {
		/** Color variant - only applies to solid buttons */
		color?: 'dark/zinc' | 'light' | 'blue' | 'indigo' | 'green' | 'red' | 
		        'orange' | 'yellow' | 'purple' | 'pink' | 'cyan' | 'emerald';
		
		/** Outline style button */
		outline?: boolean;
		
		/** Plain style button (minimal) */
		plain?: boolean;
		
		/** If provided, renders as <a> link instead of button */
		href?: string;
		
		/** Button type (for form buttons) */
		type?: 'button' | 'submit' | 'reset';
		
		/** Disabled state */
		disabled?: boolean;
		
		/** Additional CSS classes */
		class?: string;
		
		/** Click handler */
		onclick?: (event: MouseEvent) => void;

		/** Slot content */
		children?: import('svelte').Snippet;
	}
	
	let {
		color = 'dark/zinc',
		outline = false,
		plain = false,
		href,
		type = 'button',
		disabled = false,
		class: className = '',
		onclick,
		children
	}: Props = $props();
	
	// Base styles - always applied
	const baseStyles = `
		relative isolate inline-flex items-baseline justify-center gap-x-2 
		rounded-lg border text-base/6 font-semibold
		px-[calc(theme(spacing.3.5)-1px)] py-[calc(theme(spacing.2.5)-1px)]
		sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing.1.5)-1px)] 
		sm:text-sm/6
		focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 
		focus-visible:outline-blue-500
		disabled:opacity-50 disabled:cursor-not-allowed
		transition-colors duration-150
	`;
	
	// Solid button styles (default)
	const solidStyles = `
		border-transparent shadow-sm
		before:absolute before:inset-0 before:-z-10 
		before:rounded-[calc(theme(borderRadius.lg)-1px)]
		hover:shadow-md active:shadow-sm
	`;
	
	// Outline button styles
	const outlineStyles = `
		border-gray-300 bg-transparent
		hover:bg-gray-50 active:bg-gray-100
		dark:border-white/15 dark:text-white 
		dark:hover:bg-white/5 dark:active:bg-white/10
	`;
	
	// Plain button styles
	const plainStyles = `
		border-transparent text-zinc-950 
		hover:bg-zinc-950/5 active:bg-zinc-950/10
		dark:text-white 
		dark:hover:bg-white/10 dark:active:bg-white/15
	`;
	
	// Color-specific styles for solid buttons
	const colorStyles: Record<string, string> = {
		'dark/zinc': `
			text-white bg-zinc-900 
			hover:bg-zinc-800 active:bg-zinc-950
			dark:bg-zinc-600 dark:hover:bg-zinc-700
		`,
		'light': `
			text-zinc-950 bg-white border-zinc-950/10
			hover:bg-zinc-50 active:bg-zinc-100
			dark:text-white dark:bg-zinc-800 dark:hover:bg-zinc-700
		`,
		'blue': `
			text-white bg-blue-600 
			hover:bg-blue-700 active:bg-blue-800
		`,
		'indigo': `
			text-white bg-indigo-500 
			hover:bg-indigo-600 active:bg-indigo-700
		`,
		'green': `
			text-white bg-green-600 
			hover:bg-green-700 active:bg-green-800
		`,
		'emerald': `
			text-white bg-emerald-600 
			hover:bg-emerald-700 active:bg-emerald-800
		`,
		'red': `
			text-white bg-red-600 
			hover:bg-red-700 active:bg-red-800
		`,
		'orange': `
			text-white bg-orange-500 
			hover:bg-orange-600 active:bg-orange-700
		`,
		'yellow': `
			text-yellow-950 bg-yellow-300 
			hover:bg-yellow-400 active:bg-yellow-500
		`,
		'purple': `
			text-white bg-purple-500 
			hover:bg-purple-600 active:bg-purple-700
		`,
		'pink': `
			text-white bg-pink-500 
			hover:bg-pink-600 active:bg-pink-700
		`,
		'cyan': `
			text-cyan-950 bg-cyan-300 
			hover:bg-cyan-400 active:bg-cyan-500
		`,
	};
	
	// Compute text color for outline/plain buttons (using inline styles for browser compatibility)
	const textColor = $derived(
		outline || plain ? '#111827' : undefined
	);

	// Compute final classes based on props
	const buttonClasses = $derived(
		[
			baseStyles,
			outline 
				? outlineStyles 
				: plain 
					? plainStyles 
					: `${solidStyles} ${colorStyles[color] || colorStyles['dark/zinc']}`,
			className
		]
		.join(' ')
		.replace(/\s+/g, ' ')
		.trim()
	);
</script>

{#if href}
	<a 
		{href}
		class={buttonClasses}
		style={textColor ? `color: ${textColor};` : undefined}
		role="button"
		tabindex={disabled ? -1 : 0}
		aria-disabled={disabled}
		{onclick}
	>
		<!-- Touch target for accessibility (44x44px minimum) -->
		<span 
			class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] 
			       -translate-x-1/2 -translate-y-1/2 
			       [@media(pointer:fine)]:hidden"
			aria-hidden="true"
		></span>
		
		{@render children?.()}
	</a>
{:else}
	<button 
		{type}
		{disabled}
		class={buttonClasses}
		style={textColor ? `color: ${textColor};` : undefined}
		{onclick}
	>
		<!-- Touch target for accessibility (44x44px minimum) -->
		<span 
			class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] 
			       -translate-x-1/2 -translate-y-1/2 
			       [@media(pointer:fine)]:hidden"
			aria-hidden="true"
		></span>
		
		{@render children?.()}
	</button>
{/if}

<style>
	/* Additional hover/active refinements if needed */
</style>
