<script lang="ts" setup>
import type { IChat, IProject } from '~~/layers/chat/app/types';
import type { NavigationMenuItem } from '@nuxt/ui';

defineProps<{ isOpen: boolean }>();

const route = useRoute();

const { chats, chatsInProject, createChatAndNavigate } = useChats();
const { projects, createProject } = useProjects();

const chatsInCurrentProject = computed(() => chatsInProject(route.params.projectId as string));

const chatsWithoutProject = computed(() => chats.value.filter((c) => c.projectId === undefined));

const chatsToday = filterChats(-1, 1);
const chatsLastWeek = filterChats(1, 7);
const chatsLastMonth = filterChats(7, 30);
const chatsOlder = filterChats(30);

const projectItems = computed(() => projects.value?.map(formatProjectItem) || [] );

const sideBarChats = computed(() => [
  { chats: chatsToday.value, title: 'Today' },
  { chats: chatsLastWeek.value, title: 'Last 7 days' },
  { chats: chatsLastMonth.value, title: 'Last 30 days' },
  { chats: chatsOlder.value, title: 'Older' },
]);

async function handleCreateProject() {
  const newProject = createProject();

  await createChatAndNavigate({ projectId: newProject.id });
}

function filterChats(startDays: number, endDays?: number) {
  return computed(() => {
    return filterChatsByDateRange(
      chatsWithoutProject.value,
      startDays,
      endDays,
    ).map(formatChatItem);
  });
}

function formatChatItem(chat: IChat): NavigationMenuItem {
  return {
    active: route.params.chatId === chat.id,
    label: chat.title || 'Untitled Chat',
    to: `/chats/${chat.id}`,
  };
}

function formatProjectChat(project: IProject, chat: IChat): NavigationMenuItem {
  return {
    active: route.params.chatId === chat.id,
    label: chat.title || 'Untitled Chat',
    to: `/projects/${project.id}/chats/${chat.id}`,
  };
}

function formatProjectItem(project: IProject): NavigationMenuItem {
  const isCurrent = isCurrentProject(project.id);

  const baseItem: NavigationMenuItem = {
    active: isCurrent,
    defaultOpen: isCurrent,
    label: project.name,
    to: `/projects/${project.id}`,
  };

  if (isCurrent) return { ...baseItem, children: chatsInCurrentProject.value.map((c) => formatProjectChat(project, c)) };

  return baseItem;
}

function isCurrentProject(id: string) {
  return id === route.params.projectId;
}
</script>

<template>
  <aside
    class="bg-(--ui-bg-muted) border-r border-r-(--ui-border) bottom-0 duration-300 fixed left-0 top-16 transition-transform w-64 z-40"
    :class="{ '-translate-x-full': !isOpen }"
  >
  <div class="overflow-y-auto p-4">
    <template v-if="projectItems.length > 0">
      <div class="border-(--ui-border) border-b mb-4 overflow-auto p-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="font-semibold text-sm text-(--ui-text-muted)">
            Projects
          </h2>
        </div>

        <UNavigationMenu
          :items="projectItems"
          class="mb-4 w-full"
          default-open
          orientation="vertical"
        />

        <UButton
          color="neutral"
          variant="soft"
          icon="i-heroicons-plus-small"
          class="mt-2 w-full"
          size="sm"
          @click="handleCreateProject"
        >
          New Project
        </UButton>
      </div>
    </template>

    <template v-if="chatsWithoutProject.length > 0">
        <template v-for="{ chats: sidebarChat, title } in sideBarChats" :key="title">
          <template v-if="sidebarChat.length > 0">
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <h2 class="font-semibold text-sm text-(--ui-text-muted)">
                  {{ title }}
                </h2>
              </div>

              <UNavigationMenu
                :items="sidebarChat"
                class="mb-4 w-full"
                default-open
                orientation="vertical"
              />
            </div>
          </template>
        </template>
      </template>

      <template v-else>
        <UAlert
          class="mt-2"
          color="neutral"
          description="Create a new chat to get started."
          title="No Chats"
          variant="soft"
        />
      </template>
    </div>
  </aside>
</template>
