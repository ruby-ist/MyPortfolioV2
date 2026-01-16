<template>
  <div
    class="bg-color-description-background noisy-background w-320 md:w-480 lg:w-inherit p-36 md:p-54 lg:p-60-16p bd-t-0 lg:bd-t-1 box-size-border-box"
    border="rad-0-0-20-20 lg:rad-25 1px solid color-description-border"
  >
    <div>
      <div class="float-left">
        <div
          class="m-0-0-10 lg:m-0-0-14 break-word"
          font="s-0.9em w-600 md:s-1.18em"
        >
          Origami {{ origamiInfo.name }}
        </div>
        <div class="color-secondary-text" font="s-0.8rem">
          {{ origamiInfo.author }}
        </div>
      </div>
      <NuxtTime
        font="s-0.8rem md:s-0.9rem"
        month="short"
        class="relative t-16 w-100 color-secondary-text ta-right float-right"
        day="2-digit"
        year="numeric"
        :datetime="origamiInfo.date"
      />
    </div>

    <em
      v-if="origamiInfo.description"
      class="p-40-0-0 flex align-i-center h-[calc(100%-50px)] lh-36 clear-both"
      font="s-0.9rem md:s-1rem lg:s-1.1rem"
      v-html="origamiInfo.description.replaceAll(`\n`, `<br/>`)"
    />
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
});
</script>
