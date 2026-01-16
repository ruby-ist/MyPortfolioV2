<template>
  <ClientOnly fallback-tag="div">
    <div class="relative">
      <swiper-container
        id="origami-swiper"
        ref="swiper"
        :slides-per-view="1"
        :space-between="28"
        :pagination="paginatable"
        :pagination-clickable="paginatable"
        :loop="paginatable"
        pagination-el="#origami-pagination"
        class="w-320 md:w-480 relative -mb-4 md:-mb-4 lg:mb-0"
      >
        <swiper-slide
          v-for="index in Array.from(Array(origamiInfo.imagesCount).keys())"
          :key="index"
        >
          <ImageWithLoader
            :src="`/origami/${origamiInfo.picFolderName}/pic_${index + 1}.webp`"
            :alt="`${origamiInfo.picFolderName}_pic_${index + 1}`"
            class="w-100p aspect-ratio-var-swiper-slide-aspect-ratio"
            border-class="bd-rad-20-20-0-0 lg:bd-rad-15"
          />
        </swiper-slide>
      </swiper-container>
      <div
        v-if="paginatable"
        class="flex just-c-center align-i-center gap-24 absolute w-320 md:w-480 lg:-b-50px b-6p z-1"
      >
        <button
          class="no-display md:block no-bg border-none"
          aria-label="Swipe Left"
          @click="swiperEl.prev()"
        >
          <IconsLeftArrow class="w-16" />
        </button>
        <div
          id="origami-pagination"
          :class="
            'flex just-c-center gap-10 ' +
            '[&>.swiper-pagination-bullet-active]:w-8 ' +
            '[&>.swiper-pagination-bullet-active]:h-8 ' +
            '[&>.swiper-pagination-bullet]:bg-color-carousel-pagination-bullet ' +
            'strict:[&>.swiper-pagination-bullet-active]:bg-color-carousel-active-pagination-bullet ' +
            '[&>.swiper-pagination-bullet]:w-7 ' +
            '[&>.swiper-pagination-bullet]:h-7 ' +
            '[&>.swiper-pagination-bullet]:border-rad-25'
          "
        />
        <button
          class="no-display md:block no-bg border-none"
          aria-label="Swipe Right"
          @click="swiperEl.next()"
        >
          <IconsRightArrow class="w-16" />
        </button>
      </div>
    </div>
    <template #fallback>
      <div>
        <ImageWithLoader
          v-for="index in Array.from(Array(origamiInfo.imagesCount).keys())"
          :key="index"
          :src="`/origami/${origamiInfo.picFolderName}/pic_${index + 1}.webp`"
          :alt="`${origamiInfo.picFolderName}_pic_${index + 1}`"
          border-class="bd-rad-20-20-0-0 lg:bd-rad-15"
          class="w-100p aspect-ratio-var-swiper-slide-aspect-ratio"
          :class="{ 'no-display': index !== 0 }"
        />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{
  origamiInfo: OrigamiInfo;
}>();
const swiper = ref(null);
const swiperEl = useSwiper(swiper);
const paginatable = computed(() => props.origamiInfo.imagesCount > 1);
const swiperSlideAspectRatio = computed(
  () => 1 / props.origamiInfo.heightWidthRatio,
);
</script>

<style scoped>
#origami-swiper {
  --swiper-slide-aspect-ratio: v-bind(swiperSlideAspectRatio);
}
</style>
