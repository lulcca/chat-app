<script lang="ts" setup>
const { fetchChats, preFetchChatMessages } = useChats();
const { fetchProjects } = useProjects();

await Promise.all([fetchChats(), fetchProjects()]);

await callOnce(preFetchChatMessages);
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
