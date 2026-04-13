export async function createProject(data: { name: string, userId?: string }): Promise<IProject> {
  return await prisma.project.create({
    data: {
      name: data.name,
      userId: data.userId || '1',
    },
  });
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id },
  });
}

export async function getAllProjects(): Promise<IProject[]> {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
}

export async function getAllProjectsByUser(userId: string = '1'): Promise<IProject[]> {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    where: { userId },
  });
}

export async function getProjectById(id: string): Promise<IProject | null> {
  return await prisma.project.findFirst({
    where: { id },
  });
}

export async function updateProject(id: string, data: { name: string }): Promise<IProject | null> {
  return await prisma.project.update({
    data: {
      name: data.name,
      updatedAt: new Date(),
    },
    where: { id },
  });
}
