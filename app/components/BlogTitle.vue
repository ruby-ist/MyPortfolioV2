<template>
  <div :class="{ 'md:flex row': link }">
    <div
      class="mb-16 color-secondary min-w-86"
      :class="{ 'md:mt-6': link }"
      font="s-0.9rem"
    >
      {{ toLocaleDate(blog.date) }}
    </div>
    <div class="no-display" :class="{ 'md:flex column align-i-center': link }">
      <IconsShuriken class="h-28 m-0-16" />
      <div
        class="h-[calc(100%-28px)] w-0"
        border="0.05em solid color-timeline-border"
      />
    </div>
    <div :style="{ marginBottom: link ? spacing + 'px' : '0px' }">
      <a
        v-if="link"
        class="color-primary hover:color-link-hover"
        :href="blog.path"
      >
        <h1 class="m-0" font="f-header-font s-1.6rem w-400">
          {{ blog.title }}
        </h1>
      </a>
      <h2
        v-else
        class="color-primary m-0"
        font="f-header-font s-1.6rem md:s-1.9rem w-400"
      >
        {{ blog.title }}
      </h2>
      <div v-if="blog.tags" class="flex row gap-8 m-18-0">
        <span
          v-for="(tag, index) in blog.tags"
          :key="index"
          class="bg-color-tag-background color-tag p-3-11"
          border="1px solid color-tag-border rad-6"
          font="s-0.8rem md:s-0.7rem"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    blog: {
      type: Object as PropType<BlogsCollectionItem>,
      required: true,
    },
    link: {
      type: Boolean,
      default: false,
    },
    spacing: {
      type: Number,
      default: 0,
    },
  },
});
</script>
