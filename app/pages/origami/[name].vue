<template>
  <div v-if="origamiInfo" class="h-[calc(100vh-115.5px)] grid place-i-center">
    <div
      class="flex row w-100p just-c-space-evenly align-i-center wrap relative b-55"
    >
      <div class="w-480 grid place-i-center">
        <OrigamiCarousel :origami-info="origamiInfo" />
      </div>
      <div class="description w-400 h-40vh p-60-90" border="rad-25">
        <div class="flex just-c-space-between align-i-center">
          <div>
            <h3 class="m-0-0-10">Origami {{ origamiInfo.name }}</h3>
            <div class="color-grey" font="s-0.8rem">
              {{ origamiInfo.author }}
            </div>
          </div>
          <NuxtTime
            font="s-0.9rem"
            month="short"
            class="color-grey"
            day="2-digit"
            year="numeric"
            :datetime="origamiInfo.date"
          />
        </div>
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
  background: var(--medium-black) url("/noise.avif");
}
</style>
