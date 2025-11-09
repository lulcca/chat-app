import { getProjectById } from './project-repository';
import { v4 as uuidv4 } from 'uuid';

const chats: IChat[] = [MOCK_CHAT];

export async function getAllChats(): Promise<IChat[]> {
  return chats
    .map((chat) => {
      const lastMessage = getLastMessageForChat(chat.id);
      return {
        ...chat,
        messages: lastMessage ? [lastMessage] : [],
        project: chat.projectId ? getProjectById(chat.projectId) || undefined : undefined,
      };
    })
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

export async function createChat(
  data: {
    title?: string,
    projectId?: string,
  },
): Promise<IProjectChat | null> {
  const now = new Date();

  const new_chat: IChat = {
    createdAt: now,
    id: uuidv4(),
    messages: [],
    projectId: data.projectId,
    title: data.title || 'New Chat',
    updatedAt: now,
  };
  chats.push(new_chat);

  return {
    ...new_chat,
    messages: [],
    project: data.projectId ? getProjectById(data.projectId) || null : null,
  };
}

export async function getChatById(id: string): Promise<(IChat & { project: IProject | null }) | null> {
  const chat = chats.find(c => c.id === id);

  if (!chat) return null;

  const lastMessage = getLastMessageForChat(id);

  return {
    ...chat,
    messages: lastMessage ? [lastMessage] : [],
    project: chat.projectId ? getProjectById(chat.projectId) || null : null,
  };
}

export async function updateChat(
  id: string,
  data: {
    title?: string,
    projectId?: string,
  },
): Promise<IProjectChat | null> {
  const chat_index = chats.findIndex(c => c.id === id);

  if (chat_index === -1) return null;

  const chat = chats[chat_index];

  if (!chat) return null;

  const updatedChat: IChat = {
    ...chat,
    ...(data.title && { title: data.title }),
    ...(data.projectId !== undefined && {
      projectId: data.projectId,
    }),
    updatedAt: new Date(),
  };
  chats[chat_index] = updatedChat;

  const lastMessage = getLastMessageForChat(id);

  return {
    ...updatedChat,
    messages: lastMessage ? [lastMessage] : [],
    project: updatedChat.projectId ? getProjectById(updatedChat.projectId) || null : null,
  };
}

export async function deleteChat(id: string): Promise<boolean> {
  const index = chats.findIndex((chat) => chat.id === id);

  if (index !== -1) {
    chats.splice(index, 1);
    deleteMessagesForChat(id);

    return true;
  }

  return false;
}

export function getMessagesByChatId(chatId: string): IChatMessage[] {
  const chat = chats.find(c => c.id === chatId);

  if (!chat) return [];

  return [...chat.messages].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export async function createMessageForChat(
  data: {
    content: string,
    role: 'user' | 'assistant',
    chatId: string,
  },
): Promise<IChatMessage | null> {
  const chat = chats.find(c => c.id === data.chatId);

  if (!chat) return null;

  const now = new Date();

  const new_message: IChatMessage = {
    content: data.content,
    createdAt: now,
    id: uuidv4(),
    role: data.role,
    updatedAt: now,
  };

  chat.messages.push(new_message);

  chat.updatedAt = now;

  return new_message;
}

export function deleteMessagesForChat(chatId: string): void {
  const chat = chats.find(c => c.id === chatId);

  if (chat) {
    chat.messages = [];
    chat.updatedAt = new Date();
  }
}

export function getLastMessageForChat(chatId: string): IChatMessage | null {
  const chat = chats.find(c => c.id === chatId);

  if (!chat || chat.messages.length === 0) return null;

  return chat.messages.reduce((latest, msg) => msg.createdAt > latest.createdAt ? msg : latest);
}
