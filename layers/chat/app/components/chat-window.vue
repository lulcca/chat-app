<script lang="ts" setup>
const emit = defineEmits<{ (e: 'send-message', message: string): void }>();

const props = defineProps<{
  chat: IChat,
  messages: IChatMessage[],
  typing: boolean,
}>();

const { pinToBottom, showScrollButton, scrollToBottom } = useChatScroll();

watch(() => props.messages, pinToBottom, { deep: true });
</script>

<template>
  <div
    ref="scroll-container-ref"
    class="box-border flex-auto min-h-0 overflow-y-auto w-full"
  >
    <UContainer class="h-full max-w-3xl">
      <div class="flex items-center justify-between mb-6 px-0 py-4">
        <h1 class="font-bold text-2xl text-(--ui-text)">
          <TypewriterText :text="chat?.title || 'Chat'" />
        </h1>
      </div>

      <div class="flex flex-col gap-4 overflow-y-auto mb-6 pb-32">
        <template v-for="message in messages" :key="message.id">
          <div
            class="duration-200 p-4 rounded-(--ui-radius) transition-all"
            :class="{
              'bg-(--ui-bg-muted) border border-solid border-(--ui-border) self-end w-3/4': message.role === 'user',
              'bg-none border-none px-0 py-4 w-full': message.role === 'assistant',
            }"
          >
            <div class="break-words text-(--ui-text) whitespace-pre-wrap">
              <MarkdownRenderer :content="message.content" />
            </div>
          </div>
        </template>

        <template v-if="typing">
          <span class="animate-pulse inline-block ml-1">
            &#9611;
          </span>
        </template>
      </div>

      <div class="bottom-6 fixed margin-auto max-w-3xl w-[calc(100%-3rem)] z-10">
        <div class="absolute bottom-[calc(100%+1rem)] flex justify-center left-0 pointer-events-none w-full">
          <template v-if="showScrollButton">
            <UButton
              class="pointer-events-auto rounded-full shadow-sm"
              color="neutral"
              icon="i-heroicons-arrow-down"
              variant="outline"
              @click="() => scrollToBottom()"
            />
          </template>
        </div>

        <ChatInput @send-message="(message) => emit('send-message', message)" />
      </div>
    </UContainer>
  </div>
</template>
