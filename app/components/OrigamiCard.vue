<template>
  <a
    class="flex column gap-12 pointer color-primary-text w-var-card-width absolute l-var-card-left-position t-var-card-top-position"
    :href="`/origami/${origamiInfo.picFolderName}`"
  >
    <img
      :src="`/origami/${origamiInfo.picFolderName}/pic_1.webp`"
      :alt="origamiInfo.name"
      class="w-100p bd-rad-15 md:bd-rad-23 lg:bd-rad-23"
      loading="lazy"
    />
    <div class="flex column gap-7">
      <div class="flex align-i-center just-c-space-between">
        <h5 class="m-0" font="w-400">{{ origamiInfo.name }}</h5>
        <NuxtTime
          font="s-0.75rem"
          month="short"
          class="color-secondary-text"
          day="2-digit"
          year="numeric"
          :datetime="origamiInfo.date"
        />
      </div>
      <div
        font="s-0.75rem"
        class="color-secondary-text w-250 oflow-x-hidden ws-nowrap ellipsis"
      >
        {{ origamiInfo.author }}
      </div>
    </div>
  </a>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    origamiInfo: {
      type: Object as PropType<PositionedOrigami>,
      required: true,
    },
  },
  computed: {
    cardLeftPosition() {
      return `${this.origamiInfo.left}px`;
    },

    cardTopPosition() {
      return `${this.origamiInfo.top}px`;
    },
  },
});
</script>

<style scoped>
a {
  --card-left-position: v-bind(cardLeftPosition);
  --card-top-position: v-bind(cardTopPosition);
}
</style>
