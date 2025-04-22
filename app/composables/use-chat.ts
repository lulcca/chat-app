import type { IChat, IChatMessage } from '~/types';
import { MOCK_CHAT } from '~/composables/mock-data';

export default function () {
  const chat = ref<IChat>(MOCK_CHAT);
  const messages = computed<IChatMessage[]>(() => chat.value.messages);

  function createMessage(message: string, role: IChatMessage['role']) {
    const id = messages.value.length.toString();

    return {
      content: message,
      id,
      role,
    };
  }

  async function sendMessage(message: string) {
    messages.value.push(createMessage(message, 'user'));

    const data = await $fetch<IChatMessage>('/api/ai', {
      body: { messages: messages.value },
      method: 'POST',
    });

    messages.value.push(data);
  }

  return {
    chat,
    messages,
    sendMessage,
  };
};
