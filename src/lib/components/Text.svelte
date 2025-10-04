<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    variant?: 'text' | 'strong' | 'code';
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }

  let {
    variant = 'text',
    class: className = '',
    children,
    ...rest
  }: Props = $props();

  const baseClasses = $derived(() => {
    switch (variant) {
      case 'strong':
        return 'font-medium dark:text-white';
      case 'code':
        return 'rounded-sm border border-gray-300 bg-gray-100 px-0.5 text-sm font-medium sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white';
      default:
        return 'text-base/6 sm:text-sm/6 dark:text-gray-200';
    }
  });

  const textColor = $derived(() => {
    switch (variant) {
      case 'strong':
      case 'code':
        return '#111827';
      default:
        return '#1f2937';
    }
  });

  const combinedClass = $derived(`${baseClasses()} ${className}`.trim());
</script>

{#if variant === 'strong'}
  <strong class={combinedClass} style="color: {textColor()};" {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </strong>
{:else if variant === 'code'}
  <code class={combinedClass} style="color: {textColor()};" {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </code>
{:else}
  <p data-slot="text" class={combinedClass} style="color: {textColor()};" {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </p>
{/if}
