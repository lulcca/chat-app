import { createMessageForChat, getChatByIdByUser } from '#layers/chat/server/repository/chat-repository';
import { CreateMessageSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const userId = await authenticatedUserId(event);

  const chat = await getChatByIdByUser(id, { userId });

  if (!chat) throw createError({ statusCode: 404, statusMessage: 'Chat not found' });

  const { success, data } = await readValidatedBody(event, CreateMessageSchema.safeParse);

  if (!success) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

  return createMessageForChat({
    chatId: id,
    content: data.content,
    role: data.role,
  });
});
