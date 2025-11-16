<script lang="ts" setup>
const props = defineProps<{ text: string }>();

const textEl = ref<HTMLElement | null>(null);

const animate = (el: HTMLElement) => {
  const chars = el.textContent?.length || 0;

  el.animate(
    [
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0 0 0)' },
    ],
    {
      duration: Math.min(chars * 50, 1000),
      easing: 'steps(' + chars + ', end)',
    },
  );
};

watch(
  () => props.text,
  () => {
    if (textEl.value) animate(textEl.value);
  },
);
</script>

<template>
  <span
    ref="textEl"
    class="inline-block relative whitespace-nowrap"
  >
    {{ text}}
  </span>
</template>
