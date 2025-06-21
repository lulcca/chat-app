<script setup lang="ts">
import type { IChat } from '~~/layers/chat/app/types';

const route = useRoute();

const { title: appTitle } = useAppConfig();
const { chat: chatFromChats, messages, sendMessage } = useChat(route.params.chatId as string);

if (!chatFromChats.value) await navigateTo(`/projects/${route.params.projectId}`, { replace: true });

const chat = computed(() => chatFromChats.value as IChat);

const title = computed(() => chat.value?.title ? `${chat.value.title} - ${appTitle}` : appTitle );

const typing = ref(false);

async function handleSendMessage (message: string) {
  typing.value = true;
  await sendMessage(message);
  typing.value = false;
};

useHead({ title });
</script>

<template>
  <ChatWindow
    :chat
    :messages
    :typing
    @send-message="(m) => handleSendMessage(m)"
  />
</template>
