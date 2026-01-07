<template>
  <main
    id="blogs"
    class="min-h-100dvh bg-color-main-background color-primary-text noisy-background eased-theme-transition"
    font="f-paragraph-font"
  >
    <nav class="flex align-i-center just-c-space-between">
      <h1
        font="s-1.6rem md:s-1.8rem lg:s-1.8rem f-name-font"
        class="p-40-5p md:p-40-80 m-0 color-secondary"
      >
        <a class="color-secondary" href="/">Srira</a>'s
        <a class="color-secondary" href="/blogs">Blogs</a>
      </h1>
      <BlogThemeSwitcher />
    </nav>
    <NuxtPage v-if="blogName" />
    <div v-else class="flex just-c-center md:p-36-0">
      <div class="flex column gap-14 md:gap-36 w-90p md:w-600">
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

if (!blogName) {
  useSeoMeta({
    title: "Srira's Blogs",
    ogTitle: "Srira's Blogs",
  });
}
</script>
