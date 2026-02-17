export default function (chatId: string) {
  const { chats } = useChats();

  const chat = computed(() => chats.value.find((c) => c.id === chatId));

  const messages = computed<IChatMessage[]>(() => chat.value?.messages || []);

  const { data, execute, status } = useFetch<IChatMessage[]>(`/api/chats/${chatId}/messages`, {
    default: () => [],
    immediate: false,
  });

  async function assignToProject(projectId: string | null) {
    if (!chat.value) return;

    const originalProjectId = chat.value.projectId;

    chat.value.projectId = projectId || undefined;

    try {
      const updatedChat = await $fetch<IChat>(`/api/chats/${chatId}`, {
        body: {
          projectId,
        },
        method: 'PUT',
      });

      const chatIndex = chats.value.findIndex(c => c.id === chatId);

      if (chatIndex !== -1 && chats.value[chatIndex]) {
        chats.value[chatIndex].projectId = updatedChat.projectId;

        chats.value[chatIndex].updatedAt = updatedChat.updatedAt;
      }
    } catch (error) {
      console.error('Error assigning chat to project:', error);

      chat.value.projectId = originalProjectId;

      throw error;
    }
  }

  async function fetchMessages(refresh = false) {
    const hasExistingMessages = messages.value.length > 1;

    const isRequestInProgress = status.value !== 'idle';

    const shouldSkip = !refresh && (hasExistingMessages || isRequestInProgress);

    if (shouldSkip || !chat.value) return;

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

    const optimistic_user_message: IChatMessage = {
      content: message,
      createdAt: new Date(),
      id: `optimistic_user_message-${Date.now()}`,
      role: 'user',
      updatedAt: new Date(),
    };

    messages.value.push(optimistic_user_message);

    const user_message_index = messages.value.length - 1;

    try {
      const new_message = await $fetch<IChatMessage>(`/api/chats/${chatId}/messages`, {
        body: {
          content: message,
          role: 'user',
        },
        method: 'POST',
      });

      messages.value[user_message_index] = new_message;
    } catch (error) {
      console.error('Error sendind user message:', error);

      messages.value.splice(user_message_index, 1);

      return;
    }

    messages.value.push({
      content: '',
      createdAt: new Date(),
      id: `streaming-message-${Date.now()}`,
      role: 'assistant',
      updatedAt: new Date(),
    });

    const last_message = messages.value[messages.value.length - 1] as IChatMessage;

    try {
      const response = await $fetch<ReadableStream>(`/api/chats/${chatId}/messages/stream`, {
        body: {
          messages: messages.value,
        },
        method: 'POST',
        responseType: 'stream',
      });

      const decoded_stream = response.pipeThrough(new TextDecoderStream());

      const reader = decoded_stream.getReader();

      await reader.read().then(function processText({ done, value }): Promise<void> | void {
        if (done) return;

        last_message.content += value;

        return reader.read().then(processText);
      });
    } catch (error) {
      console.error('Error streaming message:', error);
    } finally {
      await fetchMessages(true);
    }

    chat.value.updatedAt = new Date();
  }

  return {
    assignToProject,
    chat,
    fetchMessages,
    messages,
    sendMessage,
  };
};
