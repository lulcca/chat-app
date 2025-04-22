import type { IChat, IChatMessage } from '~/types';

const MOCK_MESSAGES: IChatMessage[] = [
  {
    content: 'Oie, poderia me ajudar?',
    id: '1',
    role: 'user',
  },
  {
    content: 'Com certeza! Qual o problema?',
    id: '2',
    role: 'assistant',
  },
];

const MOCK_CHAT: IChat = {
  id: '1',
  messages: [...MOCK_MESSAGES],
  title: 'Chat-App Help',
};

export { MOCK_CHAT, MOCK_MESSAGES };
