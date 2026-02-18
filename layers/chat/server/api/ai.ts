import { createOpenAIModel, generateChatResponse } from '../services/ai-service';
import { ChatMessageSchema } from '~~/layers/chat/server/schemas';

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(event, ChatMessageSchema.safeParse);

  if (!success) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

  const { messages } = data as { chatId: string, messages: IChatMessage[] };

  const { openaiApiKey } = useRuntimeConfig();

  const model = createOpenAIModel(openaiApiKey);

  const response = await generateChatResponse(model, messages);

  return {
    content: response,
    id: messages.length.toString(),
    role: 'assistant',
  };
});
