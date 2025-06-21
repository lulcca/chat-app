<script setup lang="ts">
const route = useRoute();

const projectId = route.params.projectId as string;

const { createChatAndNavigate } = useChats();

const { project, updateProject } = useProject(projectId);

if (!project.value) await navigateTo('/', { replace: true });

const editedName = ref('');
const isEditing = ref(false);
const onChatPage = computed(() => route.params.chatId);

async function handleNewChat() {
  try {
    await createChatAndNavigate({ projectId });
  } catch (error) {
    console.error('Failed to create new chat: ', error);
  }
}

async function handleRename() {
  if (!editedName.value.trim() || !project.value) return;

  if (editedName.value.trim() === project.value.name) return;

  isEditing.value = false;

  try {
    await updateProject({ name: editedName.value.trim() });
  } catch (error) {
    console.error('Failed to rename project: ', error);
  }
}

function cancelEditing() {
  isEditing.value = false;
  editedName.value = '';
}

function startEditing() {
  if (!project.value || onChatPage.value) return;

  isEditing.value = true;
  editedName.value = project.value.name;
}
</script>

<template>
  <div class="h-[calc(100%-4rem)] p-4">
    <template v-if="project">
      <div class="border-b border-b-[color:var(--ui-border)] border-solid flex items-start justify-between mb-6 pb-4">
        <div class="header-left">
          <div class="flex gap-2 items-center">
            <template v-if="!isEditing">
              <h1
                class="flex font-bold gap-2 items-center text-2xl hover:*:opacity-1"
                :class="{ 'cursor-pointer': !onChatPage }"
                @click="startEditing"
              >
                {{ project.name }}

                <template v-if="!onChatPage">
                  <UIcon
                    class="duration-[0.2s] h-4 ml-1 opacity-0 transition-opacity w-4"
                    name="i-heroicons-pencil"
                  />
                </template>
              </h1>
            </template>

            <template v-else>
              <div class="flex gap-2 items-center">
                <UInput
                  v-model="editedName"
                  autofocus
                  class="font-normal h-auto min-w-[200px] pl-0 pr-2 py-1 text-2xl w-auto"
                  size="lg"
                  @keyup.enter="handleRename"
                  @keyup.esc="cancelEditing"
                />

                <div class="flex gap-1">
                  <UButton
                    color="neutral"
                    icon="i-heroicons-x-mark"
                    size="xs"
                    variant="soft"
                    @click="cancelEditing"
                  />

                  <UButton
                    color="primary"
                    icon="i-heroicons-check"
                    size="xs"
                    variant="soft"
                    @click="handleRename"
                  />
                </div>
              </div>
            </template>
          </div>

          <template v-if="onChatPage">
            <NuxtLink
              :to="`/projects/${projectId}`"
              class="flex items-center leading-4 mt-1 text-(--ui-text-muted) text-sm"
            >
              <UIcon
                class="mr-1"
                name="i-heroicons-arrow-left"
              />
              Back to Project
            </NuxtLink>
          </template>
        </div>

        <UButton
          color="primary"
          icon="i-heroicons-plus"
          @click="handleNewChat"
        >
          New Chat in Project
        </UButton>
      </div>
    </template>

    <NuxtPage />
  </div>
</template>
