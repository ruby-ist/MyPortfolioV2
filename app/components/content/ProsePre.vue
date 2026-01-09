<template>
  <div font="f-code-font" class="m-14-0 [&_span]:font-f-code-font">
    <div
      class="bg-color-filename-background noisy-background m-0 p-12-8-12-12 color-filename flex align-i-center just-c-space-between h-14 [&_button]:hover:block"
      border="1px solid color-code-block-border b-0 rad-8-8-0-0"
      font="s-0.75rem"
    >
      <div class="w-90p oflow-x-auto ws-nowrap">
        {{ filename }}
      </div>
      <button
        border="1px solid color-code-block-border rad-4"
        class="no-bg md:no-display hover:bg-color-code-block-background p-4 h-14 w-14 box-size-content-box pointer relative z-1"
        @click="copyToClipBoard"
      >
        <IconsCopied v-if="copied" class="w-14" />
        <IconsCopy v-else class="w-14" />
      </button>
    </div>
    <pre
      border="1px solid color-code-block-border rad-0-0-8-8"
      font="s-0.75rem"
      class="bg-color-code-block-background w-100p m-0 oflow-auto shiki-lang shiki p-16 box-size-border-box [&_code_.line]:block [&_code_.line]:lh-20"
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
