<script lang="ts" setup>
definePageMeta({ layout: false });

const { title } = useAppConfig();

const { createChatAndNavigate } = useChats();

async function handleCreateChat() {
  await createChatAndNavigate();
}
</script>

<template>
  <div class="bg-(--ui-bg) min-h-screen text-(--ui-text)">
    <UContainer class="bg-(--ui-bg) py-10">
      <div
        :class="[
          'gap-8 grid place-items-center',
          'grid-cols-1 lg:grid-cols-2',
        ]"
      >
        <div class="flex flex-col gap-6">
          <h1 class="font-extrabold text-5xl text-(--ui-text-highlighted) text-left tracking-tight">
            {{ title }}
          </h1>

          <p class="leading-relaxed text-(--ui-text-muted) text-lg">
            Our chat platform revolutionizes how you interact with AI. Whether you're seeking information, brainstorming ideas, or having casual conversations, we provide an intuitive and powerful experience.
          </p>

          <div class="flex flex-col gap-4">
            <div class="flex gap-3 items-center">
              <UIcon
                class="text-[1.25rem] text-(--ui-primary)"
                name="i-heroicons-check-circle"
              />

              <span>
                Instant AI responses
              </span>
            </div>

            <div class="flex gap-3 items-center">
              <UIcon
                class="text-[1.25rem] text-(--ui-primary)"
                name="i-heroicons-check-circle"
              />

              <span>
                Natural conversation flow
              </span>
            </div>

            <div class="flex gap-3 items-center">
              <UIcon
                class="text-[1.25rem] text-(--ui-primary)"
                name="i-heroicons-check-circle"
              />

              <span>
                24/7 availability
              </span>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <NuxtImg
            alt="Communication Benefits"
            class="h-auto max-w-[500px] rounded-2xl w-full"
            densities="x1"
            height="500"
            src="/people.png"
            width="500"
          />
        </div>
      </div>
    </UContainer>

    <UContainer class="bg-transparent py-10">
      <div class="bg-(--ui-bg-muted) mx-4 p-8 rounded-[2rem]">
        <div class="text-center">
          <h2 class="font-bold mb-4 text-4xl text-(--ui-text-highlighted)">
            Ready to Get Started?
          </h2>

          <p class="mb-8 text-(--ui-text-muted) text-lg">
            Join thousands of users who are already experiencing the future of AI conversation.
          </p>

          <UButton
            class="px-8 py-4"
            size="xl"
            variant="outline"
            @click="handleCreateChat"
          >
            Create A New Chat
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
