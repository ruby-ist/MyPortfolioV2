<template>
  <td
    ref="cell"
    class="w-68 h-68 ta-center"
    border="1 solid color-brown"
    @mouseenter="colorize"
  >
    <div ref="mono" class="inline-block">
      <slot name="mono" />
    </div>
    <div ref="color" class="inline-block no-display">
      <slot ref="color" name="color"> I </slot>
    </div>
  </td>
</template>

<script lang="ts">
export default defineNuxtComponent({
  methods: {
    colorize() {
      if (!(this.$refs.mono && this.$refs.color && this.$refs.cell)) return;

      (this.$refs.cell as HTMLElement).classList.add("no-bg");
      (this.$refs.mono as HTMLElement).classList.add("no-display");
      (this.$refs.color as HTMLElement).classList.remove("no-display");
      setTimeout(this.decolorize, 3000);
    },
    decolorize() {
      if (!(this.$refs.mono && this.$refs.color && this.$refs.cell)) return;

      (this.$refs.cell as HTMLElement).classList.remove("no-bg");
      (this.$refs.mono as HTMLElement).classList.remove("no-display");
      (this.$refs.color as HTMLElement).classList.add("no-display");
    },
  },
});
</script>
