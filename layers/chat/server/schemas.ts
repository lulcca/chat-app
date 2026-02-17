import { z } from 'zod';

const MessageRole = z.enum(['assistant', 'user']);

export const MessageSchema = z
  .object({
    chatId: z.uuid().optional(),
    content: z.string(),
    id: z.uuid().optional(),
    role: MessageRole,
  })
  .strict();

export const ChatMessageSchema = z
  .object({
    chatId: z.uuid(),
    messages: z.array(MessageSchema),
  })
  .strict();

export const CreateChatSchema = z
  .object({
    projectId: z.uuid().optional(),
    title: z.string().min(1).optional(),
  })
  .strict();

export const CreateMessageSchema = z
  .object({
    content: z.string().min(1),
    role: MessageRole,
  })
  .strict();

export const CreateProjectSchema = z
  .object({
    name: z.string().min(1),
  })
  .strict();

export const UpdateChatSchema = z
  .object({
    projectId: z.uuid(),
  })
  .strict();

export const UpdateChatTitleSchema = z
  .object({
    message: z.string().min(1),
  })
  .strict();

export const UpdateProjectSchema = z
  .object({
    name: z.string().min(1),
  })
  .strict();
