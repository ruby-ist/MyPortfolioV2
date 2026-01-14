<template>
  <a
    class="flex column gap-12 pointer color-primary-text w-var-card-width absolute l-var-card-left-position t-var-card-top-position"
    :href="`/origami/${origamiInfo.picFolderName}`"
  >
    <div class="relative w-100p aspect-ratio-var-image-aspect-ratio">
      <div
        ref="loader"
        class="backdrop-blur-20 w-100p h-100p noisy-background bd-rad-15 absolute"
      />
      <cdnImage
        ref="image"
        :src="`/origami/${origamiInfo.picFolderName}/pic_1.webp`"
        :alt="origamiInfo.name"
        class="w-100p bd-rad-15 md:bd-rad-23 lg:bd-rad-23 opacity-0 image-loaded-transition"
        loading="lazy"
        @image-load="hideLoader"
      />
    </div>
    <div class="flex column gap-7">
      <div class="flex align-i-center just-c-space-between">
        <h5 class="m-0" font="w-400">{{ origamiInfo.name }}</h5>
        <NuxtTime
          font="s-0.75rem"
          month="short"
          class="color-secondary-text"
          day="2-digit"
          year="numeric"
          :datetime="origamiInfo.date"
        />
      </div>
      <div
        font="s-0.75rem"
        class="color-secondary-text w-250 oflow-x-hidden ws-nowrap ellipsis"
      >
        {{ origamiInfo.author }}
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import type CdnImage from "./CdnImage.vue";

export default defineNuxtComponent({
  props: {
    origamiInfo: {
      type: Object as PropType<PositionedOrigami>,
      required: true,
    },
  },
  computed: {
    cardLeftPosition() {
      return `${this.origamiInfo.left}px`;
    },

    cardTopPosition() {
      return `${this.origamiInfo.top}px`;
    },

    imageAspectRatio() {
      return 1 / this.origamiInfo.heightWidthRatio;
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

<style scoped>
a {
  --card-left-position: v-bind(cardLeftPosition);
  --card-top-position: v-bind(cardTopPosition);
  --image-aspect-ratio: v-bind(imageAspectRatio);
}
</style>
