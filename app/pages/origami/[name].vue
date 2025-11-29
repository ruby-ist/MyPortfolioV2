<template>
  <div>This is origami {{ modelName }} page</div>
</template>

<script>
export default defineNuxtComponent({
  data: () => ({
    modelName: useRoute().params.name,
  }),
});
</script>
