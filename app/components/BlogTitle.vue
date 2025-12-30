<template>
  <div>
    <div class="mb-16 color-indigo">{{ blog.date }}</div>
    <a
      v-if="link"
      class="color-high-purple hover:color-purple"
      :href="blog.path"
    >
      <h1 class="m-0" font="f-thick-font s-1.6rem md:s-2rem w-400">
        {{ blog.title }}
      </h1>
    </a>
    <h2
      v-else
      class="color-high-purple m-0"
      font="f-thick-font s-1.6rem md:s-2rem  w-400"
    >
      {{ blog.title }}
    </h2>
    <div v-if="blog.tags" class="flex row gap-8 m-18-0">
      <span
        v-for="(tag, index) in blog.tags"
        :key="index"
        class="bg-color-light-blue color-high-purple p-4-12"
        border=" rad-6"
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
