<template>
  <main
    id="index"
    class="grid min-h-100vh lg:grid-columns-1fr-auto relative z-0 bg-color-main-background color-primary-text noisy-background"
    font="f-paragraph-font"
  >
    <div class="p-60px-10p-18p md:p-12p-16p-0 lg:p-20dvh-20p"><AboutMe /></div>
    <div class="grid place-i-center md:place-i-end"><IconsGrid /></div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    useSeoMeta({
      title: "Sriram V's Portfolio",
      ogTitle: "Srira's Portfolio",
      description:
        "I’m Sriram V, a backend developer building elegant systems, specializing in Ruby and Rails. I write technical blogs, build projects, explore Vue and Nuxt, and fold origami.",
      ogDescription:
        "I’m Sriram V, a backend developer building elegant systems, specializing in Ruby and Rails. I write technical blogs, build projects, explore Vue and Nuxt, and fold origami.",
    });
  },
});
</script>
