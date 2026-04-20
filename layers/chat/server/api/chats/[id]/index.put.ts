import { getChatByIdByUser, updateChat } from '#layers/chat/server/repository/chat-repository';
import { UpdateChatSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const userId = await authenticatedUserId(event);

  const chat = await getChatByIdByUser(id, { userId });

  if (!chat) throw createError({ statusCode: 404, statusMessage: 'Chat not found' });

  const { success, data } = await readValidatedBody(event, UpdateChatSchema.safeParse);

  if (!success) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

  const storage = useStorage('db');

  await storage.setItem(`chats:has-new-chat:${userId}`, true);

  return updateChat(id, data);
});
