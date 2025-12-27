<template>
  <NuxtPage />
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    const route = useRoute();
    let theme = "index";
    switch (true) {
      case /^\/origami\/\w+(\/)?/.test(route.path):
        theme = "origami-show";
        break;
      case route.path.startsWith("/origami"):
        theme = "origami";
        break;
      case route.path.startsWith("/projects"):
        theme = "project";
        break;
      case route.path.startsWith("/blogs"):
        theme = "blog";
        break;
      default:
        theme = "index";
    }
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

  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
}

* {
  -webkit-tap-highlight-color: transparent;
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
  --grey: #cccccc;
  --white: #fff;

  background: var(--medium-black) url("/noise.avif");
  color: white;
  font-family: var(--paragraph-font);
}

body#origami-show {
  --black: #000;
  --medium-black: #1c1c1c;
  --transparent-black: #1c1c1c36;
  --translucent-black: #1c1c1c72;
  --header-font: "Life Savers", serif;
  --paragraph-font: "Wix Madefor Text", serif;
  --grey: #cccccc;
  --white: #fff;

  background: var(--black) url("/noise.avif");
  color: white;
  font-family: var(--paragraph-font);
}

body#project {
  --purple: #8b93ff;
  --indigo: #1c1678;
  --high-purple: #7752fe;
  --transparent-black: #1c1c1c36;
  --translucent-black: #1c1c1c72;

  --header-font: "Life Savers", serif;
  --paragraph-font: "Wix Madefor Text", serif;
  --thick-font: "Tilt Warp", serif;

  background: var(--purple) url("/noise.avif");
  color: var(--indigo);
  font-family: var(--paragraph-font);
}

body#blog {
  --white: #f0f3ff;
  --purple: #836fff;
  --indigo: #190482;
  --high-purple: #7752fe;
  --transparent-black: #1c1c1c36;
  --translucent-black: #1c1c1c72;

  --header-font: "Life Savers", serif;
  --paragraph-font: "Wix Madefor Text", serif;
  --thick-font: "Tilt Warp", serif;

  background: var(--white) url("/noise.avif");
  color: var(--indigo);
  font-family: var(--paragraph-font);
}

a {
  text-decoration: none;
}
</style>
