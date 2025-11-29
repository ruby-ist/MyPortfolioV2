<template>
  <ClientOnly fallback-tag="div">
    <div>
      <swiper-container
        ref="swiper"
        :slides-per-view="1"
        :space-between="28"
        :pagination="true"
        :pagination-clickable="true"
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
      <div class="flex just-c-center gap-10 absolute w-480 -b-50">
        <button @click="swiperEl.prev()">Prev</button>
        <button @click="swiperEl.next()">Next</button>
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
defineProps<{
  origamiInfo: OrigamiInfo;
}>();
const swiper = ref(null);
const swiperEl = useSwiper(swiper);
</script>
