export default function (projectId: string) {
  const { projects } = useProjects();

  const project = computed(() => projects.value.find((p) => p.id === projectId));

  async function updateProject(updatedProject: Partial<IProject>) {
    if (!project.value) return;

    const response = await $fetch<IProject>(`/api/projects/${projectId}`, {
      body: {
        ...updatedProject,
      },
      method: 'PUT',
    });

    projects.value = projects.value.map((p) => p.id === projectId ? { ...p, ...response } : p);
  }

  return {
    project,
    updateProject,
  };
};
