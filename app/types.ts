export interface IChatMessage {
  content: string;
  id: string;
  role: 'user'|'assistant';
}

export interface IChat {
  id: string;
  messages: IChatMessage[];
  title: string;
}
