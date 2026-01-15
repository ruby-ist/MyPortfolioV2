<template>
  <main
    :id="modelName ? 'origami-show' : 'origami'"
    ref="origamiMain"
    class="min-h100dvh grid grid-rows-auto-1fr bg-color-main-background color-primary-text noisy-background"
    font="f-paragraph-font"
  >
    <h1
      font="w-400 s-1.6rem md:s-1.8rem lg:s-1.8rem f-name-font"
      class="p-40 md:p-40-80 lg:p-40-80 m-0 flex align-i-flex-end gap-14 wrap"
    >
      <span>
        <a class="color-primary-text" href="/">Srira</a>'s
        <a class="color-primary-text" href="/origami">Origami</a>
      </span>
      <span
        v-if="modelName"
        class="color-secondary-text relative b-2"
        font="s-1.3rem"
      >
        /&ensp;{{ modelName }}
      </span>
    </h1>
    <NuxtPage v-if="modelName" />
    <div v-else class="m-0-0-40 md:m-40-0 p-var-grid-padding">
      <FastScrollButtons
        class="fixed z-1 b-69 md:b-54 r-var-scroll-button-right-position"
      />
      <ClientOnly fallback-tag="div">
        <div
          class="max-w-80vw relative flex row wrap gap-20 just-c-center h-var-grid-height"
        >
          <OrigamiCard
            v-for="origamiInfo in origamiCards"
            :key="origamiInfo.id"
            ref="OrigamiCards"
            :origami-info="origamiInfo"
          />
        </div>
        <template #fallback>
          <div
            class="max-w-80vw relative flex row wrap gap-20 just-c-center h-var-grid-height"
          >
            <OrigamiCard
              v-for="origamiInfo in getOrigamiPositionedCards(4, 250, 20, 52)"
              :key="origamiInfo.id"
              ref="OrigamiCards"
              :origami-info="origamiInfo"
            />
          </div>
        </template>
      </ClientOnly>
    </div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    if (useRoute().params.slug) return;

    useSeoMeta({
      title: "Srira's Origami",
      ogTitle: "Srira's Origami",
      description: "Gallery of origami models folded by Sriram V",
      ogDescription: "Gallery of origami models folded by Sriram V",
    });
  },

  data: () => ({
    width: import.meta.client ? window.innerWidth : 0,
    gridHeight: "100dvh",
    gridPadding: "0 10%",
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
      const modelName = route.params.slug as string;
      return findOrigamiByModelName(modelName)?.name;
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
      this.origamiCards = getOrigamiPositionedCards(
        this.gridCount,
        this.cardWidth,
        this.cardsGap,
        this.cardInfoHeight,
      );
      this.updateWidth();
      this.updateGridPadding();
      this.updateGridHeight();
    },

    updateWidth() {
      this.width = window.innerWidth;
    },

    updateGridHeight() {
      let maxTop = 0;

      for (const card of this.origamiCards) {
        const bottom = card.top + card.heightWidthRatio * this.cardWidth;
        if (bottom > maxTop) maxTop = bottom;
      }

      this.gridHeight = `${maxTop + this.cardInfoHeight + this.cardsGap}px`; // card content + spacing
    },

    updateGridPadding() {
      this.gridPadding = `0 calc((100vw - ((var(--card-width) * ${this.gridCount}) + (var(--cards-gap) * ${this.gridCount - 1}))) / 2)`;
    },
  },
});
</script>

<style scoped>
#origami {
  --card-width: 250px;
  --cards-gap: 20px;
  --card-info-height: 52px;
  --grid-area: 0.8;
  --scroll-button-right-position: 5%;
  --grid-height: v-bind(gridHeight);
  --grid-padding: v-bind(gridPadding);
}

@media (max-width: 1080px) {
  #origami {
    --grid-area: 0.9;
  }
}

@media (max-width: 720px) {
  #origami {
    --card-width: 288px;
    --cards-gap: 40px;
  }
}

@media (max-width: 684px) {
  #origami {
    --scroll-button-right-position: calc(((100vw - 288px) / 2) - 23px);
  }
}
</style>
