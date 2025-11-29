<template>
  <NuxtPage />
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    const theme = useRoute().path.startsWith("/origami") ? "origami" : "index";
    useHead({
      bodyAttrs: {
        id: theme,
      },
    });
  },
});
</script>

<style>
:root,
html,
body {
  padding: 0;
  margin: 0;
}

body#index {
  --beige: #f2e2b1;
  --brown: #7e6752;
  --medium-brown: #998267;
  --sea-green: #7fe9de;
  --beach: #d0f5be;
  --header-font: "Life Savers", serif;
  --paragraph-font: "Bellefair", serif;

  background: var(--beige) url("/noise.avif");
  color: var(--brown);
}

body#origami {
  --medium-black: #1c1c1c;
  --header-font: "Life Savers", serif;
  --paragraph-font: "Wix Madefor Text", serif;

  background: var(--medium-black) url("/noise.avif");
  color: white;
  font-family: var(--paragraph-font);
}

a {
  text-decoration: none;
}
</style>
