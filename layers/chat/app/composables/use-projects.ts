export default function () {
  const projects = useState<IProject[]>('projects', () => [MOCK_PROJECT]);

  function createProject() {
    const id = (projects.value.length + 1).toString();

    const project = {
      createdAt: new Date(),
      id,
      name: 'New Project',
      updatedAt: new Date(),
    };

    projects.value.push(project);

    return project;
  }

  return {
    createProject,
    projects,
  };
}
