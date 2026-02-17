import type { LanguageModelV1, Message } from 'ai';
import { generateText, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export const createOpenAIModel = (apiKey: string) => {
  const openai = createOpenAI({ apiKey });
  return openai('gpt-4o-mini');
};

export async function generateChatResponse(model: LanguageModelV1, messages: Message[]) {
  if (!Array.isArray(messages) || messages.length === 0) throw new Error('Invalid messages format');

  const response = await generateText({ messages, model });

  return response.text.trim();
}

export async function generateChatTitle(model: LanguageModelV1, firstMessage: string) {
  const response = await generateText({
    messages: [
      {
        content: 'You are a helpful assistant that generates concise, descriptive titles for chat conversations. Generate a title that captures the essence of the first message in 3 short words or less.',
        role: 'system',
      },
      {
        content: firstMessage,
        role: 'user',
      },
    ],
    model,
  });

  return response.text.trim();
}

export async function streamChatResponse(model: LanguageModelV1, messages: Message[]) {
  if (!Array.isArray(messages) || messages.length === 0) throw new Error('Invalid messages format');

  return streamText({ messages, model }).textStream;
}
