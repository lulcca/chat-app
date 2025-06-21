import type { IChat, IChatMessage, IProject } from '../types';

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
  createdAt: new Date(),
  id: '1',
  messages: [...MOCK_MESSAGES],
  projectId: '1',
  title: 'Chat-App Help',
  updatedAt: new Date(),
};

const MOCK_PROJECT: IProject = {
  id: '1',
  name: 'Nuxt Project',
};

export { MOCK_CHAT, MOCK_MESSAGES, MOCK_PROJECT };
