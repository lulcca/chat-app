<script lang="ts" setup>

const emit = defineEmits<{
  close: [],
}>();

const props = defineProps<{
  chatId: string,
}>();

const { projects } = useProjects();

const { assignToProject } = useChat(props.chatId);

async function handleAssignToProject(projectId: string) {
  try {
    await assignToProject(projectId);

    await navigateTo(`/projects/${projectId}/chats/${props.chatId}`);
  } catch (error) {
    console.error('Failed to assign chat to project:', error);
  }
}
</script>

<template>
  <UModal
    open
    description="Choose a project to assign this chat to."
    title="Assign to Project"
    @update:open="emit('close')"
  >
    <template #body>
      <div class="space-y-2">
        <template v-for="project in projects" :key="project.id">
          <div
            :class="[
              'border border-[var(--ui-border)] cursor-pointer flex items-center p-3 rounded-lg space-x-3',
              'hover:bg-[var(--ui-bg-elevated)]',
            ]"
            @click="handleAssignToProject(project.id)"
          >
            <UIcon
              class="text-[var(--ui-text-dimmed)]"
              name="i-heroicons-folder"
            />

            <span class="font-medium text-[var(--ui-text)]">
              {{ project.name }}
            </span>
          </div>
        </template>

        <template v-if="!projects?.length">
          <div class="py-8 text-center">
            <UIcon
              name="i-heroicons-folder-plus"
              class="h-12 mx-auto text-[var(--ui-text-dimmed)] w-12"
            />

            <h3 class="font-medium mt-2 text-[var(--ui-text)] text-sm">
              No projects
            </h3>

            <p class="mt-1 text-[var(--ui-text-muted)] text-sm">
              Create a project first to assign chats to it.
            </p>
          </div>
        </template>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          color="neutral"
          variant="soft"
          @click="emit('close')"
        >
          Cancel
        </UButton>
      </div>
    </template>
  </UModal>
</template>
