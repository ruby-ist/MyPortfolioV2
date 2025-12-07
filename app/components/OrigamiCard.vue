<template>
  <a
    class="flex column gap-12 w-250 pointer color-white absolute"
    :style="{ left: `${origamiInfo.left}px`, top: `${origamiInfo.top}px` }"
    :href="`/origami/${origamiInfo.picFolderName}`"
  >
    <img
      :src="`/origami/${origamiInfo.picFolderName}/pic_1.webp`"
      :alt="origamiInfo.name"
      class="w-100p bd-rad-23"
      loading="lazy"
    />
    <div class="flex column gap-7">
      <div class="flex align-i-center just-c-space-between">
        <h5 class="m-0" font="w-400">{{ origamiInfo.name }}</h5>
        <NuxtTime
          font="s-0.75rem"
          month="short"
          class="color-grey"
          day="2-digit"
          year="numeric"
          :datetime="origamiInfo.date"
        />
      </div>
      <div
        font="s-0.75rem"
        class="color-grey w-250 oflow-x-hidden"
        style="white-space: nowrap; text-overflow: ellipsis"
      >
        {{ origamiInfo.author }}
      </div>
    </div>
  </a>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    origamiInfo: {
      type: Object as PropType<PositionedOrigami>,
      required: true,
    },
  },
});
</script>
