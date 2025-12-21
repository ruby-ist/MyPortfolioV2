<template>
  <div class="mb-60">
    <div class="flex just-c-space-between align-i-center mb-30">
      <h2 class="m-0">{{ project.title }}</h2>
      <a
        :href="project.url"
        class="color-indigo visit-btn p-10-32 pointer"
        border="none rad-10"
        font="w-400 s-1.1rem"
        target="_blank"
      >
        Visit
      </a>
    </div>
    <ProjectImageCarousel :project="project" />
    <div class="m-0">
      <p>
        <span>
          {{
            hideDescription
              ? project.description.substring(0, 440)
              : project.description
          }}
        </span>
        <a
          v-if="project.description.length > 440"
          ref="descriptionToggle"
          class="color-translucent-black pointer"
          font="s-1rem w-400"
          @click="hideDescription = !hideDescription"
        >
          {{ hideDescription ? "...Show more" : " Show less" }}
        </a>
      </p>
    </div>
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

  data: () => ({
    hideDescription: true,
  }),
});
</script>

<style scoped>
.visit-btn {
  background: var(--high-purple) url("/noise.avif");
}
</style>
