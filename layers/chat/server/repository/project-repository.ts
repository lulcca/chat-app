export async function createProject(data: { name: string, userId: string }): Promise<IProject> {
  return await prisma.project.create({
    data: {
      name: data.name,
      userId: data.userId,
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

export async function getAllProjectsByUser(userId: string): Promise<IProject[]> {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    where: { userId },
  });
}

export async function getProjectByIdByUser(id: string, data: { userId: string }): Promise<IProject | null> {
  return await prisma.project.findFirst({
    where: {
      id,
      userId: data.userId,
    },
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
