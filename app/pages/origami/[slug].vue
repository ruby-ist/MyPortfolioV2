<template>
  <div v-if="origamiInfo" class="grid place-i-center">
    <div
      class="grid w-100p m-40-0-60 lg:m-0 lg:grid-columns-1fr-480px-1fr-3fr-1fr just-i-center align-i-center wrap relative lg:b-55"
      :class="
        origamiInfo.description
          ? 'sm:b-24'
          : 'sm:b-55 sm:m-40-0-60 md:b-12 md:m-0'
      "
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
  setup() {
    const origami = findOrigamiByModelName(useRoute().params.slug as string);
    if (origami) useSeoMeta(createSeoMetaForOrigami(origami));
  },
  data: () => ({
    origamiInfo: findOrigamiByModelName(useRoute().params.slug as string),
  }),
});
</script>
