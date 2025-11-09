import { v4 as uuidv4 } from 'uuid';

const MOCK_MESSAGES: IChatMessage[] = [
  {
    content: 'Oie, poderia me ajudar?',
    createdAt: new Date(),
    id: uuidv4(),
    role: 'user',
    updatedAt: new Date(),
  },
  {
    content: 'Com certeza! Qual o problema?',
    createdAt: new Date(),
    id: uuidv4(),
    role: 'assistant',
    updatedAt: new Date(),
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
  createdAt: new Date(),
  id: '1',
  name: 'Nuxt Project',
  updatedAt: new Date(),
};

export { MOCK_CHAT, MOCK_MESSAGES, MOCK_PROJECT };
