import type { LanguageModelV1, Message } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const createOpenAIModel = (apiKey: string) => {
  const openai = createOpenAI({ apiKey });
  return openai('gpt-4o-mini');
};

export async function generateChatResponse(model: LanguageModelV1, messages: Message[]) {
  if (!Array.isArray(messages) || messages.length === 0) throw new Error('Invalid messages format');

  const response = await generateText({ messages, model });

  return response.text.trim();
}
