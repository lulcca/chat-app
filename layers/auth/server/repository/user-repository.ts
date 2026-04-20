import { seedDemoDataForUser } from '#layers/auth/server/repository/seed-repository';

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

  if (!user) {
    user = await createUserFromGitHub(githubUser);

    try {
      await seedDemoDataForUser(user.id);
    } catch (error) {
      console.error('Could not seed demo data for user:', error);
    }
  }

  return user;
}

export async function findUserByProviderId(providerId: string) {
  return await prisma.user.findUnique({
    where: { providerId },
  });
}
