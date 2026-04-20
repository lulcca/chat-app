<script lang="ts" setup>
const { isAuthenticated, logout, userAvatar, userName } = useAuth();

const menuItems = computed(() => [
  {
    icon: 'i-lucide-user',
    label: userName.value,
    type: 'label' as const,
  },
  {
    type: 'separator' as const,
  },
  {
    icon: 'i-lucide-log-out',
    label: 'Sign out',
    onSelect: handleLogout,
  },
]);

async function handleLogin() {
  await navigateTo('/login');
}

async function handleLogout() {
  await logout();
}
</script>

<template>
  <template v-if="isAuthenticated">
    <UDropdownMenu :items="menuItems">
      <UAvatar
        :alt="userName"
        :src="userAvatar || undefined"
        class="cursor-pointer"
        size="sm"
      />
    </UDropdownMenu>
  </template>

  <template v-else>
    <UButton
      size="sm"
      variant="outline"
      @click="handleLogin"
    >
      Login
    </UButton>
  </template>
</template>
