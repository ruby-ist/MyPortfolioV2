<template>
  <div class="relative aspect-ratio-var-image-aspect-ratio">
    <div
      ref="loader"
      class="backdrop-blur-20 w-100p h-100p noisy-background absolute"
      :class="borderClass"
    />
    <cdnImage
      ref="image"
      :src="src"
      :alt="alt"
      class="w-100p opacity-0 image-loaded-transition"
      :loading="loading"
      :class="borderClass"
      @image-load="hideLoader"
    />
  </div>
</template>

<script lang="ts">
import type CdnImage from "./CdnImage.vue";

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
    borderClass: {
      type: String,
      default: "",
    },
  },
  methods: {
    hideLoader() {
      if (!this.$refs.image || !this.$refs.loader) return;
      (
        (this.$refs.image as InstanceType<typeof CdnImage>).$el as HTMLElement
      ).classList.remove("opacity-0");
      (this.$refs.loader as HTMLElement).classList.add("opacity-0");
    },
  },
});
</script>
