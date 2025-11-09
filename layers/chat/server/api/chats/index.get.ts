import { getAllChats } from '~~/layers/chat/server/repository/chat-repository';

export default defineEventHandler(async (_event) => {
  return getAllChats();
});

