<template>
  <div>
    <button
      style="background-image: url(&quot;/noise.avif&quot;)"
      class="bg-color-medium-black h-32 w-32 color-white grid place-i-center p-4 box-size-content-box strict:bd-b-0 pointer"
      border="1px solid color-dark-grey rad-25-25-0-0"
      @click="scrollToTop"
    >
      <IconsFastUpArrow />
    </button>
    <button
      style="background-image: url(&quot;/noise.avif&quot;)"
      class="bg-color-medium-black h-32 w-32 color-white grid place-i-center p-4 box-size-content-box pointer"
      border="1px solid color-dark-grey rad-0-0-25-25"
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
