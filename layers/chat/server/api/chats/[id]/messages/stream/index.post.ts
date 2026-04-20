import { createMessageForChat, getChatByIdByUser, getMessagesByChatId } from '#layers/chat/server/repository/chat-repository';
import { createOpenAIModel, streamChatResponse } from '#layers/chat/server/services/ai-service';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const userId = await authenticatedUserId(event);

  const chat = await getChatByIdByUser(id, { userId });

  if (!chat) throw createError({ statusCode: 404, statusMessage: 'Chat not found' });

  const history = await getMessagesByChatId(id);

  const { openaiApiKey } = useRuntimeConfig();

  const openai = createOpenAIModel(openaiApiKey);

  const stream = await streamChatResponse(openai, history);

  setResponseHeaders(event, {
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/html',
    'Transfer-Encoding': 'chunked',
  });

  let completeResponse = '';

  const transform_stream = new TransformStream({
    async flush() {
      await createMessageForChat({
        chatId: id,
        content: completeResponse,
        role: 'assistant',
      });
    },
    transform(chunk, controller) {
      completeResponse += chunk;
      controller.enqueue(chunk);
    },
  });

  return stream.pipeThrough(transform_stream);
});
