<script lang="ts">
	/**
	 * Avatar Component
	 * Converted from Catalyst UI Kit (React) to Svelte 5
	 * 
	 * Features:
	 * - Image or initials display
	 * - Square or round shape
	 * - Customizable size
	 * - Dark mode support
	 * - Accessible with proper alt text
	 */
	
	interface Props {
		/** Image source URL */
		src?: string | null;
		
		/** Display initials instead of/fallback to image */
		initials?: string;
		
		/** Square avatar (default is round) */
		square?: boolean;
		
		/** Alt text for accessibility */
		alt?: string;
		
		/** Additional CSS classes */
		class?: string;
	}
	
	let {
		src = null,
		initials,
		square = false,
		alt = '',
		class: className = ''
	}: Props = $props();
	
	// Determine what to display
	const hasImage = $derived(!!src);
	const hasInitials = $derived(!!initials);
	
	const avatarClasses = $derived(
		[
			// Basic layout
			'inline-grid shrink-0 align-middle',
			'*:col-start-1 *:row-start-1',
			
			// Outline
			'outline -outline-offset-1 outline-black/10',
			
			// Border radius
			square ? 'rounded-[20%] *:rounded-[20%]' : 'rounded-full *:rounded-full',
			
			className
		]
		.filter(Boolean)
		.join(' ')
	);
</script>

<span class={avatarClasses}>
	{#if hasInitials}
		<svg
			class="size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none"
			viewBox="0 0 100 100"
			aria-hidden={alt ? undefined : true}
		>
			{#if alt}
				<title>{alt}</title>
			{/if}
			<text 
				x="50%" 
				y="50%" 
				alignment-baseline="middle" 
				dominant-baseline="middle" 
				text-anchor="middle" 
				dy=".125em"
			>
				{initials}
			</text>
		</svg>
	{/if}
	{#if hasImage}
		<img 
			class="size-full" 
			src={src} 
			{alt}
		/>
	{/if}
</span>
