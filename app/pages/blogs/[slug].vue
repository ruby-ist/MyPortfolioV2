<script setup>
const slug = useRoute().params.slug;
const { data: blog } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blogs").path(`/blogs/${slug}`).first();
});
</script>

<template>
  <div class="flex just-c-center">
    <div class="w-90p md:w-600">
      <BlogTitle class="mb-32 md:mb-48" :blog="blog" />
      <ContentRenderer class="[&_p]:m-20-0 pb-80" :value="blog" />
    </div>
  </div>
</template>
