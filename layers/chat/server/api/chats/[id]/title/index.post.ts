import { createOpenAIModel, generateChatTitle } from '#layers/chat/server/services/ai-service';
import { getChatByIdByUser, updateChat } from '#layers/chat/server/repository/chat-repository';
import { UpdateChatTitleSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const userId = await authenticatedUserId(event);

  const chat = await getChatByIdByUser(id, { userId });

  if (!chat) throw createError({ statusCode: 404, statusMessage: 'Chat not found' });

  const { success, data } = await readValidatedBody(event, UpdateChatTitleSchema.safeParse);

  if (!success) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

  const { openaiApiKey } = useRuntimeConfig();

  const model = createOpenAIModel(openaiApiKey);

  const title = await generateChatTitle(model, data.message);

  return updateChat(id, { title });
});
