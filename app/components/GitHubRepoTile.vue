<template>
  <div class="mb-26" border-b="1px solid color-primary-text">
    <div class="h-44 flex just-c-space-between align-i-center">
      <div class="flex column gap-4">
        <a :href="gitHubRepo.url" target="_blank" class="color-primary-text">
          <h2 class="m-0" font="f-header-font w-400">
            {{ gitHubRepo.title }}
          </h2>
        </a>
        <div font="s-0.8rem">{{ gitHubRepo.publishedMonth }}</div>
      </div>
      <a
        :href="gitHubRepo.publishedLink"
        target="_blank"
        :aria-label="`Rubygems link for ${gitHubRepo.title}`"
        class="color-primary-text"
      >
        <IconsRubygems
          v-if="gitHubRepo.publishedAt === 'rubygems'"
          class="w-24"
        />
      </a>
    </div>
    <p class="m-18-0-28">{{ gitHubRepo.description }}</p>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    gitHubRepo: {
      type: Object as PropType<GitHubRepo>,
      required: true,
    },
  },
});
</script>
