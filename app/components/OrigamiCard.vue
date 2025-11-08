<template>
  <div
    class="origami flex column gap-12 w-250"
    :style="`grid-row: span ${origamiInfo.height + 57 + 20}`"
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
      <div font="s-0.75rem" class="color-grey">{{ origamiInfo.author }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    origamiInfo: {
      type: Object as PropType<OrigamiInfo>,
      required: true,
    },
  },
});
</script>

<style scoped>
.origami {
  --grey: #cccccc;
}
</style>
