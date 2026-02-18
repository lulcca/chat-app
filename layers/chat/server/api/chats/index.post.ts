import { CreateChatSchema } from '~~/layers/chat/server/schemas';
import { createChat } from '~~/layers/chat/server/repository/chat-repository';

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(event, CreateChatSchema.safeParse);

  if (!success) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

  const { projectId, title } = data;

  const storage = useStorage('db');

  await storage.setItem('chats:has-new-chat', true);

  return createChat({ projectId, title });
});
