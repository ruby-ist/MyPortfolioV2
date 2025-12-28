<template>
  <div v-if="origamiInfo" class="grid place-i-center">
    <div
      class="grid w-100p m-40-0-60 lg:m-0 lg:grid-columns-1fr-480px-1fr-3fr-1fr just-i-center align-i-center wrap relative b-55"
    >
      <div />
      <div class="w-320 md:w-480 grid place-i-center">
        <OrigamiCarousel :origami-info="origamiInfo" />
      </div>
      <div />
      <div
        class="description w-320 md:w-480 lg:w-inherit p-36 md:p-54 lg:p-60-16p bd-t-0 lg:bd-t-1"
        border="rad-0-0-20-20 lg:rad-25 1px solid color-medium-black"
        style="box-sizing: border-box"
      >
        <div>
          <div style="float: left">
            <h3
              class="m-0-0-10 lg:m-0-0-14 break-word"
              font="s-0.9em md:s-1.18em"
            >
              Origami {{ origamiInfo.name }}
            </h3>
            <div class="color-grey" font="s-0.8rem">
              {{ origamiInfo.author }}
            </div>
          </div>
          <NuxtTime
            font="s-0.8rem md:s-0.9rem"
            month="short"
            class="relative t-16 w-100 color-grey ta-right"
            day="2-digit"
            year="numeric"
            style="float: right"
            :datetime="origamiInfo.date"
          />
        </div>

        <em
          v-if="origamiInfo.description"
          class="p-40-0-0 flex align-i-center h-[calc(100%-50px)] lh-36"
          font="s-0.9rem md:s-1rem lg:s-1.1rem"
          style="clear: both"
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
