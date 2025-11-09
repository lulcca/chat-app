export default function (chatId: string) {
  const { chats } = useChats();

  const chat = computed(() => chats.value.find((c) => c.id === chatId));

  const messages = computed<IChatMessage[]>(() => chat.value?.messages || []);

  function createMessage(message: string, role: IChatMessage['role']) {
    const id = messages.value.length.toString();

    return {
      content: message,
      createdAt: new Date(),
      id,
      role,
      updatedAt: new Date(),
    };
  }

  async function sendMessage(message: string) {
    if (!chat.value) return;

    messages.value.push(createMessage(message, 'user'));

    const data = await $fetch<IChatMessage>('/api/ai', {
      body: { messages: messages.value },
      method: 'POST',
    });

    chat.value.updatedAt = new Date();

    messages.value.push(data);
  }

  return {
    chat,
    messages,
    sendMessage,
  };
};
