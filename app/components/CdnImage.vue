<template>
  <img
    class="bg-color-primary-text"
    :src="cdnSrc"
    :alt="alt"
    :loading="loadingSafe"
    @error="switchToLocal"
  />
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    loading: {
      type: String,
      default: "eager",
    },
  },
  data: () => ({
    loaded: false,
  }),
  computed: {
    cdnSrc() {
      return `https://cdn.jsdelivr.net/gh/ruby-ist/MyPortfolioV2@main/public${this.src}`;
    },
    loadingSafe() {
      return this.loading as "eager" | "lazy";
    },
  },

  methods: {
    switchToLocal(event: Event) {
      (event.target as HTMLImageElement).src = this.src;
    },
  },
});
</script>
