<script lang="ts">
  interface Props {
    soft?: boolean;
    class?: string;
    [key: string]: any;
  }

  let {
    soft = false,
    class: className = '',
    ...rest
  }: Props = $props();

  const borderClass = $derived(
    soft 
      ? 'border-zinc-950/5 dark:border-white/5'
      : 'border-zinc-950/10 dark:border-white/10'
  );

  const combinedClass = $derived(`w-full border-t ${borderClass} ${className}`.trim());
</script>

<hr role="presentation" class={combinedClass} {...rest} />
