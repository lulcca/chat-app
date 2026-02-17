import { createMessageForChat, getMessagesByChatId } from '~~/layers/chat/server/repository/chat-repository';
import { createOpenAIModel, streamChatResponse } from '~~/layers/chat/server/services/ai-service';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { openaiApiKey } = useRuntimeConfig();

  const history = await getMessagesByChatId(id);

  const openai = createOpenAIModel(openaiApiKey);

  const stream = await streamChatResponse(openai, history);

  setResponseHeaders(event, {
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/html',
    'Transfer-Encoding': 'chunked',
  });

  let complete_response = '';

  const transform_stream = new TransformStream({
    async flush() {
      await createMessageForChat({
        chatId: id,
        content: complete_response,
        role: 'assistant',
      });
    },
    transform(chunk, controller) {
      complete_response += chunk;
      controller.enqueue(chunk);
    },
  });

  return stream.pipeThrough(transform_stream);
});
