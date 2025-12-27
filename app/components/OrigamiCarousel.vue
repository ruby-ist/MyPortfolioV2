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
        class="w-320 md:w-480 relative"
        :style="{ height: `${picWidth * origamiInfo.heightWidthRatio}px` }"
      >
        <swiper-slide
          v-for="index in Array.from(Array(origamiInfo.imagesCount).keys())"
          :key="index"
        >
          <img
            :src="`/origami/${origamiInfo.picFolderName}/pic_${index + 1}.webp`"
            :alt="`${origamiInfo.picFolderName}_pic_${index + 1}`"
            class="w-100p"
            border="rad-20-20-0-0 lg:rad-15"
          />
        </swiper-slide>
      </swiper-container>
      <div
        v-if="paginatable"
        class="flex just-c-center align-i-center gap-24 absolute w-320 md:w-480 lg:t-105p t-90p z-1"
      >
        <button
          class="no-display md:block no-bg border-none"
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
            'lg:[&>.swiper-pagination-bullet]:bg-color-medium-black ' +
            '[&>.swiper-pagination-bullet]:bg-color-translucent-black ' +
            'strict:[&>.swiper-pagination-bullet-active]:bg-color-grey ' +
            '[&>.swiper-pagination-bullet]:w-7 ' +
            '[&>.swiper-pagination-bullet]:h-7 ' +
            '[&>.swiper-pagination-bullet]:border-rad-25'
          "
        />
        <button
          class="no-display md:block no-bg border-none"
          @click="swiperEl.next()"
        >
          <IconsRightArrow class="w-16" />
        </button>
      </div>
    </div>
    <template #fallback>
      <div>
        <img
          v-for="index in Array.from(Array(origamiInfo.imagesCount).keys())"
          :key="index"
          :src="`/origami/${origamiInfo.picFolderName}/pic_${index + 1}.webp`"
          :alt="`${origamiInfo.picFolderName}_pic_${index + 1}`"
          border="rad-15"
          class="w-100p"
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
const picWidth = computed((): number => {
  return window.innerWidth > 720 ? 480 : 320;
});
</script>

<style scoped>
#origami-swiper {
  --pic-width: 480px;
}

@media (max-width: 720px) {
  #origami-swiper {
    --pic-width: 320px;
  }
}
</style>
