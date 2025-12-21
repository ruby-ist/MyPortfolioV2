<template>
  <div class="pb-20" border-b="1px solid color-indigo">
    <a :href="gitHubRepo.url" target="_blank" class="color-indigo">
      <h2>{{ gitHubRepo.title }}</h2>
    </a>
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
