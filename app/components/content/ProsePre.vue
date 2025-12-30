<template>
  <div font="f-code-font" class="m-14-0">
    <div
      class="filename m-0 p-8-16 color-indigo"
      border="1px solid color-indigo b-0 rad-8-8-0-0"
      font="s-0.75rem"
    >
      {{ filename }}
    </div>
    <pre
      border="1px solid color-indigo"
      font="s-0.75rem"
      class="bg-color-translucent-light-blue w-100p m-0 oflow-auto bd-rad-0-0-8-8 shiki-lang shiki p-16 box-size-border-box"
    ><slot /></pre>
  </div>
</template>

<script setup lang="ts">
defineProps({
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
});
</script>

<style>
pre code .line {
  display: block;
  line-height: 20px;
}

.filename {
  background: var(--light-purple) url("/noise.avif");
}
</style>
