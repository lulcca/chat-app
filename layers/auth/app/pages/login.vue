<script lang="ts" setup>
definePageMeta({ layout: false });

const appConfig = useAppConfig();

const { isAuthenticated } = useAuth();

if (isAuthenticated.value) await navigateTo('/', { replace: true });

const isLoading = ref(false);

async function handleGitHubLogin() {
  isLoading.value = true;

  await navigateTo('/auth/github', { external: true });
}

useHead({ title: `Login - ${appConfig.title}` });
</script>

<template>
  <div class="bg-(--ui-bg-base) flex items-center justify-center min-h-screen p-4">
    <UCard class="max-w-[400px] w-full">
      <template #header>
        <div class="text-center">
          <h1 class="font-bold text-2xl">
            Welcome to {{ appConfig.title }}
          </h1>

          <p class="mt-2 text-gray-500">
            Sign in to continue to your chats
          </p>
        </div>
      </template>

      <div class="py-4">
        <UButton
          :icon="isLoading ? 'i-heroicons-arrow-path' : 'i-simple-icons-github'"
          :disabled="isLoading"
          :loading="isLoading"
          block
          color="neutral"
          size="lg"
          variant="outline"
          @click="handleGitHubLogin"
        >
          {{ isLoading ? 'Signing you in...' : 'Continue with GitHub' }}
        </UButton>
      </div>
    </UCard>
  </div>
</template>
