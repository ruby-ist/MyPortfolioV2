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

  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &::-webkit-scrollbar {
    display: none;
  }
}

:root,
html {
  height: 100dvh;
  overflow: hidden;
}

body {
  height: 100dvh;
  overflow-y: auto;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}

* {
  -webkit-tap-highlight-color: transparent;
}

main {
  background: url("/noise.avif");
}

body#index {
  --beige: #f2e2b1;
  --brown: #7e6752;
  --medium-brown: #998267;
  --sea-green: #7fe9de;
  --beach: #d0f5be;
  --header-font: "Life Savers", serif;
  --paragraph-font: "Bellefair", serif;

  background: var(--beige);
  color: var(--brown);
}

body#origami {
  --medium-black: #1c1c1c;
  --header-font: "Life Savers", serif;
  --paragraph-font: "Wix Madefor Text", serif;
  --grey: #cccccc;
  --white: #fff;

  background: var(--medium-black);
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

  background: var(--black);
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

  background: var(--purple);
  color: var(--indigo);
  font-family: var(--paragraph-font);
}

body#blog {
  --text-color: #000;
  --main-background: #f0f3ff;
  --primary: #7752fe;
  --secondary: #190482;
  --tag-background: #c2d9ff;
  --tag-border: #c2d9ff;
  --pre-border: #190482;
  --pre-background: #c2d9ff82;
  --filename-background: #b8b5ff;
  --filename-color: #190482;
  --block-quote-border: #c2d9ff;
  --link-hover: #836fff;

  --header-font: "Life Savers", serif;
  --paragraph-font: "Wix Madefor Text", serif;
  --thick-font: "Tilt Warp", serif;
  --code-font: "JetBrains Mono", monospace;

  background: var(--main-background);
  color: var(--text-color);
  font-family: var(--paragraph-font);
}

html.dark body#blog {
  --text-color: #f0f3ff;
  --main-background: #1c1c1c;
  --primary: #836fff;
  --secondary: #c2d9ff;
  --tag-background: #141f32;
  --tag-border: #836fff;
  --pre-border: #343434;
  --pre-background: #141f3282;
  --filename-background: #000;
  --filename-color: #c2d9ff9c;
  --block-quote-border: #c2d9ff;
  --link-hover: #7752fe;
}

a {
  text-decoration: none;
}
</style>
