import { createChat } from '~~/layers/chat/server/repository/chat-repository';

export default defineEventHandler(async (event) => {
  const { projectId, title } = await readBody(event);

  return createChat({ projectId, title });
});
