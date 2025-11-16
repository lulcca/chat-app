import { createMessageForChat, getMessagesByChatId } from '~~/layers/chat/server/repository/chat-repository';
import { createOpenAIModel, generateChatResponse } from '~~/layers/chat/server/services/ai-service';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { openaiApiKey } = useRuntimeConfig();

  const history = await getMessagesByChatId(id);

  const openai = createOpenAIModel(openaiApiKey);

  const reply = await generateChatResponse(openai, history);

  return createMessageForChat({
    chatId: id,
    content: reply,
    role: 'assistant',
  });
});
