<script lang="ts">
	/**
	 * Checkbox Component
	 * Converted from Catalyst UI Kit (React) to Svelte 5
	 * 
	 * Features:
	 * - Multiple color variants
	 * - Indeterminate state support
	 * - Dark mode support
	 * - Accessible with proper ARIA attributes
	 * - Focus states and keyboard navigation
	 */
	
	interface Props {
		/** Color variant */
		color?: 'dark/zinc' | 'blue' | 'indigo' | 'green' | 'red' | 'orange' | 'purple' | 'pink' | 'cyan';
		
		/** Checked state (controlled) */
		checked?: boolean;
		
		/** Indeterminate state (for "select all" scenarios) */
		indeterminate?: boolean;
		
		/** Name attribute for form submission */
		name?: string;
		
		/** Value attribute */
		value?: string;
		
		/** Disabled state */
		disabled?: boolean;
		
		/** Additional CSS classes */
		class?: string;
		
		/** Change handler */
		onchange?: (checked: boolean) => void;
	}
	
	let {
		color = 'dark/zinc',
		checked = $bindable(false),
		indeterminate = false,
		name,
		value,
		disabled = false,
		class: className = '',
		onchange
	}: Props = $props();
	
	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		checked = target.checked;
		onchange?.(target.checked);
	}
	
	// Color-specific CSS variables (using inline styles for browser compatibility)
	const colorVars = $derived(() => {
		const colors: Record<string, { check: string; bg: string; border: string }> = {
			'dark/zinc': { check: '#ffffff', bg: '#18181b', border: '#27272a' },
			'blue': { check: '#ffffff', bg: '#2563eb', border: '#1d4ed8' },
			'indigo': { check: '#ffffff', bg: '#6366f1', border: '#4f46e5' },
			'green': { check: '#ffffff', bg: '#16a34a', border: '#15803d' },
			'red': { check: '#ffffff', bg: '#dc2626', border: '#b91c1c' },
			'orange': { check: '#ffffff', bg: '#f97316', border: '#ea580c' },
			'purple': { check: '#ffffff', bg: '#a855f7', border: '#9333ea' },
			'pink': { check: '#ffffff', bg: '#ec4899', border: '#db2777' },
			'cyan': { check: '#083344', bg: '#67e8f9', border: '#22d3ee' },
		};
		return colors[color] || colors['dark/zinc'];
	});
	
	const checkboxClasses = $derived(
		[
			// Base layout
			'relative isolate flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] sm:size-4',
			'cursor-pointer',
			
			// Background and border  
			'bg-white border-2 border-gray-300',
			'transition-all duration-150',
			
			// Focus ring
			'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500',
			
			// Disabled state
			disabled && 'opacity-50 cursor-not-allowed',
			
			className
		]
		.filter(Boolean)
		.join(' ')
	);
</script>

<label class="inline-flex {disabled ? 'cursor-not-allowed' : 'cursor-pointer'}">
	<span class={checkboxClasses} 
		  style={checked || indeterminate 
			  ? `background-color: ${colorVars().bg}; border-color: ${colorVars().border};` 
			  : ''}>
		<input
			type="checkbox"
			{name}
			{value}
			{disabled}
			bind:checked
			{indeterminate}
			onchange={handleChange}
			class="sr-only"
			aria-checked={indeterminate ? 'mixed' : checked}
		/>
		
		<!-- Checkmark SVG -->
		<svg
			class="size-4 sm:h-3.5 sm:w-3.5 transition-opacity duration-150"
			style="stroke: {colorVars().check}; opacity: {checked && !indeterminate ? 1 : 0};"
			viewBox="0 0 14 14"
			fill="none"
		>
			<path
				d="M3 8L6 11L11 3.5"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		
		<!-- Indeterminate dash -->
		<svg
			class="size-4 sm:h-3.5 sm:w-3.5 transition-opacity duration-150"
			style="stroke: {colorVars().check}; opacity: {indeterminate ? 1 : 0};"
			viewBox="0 0 14 14"
			fill="none"
		>
			<path
				d="M3 7H11"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</span>
</label>
