export interface IChatMessage {
  content: string;
  id: string;
  role: 'user'|'assistant';
}

export interface IChat {
  createdAt: Date;
  id: string;
  messages: IChatMessage[];
  projectId?: string;
  title: string;
  updatedAt: Date;
}

export interface IProject {
  id: string;
  name: string;
}
