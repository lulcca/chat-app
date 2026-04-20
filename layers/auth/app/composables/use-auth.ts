export default function () {
  const { clear, fetch, loggedIn, session, user } = useUserSession();

  const isAuthenticated = computed(() => loggedIn.value && session.value?.databaseUserId !== undefined);

  const userAvatar = computed(() => (user.value as IGithubUser)?.avatar ?? null);
  const userEmail = computed(() => (user.value as IGithubUser)?.email ?? null);
  const userName = computed(() => (user.value as IGithubUser)?.name ?? 'User');

  async function logout() {
    await clear();
    await navigateTo('/login');
  }

  return {
    isAuthenticated,
    logout,
    refresh: fetch,
    session: readonly(session),
    user: readonly(user),
    userAvatar,
    userEmail,
    userName,
  };
}
