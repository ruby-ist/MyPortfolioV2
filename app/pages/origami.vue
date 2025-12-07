<template>
  <main>
    <h1 font="s-1.8rem f-header-font" class="p-40-80 m-0">
      Srira's Origami
      <span v-if="modelName" class="color-grey" font="w-200 s-1.3rem">
        &ensp;/&ensp;{{ modelName }}
      </span>
    </h1>
    <NuxtPage v-if="modelName" />
    <div v-else ref="origamiGridContainer" class="m-40-0">
      <div
        ref="origamiGrid"
        class="max-w-80vw relative flex row wrap gap-20 p-0-10vw just-c-center"
      >
        <OrigamiCard
          v-for="origamiInfo in origamiCards"
          :key="origamiInfo.id"
          ref="OrigamiCards"
          :origami-info="origamiInfo"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    width: import.meta.client ? window.innerWidth : 0,
    origamiCards: [] as PositionedOrigami[],
  }),

  computed: {
    gridCount() {
      return Math.floor((this.width * 0.8 + 20) / 270);
    },
    modelName() {
      const route = useRoute();
      const modelName = route.params.name as string;
      const origami = ORIGAMI_INFO_ARRAY.find(
        (origami) => origami.picFolderName === modelName,
      );
      return origami ? origami.name : null;
    },
  },

  created() {
    if (useRoute().params.name && !this.modelName) navigateTo("/origami");
  },

  mounted() {
    if (this.modelName) return;
    this.updateLayout();
    window.addEventListener("resize", this.updateLayout);
  },

  beforeUnmount() {
    if (this.modelName) return;
    window.removeEventListener("resize", this.updateLayout);
  },

  methods: {
    updateLayout() {
      this.width = window.innerWidth;
      this.origamiCards = this.getPositionedCards(this.gridCount);
      this.updateWidth();
      this.updatePadding();
      this.updateGridHeight();
    },

    updateWidth() {
      this.width = window.innerWidth;
    },

    updateGridHeight() {
      if (this.$refs.origamiGrid) {
        const grid = this.$refs.origamiGrid as HTMLElement;
        let maxTop = 0;

        for (const card of this.origamiCards) {
          const bottom = card.top + card.height * 250; // top + height
          if (bottom > maxTop) maxTop = bottom;
        }

        grid.style.height = `${maxTop + 52 + 20}px`; // card content + spacing
      }
    },

    updatePadding() {
      if (this.$refs.origamiGridContainer) {
        const gridContainer = this.$refs.origamiGridContainer as HTMLElement;
        gridContainer.style.padding = `0 calc((100vw - ((250px * ${this.gridCount}) + (20px * ${this.gridCount - 1}))) / 2)`;
      }
    },

    getPositionedCards(
      columnCount: number,
      cardWidth = 250,
      gap = 20,
      infoHeight = 52 + 20, // card content + spacing
    ): PositionedOrigami[] {
      const columnHeights = Array(columnCount).fill(0);
      const positioned: PositionedOrigami[] = [];

      ORIGAMI_INFO_ARRAY.forEach((info, index) => {
        const column = index % columnCount;
        const heightPx = info.height * cardWidth;
        const top = columnHeights[column];
        const left = column * (cardWidth + gap);

        positioned.push({ ...info, top, left });
        columnHeights[column] += heightPx + infoHeight;
      });

      return positioned;
    },
  },
});
</script>

<style>
:root {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
