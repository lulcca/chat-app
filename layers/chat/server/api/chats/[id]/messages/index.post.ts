import { CreateMessageSchema } from '~~/layers/chat/server/schemas';
import { createMessageForChat } from '~~/layers/chat/server/repository/chat-repository';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { success, data } = await readValidatedBody(event, CreateMessageSchema.safeParse);

  if (!success) return 400;

  return createMessageForChat({
    chatId: id,
    content: data.content,
    role: data.role,
  });
});
