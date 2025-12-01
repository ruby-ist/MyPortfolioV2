<template>
  <ClientOnly fallback-tag="div">
    <div>
      <swiper-container
        id="origami-swiper"
        ref="swiper"
        :slides-per-view="1"
        :space-between="28"
        :pagination="paginatable"
        :pagination-clickable="paginatable"
        :loop="paginatable"
        pagination-el=".origami-pagination"
        class="w-480 relative"
      >
        <swiper-slide
          v-for="index in Array.from(Array(origamiInfo.imagesCount).keys())"
          :key="index"
        >
          <img
            :src="`/origami/${origamiInfo.picFolderName}/pic_${index + 1}.webp`"
            :alt="`${origamiInfo.picFolderName}_pic_${index + 1}`"
            class="w-100p"
            border="rad-15"
          />
        </swiper-slide>
      </swiper-container>
      <div
        v-if="paginatable"
        class="flex just-c-center align-i-center gap-24 absolute w-480 -b-50"
      >
        <button class="no-bg border-none" @click="swiperEl.prev()">
          <IconsLeftArrow class="w-16" />
        </button>
        <div class="origami-pagination" />
        <button class="no-bg border-none" @click="swiperEl.next()">
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
</script>

<style>
.origami-pagination {
  display: flex;
  justify-content: center;
  gap: 10px;

  .swiper-pagination-bullet {
    background: var(--medium-black);
    width: 7px;
    height: 7px;
    border-radius: 25px;
  }

  .swiper-pagination-bullet-active {
    background: var(--grey);
    height: 8px;
    width: 8px;
  }
}
</style>
