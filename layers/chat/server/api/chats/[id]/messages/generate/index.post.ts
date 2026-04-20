import { createMessageForChat, getChatByIdByUser, getMessagesByChatId } from '#layers/chat/server/repository/chat-repository';
import { createOpenAIModel, generateChatResponse } from '#layers/chat/server/services/ai-service';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const userId = await authenticatedUserId(event);

  const chat = await getChatByIdByUser(id, { userId });

  if (!chat) throw createError({ statusCode: 404, statusMessage: 'Chat not found' });

  const history = await getMessagesByChatId(id);

  const { openaiApiKey } = useRuntimeConfig();

  const openai = createOpenAIModel(openaiApiKey);

  const reply = await generateChatResponse(openai, history);

  return createMessageForChat({
    chatId: id,
    content: reply,
    role: 'assistant',
  });
});
