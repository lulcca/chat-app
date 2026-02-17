export default function (projectId: string) {
  const { projects } = useProjects();

  const project = computed(() => projects.value.find((p) => p.id === projectId));

  function updateProjectInList(data: Partial<IProject>) {
    if(!project.value) return;

    projects.value = projects.value.map((p) => p.id === projectId ? { ...p, ...data } : p);
  }

  async function updateProject(updatedProject: Partial<IProject>) {
    if (!project.value) return;

    const original_project = { ...project.value };

    updateProjectInList(updatedProject);

    try {
      const response = await $fetch<IProject>(`/api/projects/${projectId}`, {
        body: {
          ...updatedProject,
        },
        method: 'PUT',
      });

      updateProjectInList(response);

      return response;
    } catch (error) {
      console.error('Error updating project:', error);

      updateProjectInList(original_project);
    }
  }

  return {
    project,
    updateProject,
  };
};
