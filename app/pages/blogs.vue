<template>
  <main
    id="blogs"
    class="min-h-100dvh color-primary-text noisy-background eased-theme-transition"
    font="f-paragraph-font"
  >
    <nav class="flex align-i-center just-c-space-between">
      <h1
        font="md:w-400 s-1.6rem md:s-1.8rem lg:s-1.8rem f-name-font"
        class="p-40-5p md:p-40-80 m-0 color-secondary"
      >
        <a class="color-secondary" href="/">Srira</a>'s
        <a class="color-secondary" href="/blogs">Blogs</a>
      </h1>
      <BlogThemeSwitcher />
    </nav>
    <NuxtPage v-if="blogName" />
    <div v-else class="flex just-c-center">
      <div class="flex column w-90p md:w-640 md:pt-24 relative">
        <BlogTitle
          v-for="blog in blogs"
          :key="blog.path"
          :blog="blog"
          :spacing="blog.dynamicSpacing"
          link
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const blogName = useRoute().params.slug;
const { data: rawBlogs } = await useAsyncData("blogs", () =>
  queryCollection("blogs").order("date", "DESC").all(),
);

const blogs = computed(() => {
  const list = rawBlogs.value;
  if (!list) return [];

  return list.map((blog, index) => {
    const nextBlog = list[index + 1];
    let spacing = 0;

    if (nextBlog) {
      const currentDate = new Date(blog.date);
      const nextDate = new Date(nextBlog.date);

      const diffTime = Math.abs(currentDate.getTime() - nextDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      spacing = Math.min(diffDays * 3, 250);
    }

    return {
      ...blog,
      dynamicSpacing: spacing,
    };
  });
});

if (!blogName) {
  useSeoMeta({
    title: "Srira's Blogs",
    ogTitle: "Srira's Blogs",
    description:
      "A collection of technical blog posts by Sriram V on web development, Ruby, Rails, and things learned along the way.",
    ogDescription:
      "A collection of technical blog posts by Sriram V on web development, Ruby, Rails, and things learned along the way.",
  });
}
</script>
