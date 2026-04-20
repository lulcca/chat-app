export async function createChat(data: { projectId?: string, title?: string, userId: string }): Promise<IChatWithMessages> {
  return await prisma.chat.create({
    data: {
      ...data,
    },
    include: {
      messages: true,
      project: true,
    },
  });
};

export async function createMessageForChat(data: { chatId: string, content: string, role: IMessageRole }): Promise<IMessage | null> {
  return await prisma.message.create({
    data: {
      chatId: data.chatId,
      content: data.content,
      role: data.role,
    },
  });
}

export async function deleteChat(id: string) {
  return await prisma.chat.deleteMany({
    where: { id },
  });
}

export async function getAllChats(): Promise<IChatWithMessages[]> {
  return await prisma.chat.findMany({
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
        take: 1,
      },
      project: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function getAllChatsByUser(userId: string): Promise<IChatWithMessages[]> {
  return await prisma.chat.findMany({
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
        take: 1,
      },
      project: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    where: { userId },
  });
}

export async function getChatByIdByUser(id: string, data: { userId: string }): Promise<IChatWithMessages | null> {
  return await prisma.chat.findFirst({
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
        take: 1,
      },
      project: true,
    },
    where: {
      id,
      userId: data.userId,
    },
  });
}

export async function getMessagesByChatId(chatId: string): Promise<IMessage[]> {
  return await prisma.message.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    where: { chatId },
  });
}

export async function updateChat(id: string, data: { projectId?: string, title?: string }): Promise<IChatWithMessages | null> {
  return await prisma.chat.update({
    data,
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      project: true,
    },
    where: { id },
  });
}
