export default function (chatId: string) {
  const { chats } = useChats();

  const chat = computed(() => chats.value.find((c) => c.id === chatId));

  const messages = computed<IChatMessage[]>(() => chat.value?.messages || []);

  const { data, execute, status } = useFetch<IChatMessage[]>(`/api/chats/${chatId}/messages`, {
    default: () => [],
    immediate: false,
  });

  async function fetchMessages() {
    if (status.value !== 'idle' || !chat.value) return;
    await execute();
    chat.value.messages = data.value;
  }

  async function generateChatTitle(message: string) {
    if (!chat.value) return;

    const updated_chat = await $fetch<IChat>(`/api/chats/${chatId}/title`, {
      body: { message },
      method: 'POST',
    });

    chat.value.title = updated_chat.title;
  }

  async function sendMessage(message: string) {
    if (!chat.value) return;

    if (messages.value.length === 0 ) generateChatTitle(message);

    const new_message = await $fetch<IChatMessage>(`/api/chats/${chatId}/messages`, {
      body: {
        content: message,
        role: 'user',
      },
      method: 'POST',
    });

    messages.value.push(new_message);

    const ai_response = await $fetch<IChatMessage>(`/api/chats/${chatId}/messages/generate`, {
      method: 'POST',
    });

    messages.value.push(ai_response);

    chat.value.updatedAt = new Date();
  }

  return {
    chat,
    fetchMessages,
    messages,
    sendMessage,
  };
};
