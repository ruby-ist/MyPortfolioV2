<template>
  <div v-if="origamiInfo" class="grid place-i-center">
    <div
      class="grid w-100p m-40-0-60 lg:m-0 lg:grid-columns-1fr-480px-1fr-3fr-1fr just-i-center align-i-center wrap relative lg:b-55"
      :class="origamiInfo.description ? 'b-24' : 'b-55'"
    >
      <div />
      <div class="w-320 md:w-480 grid place-i-center">
        <OrigamiCarousel :origami-info="origamiInfo" />
      </div>
      <div />
      <OrigamiDescription :origami-info="origamiInfo" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    modelName: useRoute().params.slug,
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
