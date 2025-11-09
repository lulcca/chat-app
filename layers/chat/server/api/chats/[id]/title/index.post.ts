import { createOpenAIModel, generateChatTitle } from '~~/layers/chat/server/services/ai-service';
import { updateChat } from '~~/layers/chat/server/repository/chat-repository';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { openaiApiKey } = useRuntimeConfig();

  const { message } = await readBody(event);

  const model = createOpenAIModel(openaiApiKey);

  const title = await generateChatTitle(model, message);

  return updateChat(id, { title });
});
