<template>
  <blockquote
    v-if="type === 'note'"
    class="bg-color-code-block-background m-0 p-8-16-16 strict:[&_p]:m-0 strict:[&_code]:font-s-0.75rem strict:[&_strong]:font-s-0.85rem"
    border="rad-8"
    font="s-0.85rem"
  >
    <div class="strict:mb-8 color-secondary" font="s-0.75rem">note</div>
    <slot />
  </blockquote>
  <blockquote
    v-else
    border-l="4px solid color-block-quote-border"
    class="m-16-0 p-0-36 md:p-0-40"
  >
    <slot />
  </blockquote>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    type: {
      type: String,
      default: "quote",
    },
  },
});
</script>
