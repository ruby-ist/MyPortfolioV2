<template>
  <div class="flex just-c-center">
    <div class="w-90p md:w-600">
      <BlogTitle class="mb-32" :blog="blog" />
      <ContentRenderer class="[&_p]:m-20-0 pb-80" :value="blog" />
    </div>
  </div>
</template>

<script setup>
const slug = useRoute().params.slug;
const { data: blog } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blogs").path(`/blogs/${slug}`).first();
});
useSeoMeta({
  title: `${blog.value.title} | Blog by Sriram V`,
  description: blog.value.description,
  ogTitle: `${blog.value.title} | Blog by Sriram V`,
  ogDescription: blog.value.description,
});
</script>
