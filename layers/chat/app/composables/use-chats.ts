export default function () {
  const chats = useState<IChatWithMessages[]>('chats', () => []);

  const { data, execute, status } = useFetch<IChatWithMessages[]>('/api/chats', {
    default: () => [],
    headers: useRequestHeaders(['cookie']),
    immediate: false,
  });

  async function fetchChats(refresh = false) {
    if (status.value !== 'idle' && !refresh) return;
    await execute();
    chats.value = data.value || [];
  }

  function chatsInProject(projectId: string) {
    return chats.value.filter((c) => c.projectId === projectId);
  }

  async function createChat(options: { projectId?: string, title?: string } = {}) {
    const newChat = await $fetch<IChatWithMessages>('/api/chats', {
      body: {
        projectId: options.projectId,
        title: options.title,
      },
      headers: useRequestHeaders(['cookie']),
      method: 'POST',
    });

    chats.value.push(newChat);

    return newChat;
  }

  async function createChatAndNavigate(options: { projectId?: string } = {}) {
    const chat = await createChat(options);

    if (!chat || !chat.id) throw new Error('Failed to create chat');

    await navigateTo(chat.projectId ? `/projects/${chat.projectId}/chats/${chat.id}` : `/chats/${chat.id}`);
  }

  async function preFetchChatMessages() {
    const recentChats = chats.value.toSorted((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 2);

    await Promise.all(recentChats.map(async (chat) => {
      try {
        const messages = await $fetch<IMessage[]>(`/api/chats/${chat.id}/messages`, {
          headers: useRequestHeaders(['cookie']),
        });

        const targetChat = chats.value.find(c => c.id === chat.id);

        if (targetChat) targetChat.messages = messages;
      } catch (error) {
        console.error(`Failed to fetch messaged for chat ${chat.id}:`, error);
      }
    }));
  }

  return {
    chats,
    chatsInProject,
    createChat,
    createChatAndNavigate,
    fetchChats,
    preFetchChatMessages,
  };
}
