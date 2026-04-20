import { getProjectByIdByUser, updateProject } from '#layers/chat/server/repository/project-repository';
import { UpdateProjectSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const userId = await authenticatedUserId(event);

  const project = await getProjectByIdByUser(id, { userId });

  if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found' });

  const { success, data } = await readValidatedBody(event, UpdateProjectSchema.safeParse);

  if (!success) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

  return updateProject(id, data);
});
