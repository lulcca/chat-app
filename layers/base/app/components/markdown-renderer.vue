<script lang="ts" setup>
const props = defineProps<{
  cacheKey: string,
  content: string,
}>();
</script>

<template>
  <MDC
    :cache-key
    :value="props.content"
    class="prose dark:prose-invert"
  />
</template>
