export default function () {
  const projects = useState<IProject[]>('projects', () => []);

  const { data, execute, status } = useFetch<IProject[]>('/api/projects', {
    default: () => [],
    headers: useRequestHeaders(['cookie']),
    immediate: false,
  });

  async function fetchProjects() {
    if (status.value !== 'idle') return;
    await execute();
    projects.value = data.value || [];
  }

  async function createProject() {
    const project = await $fetch<IProject>('/api/projects', {
      body: {
        name: 'New Project',
      },
      headers: useRequestHeaders(['cookie']),
      method: 'POST',
    });

    projects.value.push(project);

    return project;
  }

  return {
    createProject,
    fetchProjects,
    projects,
  };
}
