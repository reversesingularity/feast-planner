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
        return 'font-medium text-zinc-950 dark:text-white';
      case 'code':
        return 'rounded-sm border border-zinc-950/10 bg-zinc-950/2.5 px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white';
      default:
        return 'text-base/6 text-zinc-700 sm:text-sm/6 dark:text-zinc-300';
    }
  });

  const combinedClass = $derived(`${baseClasses()} ${className}`.trim());
</script>

{#if variant === 'strong'}
  <strong class={combinedClass} {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </strong>
{:else if variant === 'code'}
  <code class={combinedClass} {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </code>
{:else}
  <p data-slot="text" class={combinedClass} {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </p>
{/if}
