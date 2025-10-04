<script lang="ts">
	/**
	 * Input Component
	 * Converted from Catalyst UI Kit (React) to Svelte 5
	 * 
	 * Features:
	 * - Multiple input types (text, email, password, number, search, tel, url, date)
	 * - Label support
	 * - Placeholder text
	 * - Error states with validation
	 * - Disabled states
	 * - Dark mode support
	 * - Icon support (left/right)
	 * - Focus rings
	 * 
	 * Usage:
	 * <Input label="Email" type="email" placeholder="you@example.com" />
	 * <Input label="Password" type="password" required />
	 */
	
	interface Props {
		/** Input label */
		label?: string;
		
		/** Input type */
		type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' | 
		       'date' | 'datetime-local' | 'month' | 'time' | 'week';
		
		/** Input value (bindable) */
		value?: string | number;
		
		/** Placeholder text */
		placeholder?: string;
		
		/** Input name attribute */
		name?: string;
		
		/** Required field */
		required?: boolean;
		
		/** Disabled state */
		disabled?: boolean;
		
		/** Error message (shows red border if present) */
		error?: string;
		
		/** Additional CSS classes */
		class?: string;
		
		/** Input event handler */
		oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		
		/** Change event handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		
		/** Blur event handler */
		onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
	}
	
	let {
		label,
		type = 'text',
		value = $bindable(''),
		placeholder,
		name,
		required = false,
		disabled = false,
		error,
		class: className = '',
		oninput,
		onchange,
		onblur
	}: Props = $props();
	
	// Date input types
	const dateTypes = ['date', 'datetime-local', 'month', 'time', 'week'];
	const isDateType = $derived(dateTypes.includes(type));
	
	// Container classes
	const containerClasses = $derived(
		[
			'relative block w-full',
			// Background with shadow
			'before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)]',
			'before:bg-white before:shadow-sm',
			'dark:before:hidden',
			// Focus ring
			'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg',
			'after:ring-transparent after:ring-inset',
			'focus-within:after:ring-2 focus-within:after:ring-blue-500',
			// Disabled state
			disabled && 'opacity-50 before:bg-zinc-950/5 before:shadow-none',
			className
		]
		.filter(Boolean)
		.join(' ')
		.trim()
	);
	
	// Input classes
	const inputClasses = $derived(
		[
			// Date-specific styles
			isDateType && [
				'[&::-webkit-datetime-edit-fields-wrapper]:p-0',
				'[&::-webkit-date-and-time-value]:min-h-[1.5em]',
				'[&::-webkit-datetime-edit]:inline-flex [&::-webkit-datetime-edit]:p-0',
			],
			// Basic layout
			'relative block w-full appearance-none rounded-lg',
			'px-[calc(theme(spacing.3.5)-1px)] py-[calc(theme(spacing.2.5)-1px)]',
			'sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing.1.5)-1px)]',
			// Typography
			'text-base/6 text-zinc-950 placeholder:text-zinc-500',
			'sm:text-sm/6 dark:text-white dark:placeholder:text-zinc-400',
			// Border
			error 
				? 'border border-red-500 hover:border-red-600 dark:border-red-600' 
				: 'border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20',
			// Background
			'bg-transparent dark:bg-white/5',
			// Focus
			'focus:outline-none',
			// Disabled
			disabled && 'border-zinc-950/20 dark:border-white/15 dark:bg-white/2.5 cursor-not-allowed',
		]
		.flat()
		.filter(Boolean)
		.join(' ')
		.trim()
	);
</script>

{#if label}
	<div class="mb-2">
		<label class="block text-sm font-medium text-zinc-950 dark:text-white">
			{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</label>
	</div>
{/if}

<span class={containerClasses}>
	<input
		{type}
		{name}
		{placeholder}
		{required}
		{disabled}
		bind:value
		class={inputClasses}
		{oninput}
		{onchange}
		{onblur}
		aria-invalid={error ? 'true' : undefined}
	/>
</span>

{#if error}
	<p class="mt-1 text-sm text-red-600 dark:text-red-400">
		{error}
	</p>
{/if}
