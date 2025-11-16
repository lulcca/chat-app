import { v4 as uuidv4 } from 'uuid';

const projects_key = 'projects:all';

const storage = useStorage<IProject[]>('db');

async function getProjects(): Promise<IProject[]> {
  let projects = await storage.getItem(projects_key);

  if (projects === null) {
    projects = [MOCK_PROJECT];

    await saveProjects(projects);
  }

  return projects;
}

async function saveProjects(projects: IProject[]): Promise<void> {
  await storage.setItem(projects_key, projects);
}

export async function createProject(data: { name: string }): Promise<IProject> {
  const now = new Date();

  const new_project: IProject = {
    createdAt: now,
    id: uuidv4(),
    name: data.name || 'New Project',
    updatedAt: now,
  };

  const projects = await getProjects();

  projects.push(new_project);

  await saveProjects(projects);

  return new_project;
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects();

  const index = projects.findIndex(project => project.id === id);

  if (index !== -1) {
    projects.splice(index, 1);

    await saveProjects(projects);

    return true;
  }

  return false;
}

export async function getAllProjects(): Promise<IProject[]> {
  const projects = await getProjects();

  return [...projects].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export async function getProjectById(id: string): Promise<IProject | null> {
  const projects = await getProjects();

  return projects.find((p) => p.id === id) || null;
}

export async function updateProject(id: string, data: { name: string }): Promise<IProject | null> {
  const projects = await getProjects();

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

  await saveProjects(projects);

  return updated_project;
}
