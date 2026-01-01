<template>
  <div>
    <button
      class="bg-color-main-background noisy-background h-36 md:h-32 w-36 md:w-32 grid place-i-center p-4 box-size-content-box strict:bd-b-0 pointer"
      border="1px solid color-scroll-button-border rad-25-25-0-0"
      @click="scrollToTop"
    >
      <IconsFastUpArrow />
    </button>
    <button
      class="bg-color-main-background noisy-background h-36 md:h-32 w-36 md:w-32 grid place-i-center p-4 box-size-content-box pointer"
      border="1px solid color-scroll-button-border rad-0-0-25-25"
      @click="scrollToBottom"
    >
      <IconsFastDownArrow />
    </button>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  methods: {
    scrollToTop() {
      document.body.scrollTop = 0;
    },

    scrollToBottom() {
      document.body.scrollTop = document.body.scrollHeight;
    },
  },
});
</script>
