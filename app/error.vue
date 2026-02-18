<script lang="ts" setup>
const error = useError();

function handleError() {
  clearError({ redirect: '/' });
}
</script>

<template>
  <UContainer class="flex h-full items-center justify-center p-4">
    <UCard
      class="min-w-md"
      variant="soft"
    >
      <template #header>
        <h1 class="font-bold text-lg">
          Error - {{ error?.statusCode }}
        </h1>
      </template>

      <p>
        {{ error?.message }}
      </p>

      <UButton
        class="mt-4"
        color="primary"
        variant="soft"
        icon="i-heroicons-arrow-left"
        @click="handleError"
      >
        Go back home
      </UButton>
    </UCard>
  </UContainer>
</template>
