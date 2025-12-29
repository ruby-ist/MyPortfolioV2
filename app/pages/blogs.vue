<template>
  <main>
    <h1 font="s-1.8rem f-header-font" class="p-40-80 m-0 color-indigo">
      <a class="color-indigo" href="/">Srira</a>'s
      <a class="color-indigo" href="/blogs">Blogs</a>
    </h1>
    <NuxtPage v-if="blogName" />
    <div v-else class="flex just-c-center p-40">
      <div class="flex column gap-36 w-600">
        <BlogTitle v-for="blog in blogs" :key="blog.path" :blog="blog" link />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const blogName = useRoute().params.slug;
const { data: blogs } = await useAsyncData("blogs", () =>
  queryCollection("blogs").all(),
);
</script>
