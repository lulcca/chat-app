<script lang="ts" setup>
const emit = defineEmits<{ (e: 'send-message', message: string): void }>();

const { isStreaming = false } = defineProps<{ isStreaming?: boolean }>();

const newMessage = ref('');

const textareaRef = useTemplateRef('textarea-ref');

async function adjustTextareaHeight() {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto';
    await nextTick();
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
}

function handleSendMessage() {
  if (!newMessage.value.trim() || isStreaming) return;

  emit('send-message', newMessage.value.trim());
  newMessage.value = '';

  nextTick(() => {
    adjustTextareaHeight();
    textareaRef.value?.focus();
  });
}

onMounted(() => textareaRef.value?.focus());

watch(() => isStreaming, async (value: boolean) => {
  if (!value) {
    await nextTick();
    textareaRef.value?.focus();
  }
});
</script>

<template>
  <form
    class="bg-[var(--ui-bg)] border border-solid border-[var(--ui-border)] ease-in-out flex items-center focus-within:transform-none hover:outline-none hover:shadow-lg hover:transform-none justify-center overflow-hidden px-6 py-4 relative rounded-3xl transition-all"
    @submit.prevent="handleSendMessage"
  >
    <textarea
      ref="textarea-ref"
      v-model="newMessage"
      :disabled="isStreaming"
      :rows="1"
      class="bg-transparent disabled:cursor-not-allowed mr-6 outline-none p-0 resize-none w-full"
      @input="adjustTextareaHeight"
      @keydown.enter.prevent="handleSendMessage"
    />

    <UButton
      :disabled="!newMessage || isStreaming"
      class="absolute bottom-3 right-3 rounded-full"
      color="primary"
      icon="i-heroicons-paper-airplane"
      square
      type="submit"
      variant="solid"
    />
  </form>
</template>
