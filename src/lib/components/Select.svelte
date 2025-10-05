<script lang="ts">
	/**
	 * Select Component  
	 * Converted from Catalyst UI Kit (React) to Svelte 5
	 * 
	 * Features:
	 * - Native HTML select element (for better compatibility)
	 * - Validation states
	 * - Dark mode support
	 * - Accessible with proper ARIA attributes
	 * 
	 * Note: For multi-select, use native <select multiple> directly
	 */
	
	interface Props {
		/** Name attribute for form submission */
		name?: string;
		
		/** Selected value (controlled) */
		value?: string;
		
		/** Disabled state */
		disabled?: boolean;
		
		/** Required field */
		required?: boolean;
		
		/** Invalid state */
		invalid?: boolean;
		
		/** Additional CSS classes */
		class?: string;
		
		/** Change handler */
		onchange?: (value: string) => void;
		
		/** Children (option elements) */
		children?: import('svelte').Snippet;
	}
	
	let {
		name,
		value = $bindable(undefined),
		disabled = false,
		required = false,
		invalid = false,
		class: className = '',
		onchange,
		children
	}: Props = $props();
	
	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		value = target.value;
		onchange?.(target.value);
	}
	
	const selectClasses = $derived(
		[
			// Base layout
			'relative block w-full appearance-none rounded-lg',
			'py-[calc(theme(spacing.2.5)-1px)] sm:py-[calc(theme(spacing.1.5)-1px)]',
			
			// Horizontal padding
			'pr-[calc(theme(spacing.10)-1px)] pl-[calc(theme(spacing.3.5)-1px)] sm:pr-[calc(theme(spacing.9)-1px)] sm:pl-[calc(theme(spacing.3)-1px)]',
			
			// Typography
			'text-base/6 sm:text-sm/6',
			
			// Border
			'border',
			invalid
				? 'border-red-500 hover:border-red-500'
				: 'border-gray-300 hover:border-gray-400',
			
			// Background
			'bg-white',
			
			// Focus styles
			'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
			
			// Disabled state
			disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
			
			// Transition
			'transition-colors duration-150',
			
			className
		]
		.filter(Boolean)
		.join(' ')
	);
</script>

<div class="relative group w-full" style="color: #111827;">
	<select
		{name}
		{disabled}
		{required}
		bind:value
		onchange={handleChange}
		class={selectClasses}
		aria-invalid={invalid}
	>
		{@render children?.()}
	</select>
	
	<!-- Dropdown icon -->
	<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
		<svg
			class="size-5 stroke-gray-500"
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M5.75 10.75L8 13L10.25 10.75"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M10.25 5.25L8 3L5.75 5.25"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</span>
</div>
