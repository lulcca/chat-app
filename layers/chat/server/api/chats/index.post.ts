import { CreateChatSchema } from '#layers/chat/server/schemas';
import { createChat } from '#layers/chat/server/repository/chat-repository';

export default defineEventHandler(async (event) => {

  const { success, data } = await readValidatedBody(event, CreateChatSchema.safeParse);

  if (!success) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

  const { projectId, title } = data;

  const storage = useStorage('db');

  const userId = await authenticatedUserId(event);

  await storage.setItem(`chats:has-new-chat:${userId}`, true);

  return createChat({ projectId, title, userId });
});
