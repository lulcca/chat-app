export async function createUserFromGitHub(githubUser: IGithubUser) {
  return await prisma.user.create({
    data: {
      email: githubUser.email,
      name: githubUser.name || githubUser.login,
      provider: 'github',
      providerId: String(githubUser.id),
    },
  });
}

export async function findOrCreateUser(githubUser: IGithubUser) {
  const providerId = String(githubUser.id);

  let user = await findUserByProviderId(providerId);

  if (!user) user = await createUserFromGitHub(githubUser);

  return user;
}

export async function findUserByProviderId(providerId: string) {
  return await prisma.user.findUnique({
    where: { providerId },
  });
}
