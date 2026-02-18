import { getProjectById, updateProject } from '~~/layers/chat/server/repository/project-repository';
import { UpdateProjectSchema } from '~~/layers/chat/server/schemas';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { success, data } = await readValidatedBody(event, UpdateProjectSchema.safeParse);

  const project = await getProjectById(id);

  if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found' });

  if (!success) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

  return updateProject(id, data);
});
