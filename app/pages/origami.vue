<template>
  <main>
    <h1 font="s-1.8rem f-header-font" class="pl-80 pt-20">Srira's Origami</h1>
    <NuxtPage v-if="modelName" />
    <div v-else ref="origamiGridContainer" class="m-60-0">
      <div
        ref="origamiGrid"
        class="max-w-80vw relative flex row wrap gap-20 p-0-10vw just-c-center"
      >
        <OrigamiCard
          v-for="origamiInfo in ORIGAMI_INFO_ARRAY"
          :key="origamiInfo.id"
          ref="OrigamiCards"
          :origami-info="origamiInfo"
          :grid-count="gridCount"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    width: import.meta.client ? window.innerWidth : 0,
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
      return origami ? modelName : null;
    },
  },

  mounted() {
    if (this.modelName) return;
    this.width = window.innerWidth;
    this.updateLayout();
    window.addEventListener("resize", this.updateLayout);
  },

  beforeUnmount() {
    if (this.modelName) return;
    window.removeEventListener("resize", this.updateLayout);
  },

  methods: {
    updateLayout() {
      this.updateWidth();
      this.updatePadding();
      setTimeout(this.updateGridHeight, 100);
    },

    updateWidth() {
      this.width = window.innerWidth;
    },

    updateGridHeight() {
      if (this.$refs.origamiGrid) {
        const grid = this.$refs.origamiGrid as HTMLElement;

        const highest = [...grid.children]
          .slice(-this.gridCount)
          .reduce((a, b) =>
            parseFloat(getComputedStyle(a).top) >
            parseFloat(getComputedStyle(b).top)
              ? a
              : b,
          ) as HTMLElement;

        grid.style.height = `${parseFloat(highest.style.top) + 250 + 52}px`;
      }
    },

    updatePadding() {
      if (this.$refs.origamiGridContainer) {
        const gridContainer = this.$refs.origamiGridContainer as HTMLElement;
        gridContainer.style.padding = `0 calc((100vw - ((250px * ${this.gridCount}) + (20px * 3))) / 2)`;
      }
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
