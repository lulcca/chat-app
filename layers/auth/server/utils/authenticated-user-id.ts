import type { H3Event } from 'h3';

export default async function (event: H3Event): Promise<string> {
  const session = await requireUserSession(event);

  if (!session.databaseUserId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  return session.databaseUserId as string;
}
