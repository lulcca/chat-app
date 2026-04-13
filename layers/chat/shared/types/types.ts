import type {
  Prisma,
  Chat as PrismaChat,
  Message as PrismaMessage,
  MessageRole as PrismaMessageRole,
  Project as PrismaProject,
} from '@prisma/client';

export type IChat = PrismaChat;

export type IChatWithMessages = Prisma.ChatGetPayload<{
  include: {
    messages: true;
    project: true;
  }
}>;

export type IMessage = PrismaMessage;

export type IMessageRole = PrismaMessageRole;

export type IMessageWithChat = Prisma.MessageGetPayload<{
  include: {
    chat: true;
  }
}>;

export type IProject = PrismaProject;

export type IProjectWithChats = Prisma.ProjectGetPayload<{
  include: {
    chats: {
      include: {
        messages: true;
      }
    }
  }
}>;
