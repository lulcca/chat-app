import type { IChat } from '~~/layers/chat/app/types';

export function filterChatsByDateRange(chats: IChat[], startDays: number, endDays?: number) {
  return chats
    .filter((chat) => {
      const date = new Date(chat.updatedAt);

      if (endDays === undefined) return !isWithinDays(date, startDays);

      return (!isWithinDays(date, startDays) && isWithinDays(date, endDays));
    })
    .sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
}

export function isWithinDays(date: Date, days: number) {
  const now = new Date();
  const timeAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return date >= timeAgo;
}
