<template>
  <div v-if="origamiInfo" class="h-[calc(100vh-115.5px)] grid place-i-center">
    <div
      class="grid w-100p grid-columns-1fr-480px-1fr-3fr-1fr align-i-center wrap relative b-55"
    >
      <div />
      <div class="w-480 grid place-i-center">
        <OrigamiCarousel :origami-info="origamiInfo" />
      </div>
      <div />
      <div
        class="description p-60-0 grid align-i-center grid-columns-16%-1fr-108px-16% grid-rows-auto"
        border="rad-25 1px solid color-medium-black"
      >
        <div />
        <div>
          <h3 class="m-0-0-10 break-word">Origami {{ origamiInfo.name }}</h3>
          <div class="color-grey" font="s-0.8rem">
            {{ origamiInfo.author }}
          </div>
        </div>
        <NuxtTime
          font="s-0.9rem"
          month="short"
          class="color-grey ta-right"
          day="2-digit"
          year="numeric"
          :datetime="origamiInfo.date"
        />
        <div />

        <em
          v-if="origamiInfo.description"
          class="p-60-0-40 flex align-i-center h-[calc(100%-50px)] lh-36"
          font="s-1.1rem"
          style="grid-column: 2 / 4"
          v-html="origamiInfo.description.replaceAll(`\n`, `<br/>`)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    modelName: useRoute().params.name,
  }),
  computed: {
    origamiInfo() {
      return ORIGAMI_INFO_ARRAY.find(
        (origami) => origami.picFolderName === this.modelName,
      );
    },
  },
});
</script>

<style scoped>
.description {
  background: var(--transparent-black) url("/noise.avif");
}
</style>
