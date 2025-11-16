import { createOpenAIModel, generateChatTitle } from '~~/layers/chat/server/services/ai-service';
import { UpdateChatTitleSchema } from '~~/layers/chat/server/schemas';
import { updateChat } from '~~/layers/chat/server/repository/chat-repository';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { openaiApiKey } = useRuntimeConfig();

  const { success, data } = await readValidatedBody(event, UpdateChatTitleSchema.safeParse);

  if (!success) return 400;

  const model = createOpenAIModel(openaiApiKey);

  const title = await generateChatTitle(model, data.message);

  return updateChat(id, { title });
});
