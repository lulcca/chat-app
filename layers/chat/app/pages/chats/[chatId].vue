<script lang="ts" setup>
import type { IChat } from '../../types';

const route = useRoute();

const { chat: chatFromChats, messages, sendMessage } = useChat(route.params.chatId as string);

if (!chatFromChats.value) await navigateTo('/', { replace: true });

const chat = computed(() => chatFromChats.value as IChat);

const appConfig = useAppConfig();

const title = computed(() => chat.value?.title ? `${chat.value.title} | ${appConfig.title}` : appConfig.title);

const typing = ref(false);

async function handleSendMessage(message: string) {
  typing.value = true;
  await sendMessage(message);
  typing.value = false;
}

useHead({ title });
</script>

<template>
  <ChatWindow
    v-if="chat"
    :chat
    :messages
    :typing
    @send-message="(m) => handleSendMessage(m)"
  />
</template>
