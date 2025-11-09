import { getAllProjects } from '~~/layers/chat/server/repository/project-repository';

export default defineEventHandler(async (_event) => {
  return getAllProjects();
});
