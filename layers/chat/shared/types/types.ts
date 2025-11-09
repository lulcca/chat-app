export interface IChatMessage {
  content: string;
  createdAt: Date;
  id: string;
  role: 'user'|'assistant';
  updatedAt: Date;
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
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
}

export interface IProjectChat extends IChat {
  project: IProject | null;
}
