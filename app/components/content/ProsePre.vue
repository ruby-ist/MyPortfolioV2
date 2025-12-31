<template>
  <div font="f-code-font" class="m-14-0">
    <div
      class="filename m-0 p-12-8-12-12 color-filename-color flex align-i-center just-c-space-between h-14 [&_button]:hover:block"
      border="1px solid color-pre-border b-0 rad-8-8-0-0"
      font="s-0.75rem"
    >
      <div class="w-90p oflow-x-auto" style="white-space: nowrap">
        {{ filename }}
      </div>
      <button
        border="1px solid color-pre-border rad-4"
        class="no-bg md:no-display hover:bg-color-pre-background p-4 h-14 w-14 box-size-content-box pointer relative z-1"
        @click="copyToClipBoard"
      >
        <IconsCopied v-if="copied" class="w-14" />
        <IconsCopy v-else class="w-14" />
      </button>
    </div>
    <pre
      border="1px solid color-pre-border"
      font="s-0.75rem"
      class="bg-color-pre-background w-100p m-0 oflow-auto bd-rad-0-0-8-8 shiki-lang shiki p-16 box-size-border-box"
    ><slot /></pre>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    code: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: null,
    },
    filename: {
      type: String,
      default: null,
    },
    highlights: {
      type: Array as () => number[],
      default: () => [],
    },
    meta: {
      type: String,
      default: null,
    },
    class: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    copied: false,
  }),

  methods: {
    copyToClipBoard() {
      navigator.clipboard.writeText(this.code).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      });
    },
  },
});
</script>

<style>
pre code .line {
  display: block;
  line-height: 20px;
}

.filename {
  background: var(--filename-background) url("/noise.avif");
}
</style>
