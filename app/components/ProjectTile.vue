<template>
  <div class="mb-60">
    <div class="flex just-c-space-between align-i-center mb-30">
      <h2 class="m-0">{{ project.title }}</h2>
      <button class="visit-btn p-10-32 pointer" border="none rad-10">
        <a :href="project.url" class="color-indigo" font="s-1.1rem"> Open </a>
      </button>
    </div>
    <div class="flex just-c-space-between">
      <img
        :src="`/projects/${project.name}/pic_1.webp`"
        alt="geobits screenshot"
        :class="project.type === 'mobile' ? 'w-30p' : 'w-100p'"
        border="rad-18"
      />
      <img
        v-if="project.type === 'mobile'"
        :src="`/projects/${project.name}/pic_2.webp`"
        alt="geobits screenshot"
        class="w-30p"
        border="rad-18"
      />
      <img
        v-if="project.type === 'mobile'"
        :src="`/projects/${project.name}/pic_3.webp`"
        alt="geobits screenshot"
        class="w-30p"
        border="rad-18"
      />
    </div>
    <p font="w-100p">
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
  background: #7752fe url("/noise.avif");
}
</style>
