<template>
  <NuxtPage />
</template>

<style>
@import url("~/assets/css/colors.css");
@import url("~/assets/css/fonts.css");

:root,
html,
body {
  padding: 0;
  margin: 0;

  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

:root,
html {
  height: 100dvh;
  overflow: hidden;
}

body {
  height: 100dvh;
  overflow-y: auto;
}

* {
  -webkit-tap-highlight-color: transparent;
}

a {
  text-decoration: none;
}
</style>
