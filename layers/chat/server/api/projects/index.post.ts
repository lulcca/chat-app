import { CreateProjectSchema } from '~~/layers/chat/server/schemas';
import { createProject } from '~~/layers/chat/server/repository/project-repository';

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(event, CreateProjectSchema.safeParse);

  if (!success) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

  return createProject(data);
});
