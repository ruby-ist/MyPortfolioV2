<template>
  <main class="min-h-100dvh">
    <nav class="flex align-i-center just-c-space-between">
      <h1
        font="s-1.6rem md:s-1.8rem lg:s-1.8rem f-header-font"
        class="p-40-5p md:p-40-80 m-0 color-secondary"
      >
        <a class="color-secondary" href="/">Srira</a>'s
        <a class="color-secondary" href="/blogs">Blogs</a>
      </h1>
      <ClientOnly fallback-tag="button">
        <button
          border="0.12rem solid color-primary rad-50"
          class="p-4 h-16 mr-5p md:mr-80 no-bg box-size-content-box pointer"
          @click="toggleTheme"
        >
          <IconsSun
            class="w-16"
            :class="{ hidden: colorMode.preference == 'dark' }"
          />
          <IconsMoon
            class="w-16"
            :class="{ hidden: colorMode.preference == 'light' }"
          />
        </button>
        <template #fallback>
          <button
            border="0.12rem solid color-primary rad-50"
            class="p-4 h-16 mr-5p w-32 md:mr-80 no-bg box-size-content-box pointer"
            @click="toggleTheme"
          />
        </template>
      </ClientOnly>
    </nav>
    <NuxtPage v-if="blogName" />
    <div v-else class="flex just-c-center md:p-40">
      <div class="flex column gap-14 md:gap-36 w-90p md:w-600">
        <BlogTitle v-for="blog in blogs" :key="blog.path" :blog="blog" link />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const blogName = useRoute().params.slug;
const colorMode = useColorMode();

const { data: blogs } = await useAsyncData("blogs", () =>
  queryCollection("blogs").all(),
);

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
};
</script>
