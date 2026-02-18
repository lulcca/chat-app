<script lang="ts" setup>
const route = useRoute();

const { chat: chatFromChats, fetchMessages, messages, sendMessage } = useChat(route.params.chatId as string);

await fetchMessages();

if (!chatFromChats.value) await navigateTo('/', { replace: true });

const chat = computed(() => chatFromChats.value as IChat);

const appConfig = useAppConfig();

const title = computed(() => chat.value?.title ? `${chat.value.title} | ${appConfig.title}` : appConfig.title);

const typing = ref(false);

async function handleError() {
  await navigateTo('/', { replace: true });
}

async function handleSendMessage(message: string) {
  typing.value = true;
  await sendMessage(message);
  typing.value = false;
}

useHead({ title });
</script>

<template>
  <div class="flex flex-col h-full">
    <NuxtErrorBoundary>
      <ChatWindow
        :chat
        :messages
        :typing
        @send-message="(m) => handleSendMessage(m)"
      />

      <template #error="{ error }">
        <UContainer class="flex h-full items-center justify-center p-4">
          <UCard
            class="min-w-md"
            variant="soft"
          >
            <template #header>
              <h1 class="font-bold text-lg">
                {{ error }}
              </h1>
            </template>

            <UButton
              color="primary"
              variant="soft"
              icon="i-heroicons-arrow-left"
              @click="handleError"
            >
              Go back home
            </UButton>
          </UCard>
        </UContainer>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
