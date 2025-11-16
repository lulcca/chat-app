<script setup lang="ts">
const route = useRoute();

const { title: appTitle } = useAppConfig();
const { chat: chatFromChats, fetchMessages, messages, sendMessage } = useChat(route.params.chatId as string);

await fetchMessages();

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
