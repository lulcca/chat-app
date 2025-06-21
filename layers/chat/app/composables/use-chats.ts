import type { IChat } from '../types';
import { MOCK_CHAT } from '../composables/mock-data';

export default function () {
  const chats = useState<IChat[]>('chats', () => [MOCK_CHAT]);

  function chatsInProject(projectId: string) {
    return chats.value.filter((c) => c.projectId === projectId);
  }

  function createChat(options: { projectId?: string } = {}) {
    const id = (chats.value.length + 1).toString();

    const chat = {
      createdAt: new Date(),
      id,
      messages: [],
      projectId: options.projectId,
      title: `Chat ${id}`,
      updatedAt: new Date(),
    };

    chats.value.push(chat);

    return chat;
  }

  async function createChatAndNavigate(options: { projectId?: string } = {}) {
    const chat = createChat(options);

    await navigateTo(chat.projectId ? `/projects/${chat.projectId}/chats/${chat.id}` : `/chats/${chat.id}`);
  }

  return {
    chats,
    chatsInProject,
    createChat,
    createChatAndNavigate,
  };
}
