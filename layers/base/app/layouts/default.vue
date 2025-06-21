<script lang="ts" setup>
const isSidebarOpen = ref(true);
</script>

<template>
  <div class="h-[calc(100vh-4rem)] bg-(--ui-background)">
    <AppHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen"/>

    <AppSidebar :is-open="isSidebarOpen" />

    <main
      class="duration-300 ease-in-out h-full mt-16 transition-all"
      :class="{ 'ml-64': isSidebarOpen }"
    >
      <slot />
    </main>
  </div>
</template>
