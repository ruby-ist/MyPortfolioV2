<template>
  <td
    ref="cell"
    border="1 solid color-medium-brown"
    class="p-0"
    @mouseenter="colorize"
    @mouseleave="decolorize"
  >
    <div
      class="w-[calc(80vw/6)] h-[calc(80vw/6)] md:w-69 md:h-69 lg:w-69 lg:h-69 grid place-i-center"
    >
      <div ref="mono" class="inline-block">
        <slot name="mono" />
      </div>
      <div ref="color" class="inline-block no-display">
        <slot ref="color" name="color"> I </slot>
      </div>
    </div>
  </td>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    timerId: null as null | NodeJS.Timeout,
  }),
  methods: {
    colorize() {
      if (!(this.$refs.mono && this.$refs.color && this.$refs.cell)) return;

      if (this.timerId) clearTimeout(this.timerId);
      (this.$refs.cell as HTMLElement).classList.add("no-bg");
      (this.$refs.mono as HTMLElement).classList.add("no-display");
      (this.$refs.color as HTMLElement).classList.remove("no-display");
    },
    decolorize() {
      if (!(this.$refs.mono && this.$refs.color && this.$refs.cell)) return;

      this.timerId = setTimeout(() => {
        (this.$refs.cell as HTMLElement).classList.remove("no-bg");
        (this.$refs.mono as HTMLElement).classList.remove("no-display");
        (this.$refs.color as HTMLElement).classList.add("no-display");
      }, 2000);
    },
  },
});
</script>
