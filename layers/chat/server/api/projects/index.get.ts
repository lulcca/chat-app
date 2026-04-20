import { getAllProjectsByUser } from '#layers/chat/server/repository/project-repository';

export default defineEventHandler(async (event) => {
  const userId = await authenticatedUserId(event);

  return getAllProjectsByUser(userId);
});
