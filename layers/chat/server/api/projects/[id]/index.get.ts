import { getProjectByIdByUser } from '#layers/chat/server/repository/project-repository';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const userId = await authenticatedUserId(event);

  const project = await getProjectByIdByUser(id, { userId });

  if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found' });

  return project;
});
