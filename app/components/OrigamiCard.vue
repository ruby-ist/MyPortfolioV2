<template>
  <div ref="card" class="origami flex column gap-12 w-250 absolute">
    <img
      :src="`/origami/${origamiInfo.picFolderName}/pic_1.webp`"
      :alt="origamiInfo.name"
      class="w-100p bd-rad-23"
      :style="`height: ${origamiInfo.height}`"
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
  mounted() {
    const numCols = 4;
    const card = this.$refs.card as HTMLElement;
    const index = ORIGAMI_INFO_ARRAY.length - this.origamiInfo.id;
    let id = 0;
    let columnHeight = 0;

    while (id !== index) {
      if (id % numCols === index % numCols) {
        const info = ORIGAMI_INFO_ARRAY[id];
        if (index === 50) {
          console.log(info);
        }
        if (info) columnHeight += info!.height + 52 + 20;
      }

      id++;
    }

    card.style.top = `${columnHeight}px`;

    const column = index % numCols;
    card.style.left = `${column * (250 + 20)}px`;
  },
});
</script>

<style scoped>
.origami {
  --grey: #cccccc;
}
</style>
