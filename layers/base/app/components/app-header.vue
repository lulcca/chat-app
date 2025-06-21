<script lang="ts" setup>
defineEmits(['toggle-sidebar']);

const { title } = useAppConfig();

const { createChatAndNavigate } = useChats();
</script>

<template>
  <header class="bg-(--ui-bg-muted) border-b border-(--ui-border) fixed flex h-16 items-center justify-between left-0 px-4 right-0 top-0 z-50">
    <div class="flex gap-4 items-center">
      <UButton
        color="primary"
        icon="i-lucide-menu"
        variant="ghost"
        @click="$emit('toggle-sidebar')"
      />

      <UButton
        color="primary"
        icon="i-lucide-plus"
        variant="solid"
        @click="createChatAndNavigate()"
      >
        New Chat
      </UButton>
    </div>

    <div class="text-2xl font-semibold">
      {{ title }}
    </div>
  </header>
</template>
