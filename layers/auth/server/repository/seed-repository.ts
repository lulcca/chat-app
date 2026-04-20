export async function seedDemoDataForUser(userId: string) {
  const existingChats = await prisma.chat.findMany({
    where: { userId },
  });

  if (existingChats.length > 0) {
    console.log(`User ${userId} already has ${existingChats.length} chats, skipping seed`);

    return;
  }

  const MOCK_MESSAGES = [
    {
      content: 'Hello, can you help me with my Nuxt.js project?',
      role: 'user' as const,
    },
    {
      content: 'Of course! I\'d be happy to help with your Nuxt.js project. What specific questions or issues do you have?',
      role: 'assistant' as const,
    },
  ];

  console.log(`🌱 Seeding demo data for user ${userId}`);

  const project = await prisma.project.create({
    data: {
      name: 'Nuxt Project',
      userId,
    },
  });

  console.log('✅ Created project:', project.name);

  const chat = await prisma.chat.create({
    data: {
      projectId: project.id,
      title: 'Nuxt.js project help',
      userId,
    },
  });

  console.log('✅ Created chat:', chat.title);

  for (const [index, messageData] of MOCK_MESSAGES.entries()) {
    const message = await prisma.message.create({
      data: {
        chatId: chat.id,
        content: messageData.content,
        role: messageData.role,
      },
    });

    console.log(`✅ Created message ${index + 1}:`, message.role);
  }

  const standaloneChat = await prisma.chat.create({
    data: {
      title: 'General Discussion',
      userId,
    },
  });

  await prisma.message.create({
    data: {
      chatId: standaloneChat.id,
      content: 'Hi there! This is a chat without a specific project.',
      role: 'user',
    },
  });

  await prisma.message.create({
    data: {
      chatId: standaloneChat.id,
      content: 'Hello! How can I help you today?',
      role: 'assistant',
    },
  });

  console.log('✅ Created standalone chat with messages');

  console.log('🎉 Demo data seeded successfully!');
}
