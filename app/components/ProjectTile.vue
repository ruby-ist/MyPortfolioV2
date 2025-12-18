<template>
  <div class="mb-60">
    <div class="flex just-c-space-between align-i-center mb-30">
      <h2 class="m-0">{{ project.title }}</h2>
      <button class="visit-btn p-10-32 pointer" border="none rad-10">
        <a :href="project.url" class="color-indigo" font="s-1.1rem"> Open </a>
      </button>
    </div>
    <ProjectImageCarousel :project="project" />
    <p class="m-0">
      {{ project.description }}
    </p>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
});
</script>

<style scoped>
.visit-btn {
  background: var(--high-purple) url("/noise.avif");
}
</style>
