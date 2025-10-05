<script lang="ts">
	/**
	 * Radio Component
	 * Converted from Catalyst UI Kit (React) to Svelte 5
	 * 
	 * Features:
	 * - Multiple color variants
	 * - Dark mode support
	 * - Accessible with proper ARIA attributes
	 * - Focus states and keyboard navigation
	 */
	
	interface Props {
		/** Color variant */
		color?: 'dark/zinc' | 'blue' | 'indigo' | 'green' | 'red' | 'orange' | 'purple' | 'pink' | 'cyan';
		
		/** Name attribute for radio group */
		name: string;
		
		/** Value attribute */
		value: string;
		
		/** Checked state (controlled) */
		checked?: boolean;
		
		/** Disabled state */
		disabled?: boolean;
		
		/** Additional CSS classes */
		class?: string;
		
		/** Change handler */
		onchange?: (value: string) => void;
	}
	
	let {
		color = 'dark/zinc',
		name,
		value,
		checked = false,
		disabled = false,
		class: className = '',
		onchange
	}: Props = $props();
	
	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			onchange?.(value);
		}
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
			'cyan': { check: '#ffffff', bg: '#06b6d4', border: '#0891b2' },
		};
		return colors[color] || colors['dark/zinc'];
	});
	
	const radioClasses = $derived(
		[
			// Base layout
			'relative isolate flex size-[1.125rem] items-center justify-center rounded-full sm:size-4',
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
	<span class={radioClasses} 
		  style={checked 
			  ? `background-color: ${colorVars().bg}; border-color: ${colorVars().border};` 
			  : ''}>
		<input
			type="radio"
			{name}
			{value}
			{disabled}
			{checked}
			onchange={handleChange}
			class="sr-only"
		/>
		
		<!-- Inner dot (shown when checked) -->
		<span 
			class="size-1.5 rounded-full transition-opacity duration-150 sm:size-1"
			style="background-color: {colorVars().check}; opacity: {checked ? 1 : 0};"
		></span>
	</span>
</label>
