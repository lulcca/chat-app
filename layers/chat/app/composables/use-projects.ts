import type { IProject } from '../types';
import { MOCK_PROJECT } from '../composables/mock-data';

export default function () {
  const projects = useState<IProject[]>('projects', () => [MOCK_PROJECT]);

  function createProject() {
    const id = (projects.value.length + 1).toString();

    const project = {
      id,
      name: 'New Project',
    };

    projects.value.push(project);

    return project;
  }

  return {
    createProject,
    projects,
  };
}
