<template>
  <div>
    <div class="mb-16 color-secondary" font="s-0.9rem md:s-1rem">
      {{ blog.date }}
    </div>
    <a
      v-if="link"
      class="color-primary hover:color-link-hover"
      :href="blog.path"
    >
      <h1 class="m-0" font="f-header-font s-1.6rem md:s-2rem w-400">
        {{ blog.title }}
      </h1>
    </a>
    <h2
      v-else
      class="color-primary m-0"
      font="f-header-font s-1.6rem md:s-2rem  w-400"
    >
      {{ blog.title }}
    </h2>
    <div v-if="blog.tags" class="flex row gap-8 m-18-0">
      <span
        v-for="(tag, index) in blog.tags"
        :key="index"
        class="bg-color-tag-background color-tag p-3-11"
        border="1px solid color-tag-border rad-6"
        font="s-0.8rem"
      >
        {{ tag }}
      </span>
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
  },
});
</script>
