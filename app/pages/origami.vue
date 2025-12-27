<template>
  <main
    id="origami-main"
    ref="origamiMain"
    class="h100dvh grid grid-rows-auto-1fr"
  >
    <h1
      font="s-1.6rem md:s-1.8rem lg:s-1.8rem f-header-font"
      class="p-40 md:p-40-80 lg:p-40-80 m-0 flex align-i-flex-end gap-14 wrap"
    >
      <span>
        <a class="color-white" href="/">Srira</a>'s
        <a class="color-white" href="/origami">Origami</a>
      </span>
      <span v-if="modelName" class="color-grey relative b-2" font="s-1.3rem">
        /&ensp;{{ modelName }}
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
      const possibleGridsWithoutGap = Math.floor(
        (this.width * this.gridArea) / this.cardWidth,
      );
      const possibleGapsInRemainingSpace = Math.floor(
        ((this.width * this.gridArea) % this.cardWidth) / this.cardsGap,
      );

      if (possibleGridsWithoutGap - possibleGapsInRemainingSpace <= 1)
        return possibleGridsWithoutGap;
      else return possibleGridsWithoutGap - 1;
    },

    modelName() {
      const route = useRoute();
      const modelName = route.params.name as string;
      const origami = ORIGAMI_INFO_ARRAY.find(
        (origami) => origami.picFolderName === modelName,
      );
      return origami ? origami.name : null;
    },

    cardWidth(): number {
      return parseInt(
        this.getOrigamiMainComputedStyle.getPropertyValue("--card-width"),
      );
    },

    cardsGap(): number {
      return parseInt(
        this.getOrigamiMainComputedStyle.getPropertyValue("--cards-gap"),
      );
    },

    cardInfoHeight(): number {
      return parseInt(
        this.getOrigamiMainComputedStyle.getPropertyValue("--card-info-height"),
      );
    },

    gridArea(): number {
      return parseFloat(
        this.getOrigamiMainComputedStyle.getPropertyValue("--grid-area"),
      );
    },

    getOrigamiMainComputedStyle(): CSSStyleDeclaration {
      const origamiMain = this.$refs.origamiMain as HTMLElement;
      if (!origamiMain) return {} as CSSStyleDeclaration;

      return getComputedStyle(origamiMain);
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
          const bottom = card.top + card.heightWidthRatio * this.cardWidth;
          if (bottom > maxTop) maxTop = bottom;
        }

        grid.style.height = `${maxTop + this.cardInfoHeight + this.cardsGap}px`; // card content + spacing
      }
    },

    updatePadding() {
      if (this.$refs.origamiGridContainer) {
        const gridContainer = this.$refs.origamiGridContainer as HTMLElement;
        gridContainer.style.padding = `0 calc((100vw - ((var(--card-width) * ${this.gridCount}) + (var(--cards-gap) * ${this.gridCount - 1}))) / 2)`;
      }
    },

    getPositionedCards(columnCount: number): PositionedOrigami[] {
      const columnHeights = Array(columnCount).fill(0);
      const positioned: PositionedOrigami[] = [];

      ORIGAMI_INFO_ARRAY.forEach((info, index) => {
        const column = index % columnCount;
        const heightPx = info.heightWidthRatio * this.cardWidth;
        const top = columnHeights[column];
        const left = column * (this.cardWidth + this.cardsGap);

        positioned.push({ ...info, top, left });
        columnHeights[column] += heightPx + this.cardInfoHeight + this.cardsGap;
      });

      return positioned;
    },
  },
});
</script>

<style scoped>
#origami-main {
  --card-width: 250px;
  --cards-gap: 20px;
  --card-info-height: 52px;
  --grid-area: 0.8;
}

@media (max-width: 1080px) {
  #origami-main {
    --grid-area: 0.9;
  }
}

@media (max-width: 720px) {
  #origami-main {
    --card-width: 288px;
    --cards-gap: 40px;
  }
}
</style>
