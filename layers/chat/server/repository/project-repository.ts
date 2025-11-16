import { v4 as uuidv4 } from 'uuid';

const projects: IProject[] = [MOCK_PROJECT];

export async function createProject(data: { name: string }): Promise<IProject> {
  const now = new Date();

  const new_project: IProject = {
    createdAt: now,
    id: uuidv4(),
    name: data.name || 'New Project',
    updatedAt: now,
  };

  projects.push(new_project);

  return new_project;
}

export async function deleteProject(id: string): Promise<boolean> {
  const index = projects.findIndex(project => project.id === id);

  if (index !== -1) {
    projects.splice(index, 1);

    return true;
  }

  return false;
}

export async function updateProject(id: string, data: { name: string }): Promise<IProject | null> {
  const project_index = projects.findIndex(p => p.id === id);

  if (project_index === -1) return null;

  const project = projects[project_index];

  if (!project) return null;

  const updated_project: IProject = {
    createdAt: project.createdAt,
    id: project.id,
    name: data.name,
    updatedAt: new Date(),
  };

  projects[project_index] = updated_project;

  return updated_project;
}

export function getAllProjects(): IProject[] {
  return [...projects].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function getProjectById(id: string): IProject | null {
  return projects.find((p) => p.id === id) || null;
}
