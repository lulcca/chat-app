<script setup lang="ts">
const route = useRoute();

const { chatsInProject } = useChats();

const chats = computed(() => chatsInProject(route.params.projectId as string));
</script>

<template>
  <div>
    <template v-if="chats?.length">
      <div
        class="
          gap-4 grid
          grid-cols-1 xl:grid-cols-3
        "
      >
        <template v-for="chat in chats" :key="chat.id">
          <NuxtLink :to="`/projects/${route.params.projectId}/chats/${chat.id}`">
            <UCard class="h-full">
              <template #header>
                <h3 class="font-medium text-md">
                  {{ chat.title || 'Untitled Chat' }}
                </h3>
              </template>

              <template v-if="chat.messages?.length">
                <p class="line-clamp-2 text-(--ui-text-dimmed) text-sm">
                  {{ chat.messages[chat.messages.length - 1]?.content }}
                </p>
              </template>
            </UCard>
          </NuxtLink>
        </template>
      </div>
    </template>
  </div>
</template>
