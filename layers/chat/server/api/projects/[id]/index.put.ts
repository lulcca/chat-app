import { getProjectById, updateProject } from '~~/layers/chat/server/repository/project-repository';
import { UpdateProjectSchema } from '~~/layers/chat/server/schemas';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { success, data } = await readValidatedBody(event, UpdateProjectSchema.safeParse);

  const project = await getProjectById(id);

  if (!project) return 404;

  if (!success) return 400;

  return updateProject(id, data);
});
