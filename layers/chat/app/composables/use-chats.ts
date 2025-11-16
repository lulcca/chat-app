export default function () {
  const chats = useState<IChat[]>('chats', () => [MOCK_CHAT]);

  const { data, execute, status } = useFetch<IChat[]>('/api/chats', {
    default: () => [],
    immediate: false,
  });

  async function fetchChats() {
    if (status.value !== 'idle') return;
    await execute();
    chats.value = data.value;
  }

  function chatsInProject(projectId: string) {
    return chats.value.filter((c) => c.projectId === projectId);
  }

  async function createChat(options: { projectId?: string, title?: string } = {}) {
    const new_chat = await $fetch<IChat>('/api/chats', {
      body: {
        projectId: options.projectId,
        title: options.title,
      },
      method: 'POST',
    });

    chats.value.push(new_chat);

    return new_chat;
  }

  async function createChatAndNavigate(options: { projectId?: string } = {}) {
    const chat = await createChat(options);

    await navigateTo(chat.projectId ? `/projects/${chat.projectId}/chats/${chat.id}` : `/chats/${chat.id}`);
  }

  return {
    chats,
    chatsInProject,
    createChat,
    createChatAndNavigate,
    fetchChats,
  };
}
