import { getProjectById } from './project-repository';
import { v4 as uuidv4 } from 'uuid';

const chats_key = 'chats:all';

const storage = useStorage<IChat[]>('db');

async function getChats(): Promise<IChat[]> {
  let chats = await storage.getItem(chats_key);

  if (chats === null) {
    chats = [MOCK_CHAT];

    await saveChats(chats);
  }

  return chats;
}

async function saveChats(chats: IChat[]): Promise<void> {
  await storage.setItem(chats_key, chats);
}

export async function createChat(data: { title?: string, projectId?: string }): Promise<IProjectChat | null> {
  const now = new Date();

  const new_chat: IChat = {
    createdAt: now,
    id: uuidv4(),
    messages: [],
    projectId: data.projectId,
    title: data.title || 'New Chat',
    updatedAt: now,
  };

  const chats = await getChats();

  chats.push(new_chat);

  await saveChats(chats);

  const project = data.projectId ? await getProjectById(data.projectId) : null;

  return {
    ...new_chat,
    messages: [],
    project,
  };
}

export async function createMessageForChat(data: { content: string, role: 'user' | 'assistant', chatId: string }): Promise<IChatMessage | null> {
  const chats = await getChats();

  const chat_index = chats.findIndex(c => c.id === data.chatId);

  if (chat_index === -1) return null;

  const chat = chats[chat_index];

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

  chats[chat_index] = chat;

  await saveChats(chats);

  return new_message;
}

export async function deleteChat(id: string): Promise<boolean> {
  const chats = await getChats();

  const index = chats.findIndex((chat) => chat.id === id);

  if (index !== -1) {
    chats.splice(index, 1);

    await saveChats(chats);

    return true;
  }

  return false;
}

export async function deleteMessagesForChat(chatId: string): Promise<void> {
  const chats = await getChats();

  const chat_index = chats.findIndex(c => c.id === chatId);

  if (chat_index === -1) return;

  const chat = chats[chat_index];

  if (!chat) return;

  chat.messages = [];

  chat.updatedAt = new Date();

  chats[chat_index] = chat;

  await saveChats(chats);
}

export async function getAllChats(): Promise<IChat[]> {
  const chats = await getChats();

  let transformed_chats = await Promise.all(chats.map(async (chat) => {
    const lastMessage = await getLastMessageForChat(chat.id);

    return {
      ...chat,
      messages: lastMessage ? [lastMessage] : [],
      project: chat.projectId ? await getProjectById(chat.projectId) || undefined : undefined,
    };
  }));

  transformed_chats = transformed_chats.sort((a, b) => new Date (b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return transformed_chats;
}

export async function getChatById(id: string): Promise<(IChat & { project: IProject | null }) | null> {
  const chats = await getChats();

  const chat = chats.find(c => c.id === id);

  if (!chat) return null;

  const lastMessage = await getLastMessageForChat(id);

  const project = chat.projectId ? await getProjectById(chat.projectId) : null;

  return {
    ...chat,
    messages: lastMessage ? [lastMessage] : [],
    project,
  };
}

export async function getLastMessageForChat(chatId: string): Promise<IChatMessage | null> {
  const chats = await getChats();

  const chat = chats.find(c => c.id === chatId);

  if (!chat || chat.messages.length === 0) return null;

  const last_message = chat.messages.reduce((latest, msg) => msg.createdAt > latest.createdAt ? msg : latest);

  return {
    ...last_message,
    createdAt: new Date(last_message.createdAt),
    updatedAt: new Date(last_message.updatedAt),
  };
}

export async function getMessagesByChatId(chatId: string): Promise<IChatMessage[]> {
  const chats = await getChats();

  const chat = chats.find(c => c.id === chatId);

  if (!chat) return [];

  return [...chat.messages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export async function updateChat(id: string, data: { title?: string, projectId?: string }): Promise<IProjectChat | null> {
  const chats = await getChats();

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

  await saveChats(chats);

  const lastMessage = await getLastMessageForChat(id);

  const project = updatedChat.projectId ? await getProjectById(updatedChat.projectId) : null;

  return {
    ...updatedChat,
    messages: lastMessage ? [lastMessage] : [],
    project,
  };
}
