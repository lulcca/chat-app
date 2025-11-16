import { createChat } from '~~/layers/chat/server/repository/chat-repository';

export default defineEventHandler(async (event) => {
  const { projectId, title } = await readBody(event);

  const storage = useStorage('db');

  await storage.setItem('chats:has-new-chat', true);

  return createChat({ projectId, title });
});
