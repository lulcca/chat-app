import { createOpenAIModel, generateChatResponse } from '../services/ai-service';

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event);

  const { openaiApiKey } = useRuntimeConfig();

  const model = createOpenAIModel(openaiApiKey);

  const response = await generateChatResponse(model, messages);

  return {
    content: response,
    id: messages.length.toString(),
    role: 'assistant',
  };
});
