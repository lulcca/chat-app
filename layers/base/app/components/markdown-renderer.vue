<script lang="ts" setup>
const props = defineProps<{ content: string }>();
</script>

<template>
  <MDC
    :value="props.content"
    class="prose dark:prose-invert"
  />
</template>
