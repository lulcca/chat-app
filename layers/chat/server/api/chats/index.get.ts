import { getAllChats } from '#layers/chat/server/repository/chat-repository';

export default defineCachedEventHandler(async (event) => {
  const userId = await authenticatedUserId(event);

  const storage = useStorage('db');

  await storage.setItem(`chats:has-new-chat:${userId}`, false);

  return getAllChats();
}, {
  maxAge: 0,
  name: 'getAllChats',
  async shouldInvalidateCache(event) {
    const userId = await authenticatedUserId(event);

    const storage = useStorage('db');

    const hasNewChat = await storage.getItem<boolean>(`chats:has-new-chat:${userId}`);

    return hasNewChat || false;
  },
  swr: false,
});

