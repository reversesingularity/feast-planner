<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    variant?: 'heading' | 'subheading';
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }

  let {
    level = 1,
    variant = 'heading',
    class: className = '',
    children,
    ...rest
  }: Props = $props();

  const baseClasses = $derived(() => {
    if (variant === 'subheading') {
      return 'text-base/7 font-semibold sm:text-sm/6 dark:text-white';
    }
    return 'text-2xl/8 font-semibold sm:text-xl/8 dark:text-white';
  });

  const combinedClass = $derived(`${baseClasses()} ${className}`.trim());
  const textColor = '#111827';
</script>

{#if level === 1}
  <h1 class={combinedClass} style="color: {textColor};" {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </h1>
{:else if level === 2}
  <h2 class={combinedClass} style="color: {textColor};" {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </h2>
{:else if level === 3}
  <h3 class={combinedClass} style="color: {textColor};" {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </h3>
{:else if level === 4}
  <h4 class={combinedClass} style="color: {textColor};" {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </h4>
{:else if level === 5}
  <h5 class={combinedClass} style="color: {textColor};" {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </h5>
{:else}
  <h6 class={combinedClass} style="color: {textColor};" {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </h6>
{/if}
