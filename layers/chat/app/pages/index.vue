<script lang="ts" setup>
const { title } = useAppConfig();

const { createChatAndNavigate } = useChats();
</script>

<template>
  <UContainer class="flex flex-col h-screen items-center justify-center">
    <h1 class="font-bold text-4xl">
      {{ title }}
    </h1>

    <UButton
      class="mt-4"
      @click="createChatAndNavigate()"
    >
      Start Chat
    </UButton>
  </UContainer>
</template>
