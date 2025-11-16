import { getAllChats } from '~~/layers/chat/server/repository/chat-repository';

export default defineCachedEventHandler(async (_event) => {
  const storage = useStorage('db');

  await storage.setItem('chats:has-new-chat', false);

  return getAllChats();
}, {
  maxAge: 0,
  name: 'getAllChats',
  async shouldInvalidateCache() {
    const storage = useStorage('db');

    const has_new_chat = await storage.getItem<boolean>('chats:has-new-chat');

    return has_new_chat || false;
  },
  swr: false,
});

