import { createChat, getAllChatsByUser } from '#layers/chat/server/repository/chat-repository';
import { findOrCreateUser } from '#layers/auth/server/repository/user-repository';

export default defineOAuthGitHubEventHandler({
  config: { emailRequired: true },
  onError(event, error) {
    console.error('GitHub OAuth error:', error);

    return sendRedirect(event, '/');
  },
  async onSuccess(event, { user }) {
    if (!user.email) throw createError({ statusCode: 400, statusMessage: 'Email is required' });

    const githubUser: IGithubUser = {
      avatar: user.avatar_url,
      email: user.email,
      id: user.id,
      login: user.login,
      name: user.name,
    };

    const dbUser = await findOrCreateUser(githubUser);

    await setUserSession(event, {
      databaseUserId: dbUser.id,
      loggedInAt: new Date(),
      user: {
        avatar: user.avatar_url,
        email: user.email,
        id: user.id,
        login: user.login,
        name: user.name || user.login,
      },
    });

    const redirectUrl = await getRedirectUrl(dbUser.id);

    console.log('redirectUrl', redirectUrl);

    return sendRedirect(event, redirectUrl);
  },
});

async function getRedirectUrl(userId: string): Promise<string> {
  try {
    // const chats = await getAllChats();
    const chats = await getAllChatsByUser(userId);

    if (chats.length > 0) {
      const mostRecentChat = chats[0]!;

      return mostRecentChat.project ? `/projects/${mostRecentChat.project.id}/chats/${mostRecentChat.id}` : `/chats/${mostRecentChat.id}`;
    }

    const newChat = await createChat({
      title: 'New Chat',
      userId,
    });

    return `/chats/${newChat.id}`;
  } catch (error) {
    console.error('Error getting/creating chat:', error);

    return '/';
  }
}
