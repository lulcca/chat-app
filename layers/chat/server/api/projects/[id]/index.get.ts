import { getProjectById } from '~~/layers/chat/server/repository/project-repository';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  return getProjectById(id);
});
