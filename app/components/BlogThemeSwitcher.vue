<template>
  <ClientOnly fallback-tag="button">
    <button
      border="0.12rem solid color-theme-button rad-50"
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
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
};
</script>
