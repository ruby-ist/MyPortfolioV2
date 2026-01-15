<template>
  <a
    class="flex column gap-12 pointer color-primary-text w-var-card-width"
    :class="{
      'absolute l-var-card-left-position t-var-card-top-position': !serverSide,
    }"
    :href="`/origami/${origamiInfo.picFolderName}`"
  >
    <ImageWithLoader
      :alt="origamiInfo.name"
      :src="`/origami/${origamiInfo.picFolderName}/pic_1.webp`"
      loading="lazy"
      class="w-100p aspect-ratio-var-image-aspect-ratio"
      border-class="bd-rad-15 md:bd-rad-23"
    />
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
    serverSide: {
      type: Boolean,
      default: false,
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
