<template>
  <div class="pb-20" border-b="1px solid color-primary-text">
    <div class="flex just-c-space-between align-i-center">
      <a :href="gitHubRepo.url" target="_blank" class="color-primary-text">
        <h2 font="f-header-font w-400">{{ gitHubRepo.title }}</h2>
      </a>
      <a
        :href="gitHubRepo.publishedLink"
        target="_blank"
        class="color-primary-text"
      >
        <IconsRubygems
          v-if="gitHubRepo.publishedAt === 'rubygems'"
          class="w-24"
        />
      </a>
    </div>
    <p>{{ gitHubRepo.description }}</p>
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
