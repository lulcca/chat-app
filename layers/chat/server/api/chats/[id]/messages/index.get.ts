import { getChatByIdByUser, getMessagesByChatId } from '#layers/chat/server/repository/chat-repository';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const userId = await authenticatedUserId(event);

  const chat = await getChatByIdByUser(id, { userId });

  if (!chat) throw createError({ statusCode: 404, statusMessage: 'Chat not found' });

  const messages = getMessagesByChatId(id);

  return messages;
});
