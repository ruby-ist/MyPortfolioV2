<script setup>
const slug = useRoute().params.slug;
const { data: blog } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blogs").path(`/blogs/${slug}`).first();
});
</script>

<template>
  <div class="flex just-c-center">
    <div class="w-600">
      <BlogTitle class="mb-48" :blog="blog" />
      <ContentRenderer class="[&_a]:color-black" :value="blog" />
    </div>
  </div>
</template>
