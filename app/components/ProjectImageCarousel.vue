<template>
  <ClientOnly fallback-tag="div">
    <div id="project-carousel" class="w-100p">
      <swiper-container
        :slides-per-view="project.type === 'mobile' ? 3 : 1"
        :space-between="28"
        :pagination="paginatable"
        :pagination-clickable="paginatable"
        :pagination-el="`#project-${project.name}-pagination`"
        :loop="paginatable"
        :autoplay="true"
      >
        <swiper-slide
          v-for="index in Array.from(Array(project.imagesCount).keys())"
          :key="index"
        >
          <ImageWithLoader
            :src="`/projects/${project.name}/pic_${index + 1}.webp`"
            :alt="`${project.name}_pic_${index + 1}`"
            class="w-100p aspect-ratio-var-image-aspect-ratio [&_.loader]:w-[calc(100%-2px)] [&_.loader]:box-size-border-box [&_.loader]:bd-1 [&_.loader]:bd-solid [&_.loader]:bd-color-primary-text"
            border-class="bd-rad-15"
          />
        </swiper-slide>
      </swiper-container>
      <div
        :id="`project-${project.name}-pagination`"
        :class="
          'flex just-c-center gap-10 m-10-0-20 ' +
          '[&>.swiper-pagination-bullet-active]:w-8 ' +
          '[&>.swiper-pagination-bullet-active]:h-8 ' +
          '[&>.swiper-pagination-bullet]:bg-color-carousel-pagination-bullet ' +
          'strict:[&>.swiper-pagination-bullet-active]:bg-color-carousel-active-pagination-bullet ' +
          '[&>.swiper-pagination-bullet]:w-7 ' +
          '[&>.swiper-pagination-bullet]:h-7 ' +
          '[&>.swiper-pagination-bullet]:border-rad-25'
        "
      />
    </div>
    <template #fallback>
      <div id="project-carousel">
        <ImageWithLoader
          v-for="index in Array.from(Array(project.imagesCount).keys())"
          :key="index"
          :src="`/projects/${project.name}/pic_${index + 1}.webp`"
          :alt="`${project.name}_pic_${index + 1}`"
          border-class="bd-rad-15"
          class="w-100p aspect-ratio-var-image-aspect-ratio [&_.loader]:w-[calc(100%-2px)] [&_.loader]:box-size-border-box [&_.loader]:bd-1 [&_.loader]:bd-solid [&_.loader]:bd-color-primary-text"
          :class="`${project.type === 'mobile' ? 'w-30p mr-3p inline-block' : 'w-100p'}
                   ${project.type === 'mobile' && index > 2 ? 'no-display' : ''}
                   ${project.type === 'responsive' && index !== 0 ? 'no-display' : ''}`"
        />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{
  project: Project;
}>();
const paginatable = computed(() => props.project.imagesCount > 1);
const imageAspectRatio = computed(() => 1 / props.project.heightWidthRatio);
</script>

<style scoped>
div#project-carousel {
  --image-aspect-ratio: v-bind(imageAspectRatio);
}
</style>
