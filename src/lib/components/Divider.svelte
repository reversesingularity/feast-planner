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
      ? 'border-gray-200 dark:border-white/5'
      : 'border-gray-300 dark:border-white/10'
  );

  const combinedClass = $derived(`w-full border-t ${borderClass} ${className}`.trim());
</script>

<hr role="presentation" class={combinedClass} {...rest} />
