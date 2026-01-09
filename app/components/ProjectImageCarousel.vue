<template>
  <ClientOnly fallback-tag="div">
    <div class="w-100p">
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
          <cdnImage
            :src="`/projects/${project.name}/pic_${index + 1}.webp`"
            :alt="`${project.name}_pic_${index + 1}`"
            class="w-100p"
            border="rad-15"
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
      <div>
        <cdnImage
          v-for="index in Array.from(Array(project.imagesCount).keys())"
          :key="index"
          :src="`/projects/${project.name}/pic_${index + 1}.webp`"
          :alt="`${project.name}_pic_${index + 1}`"
          border="rad-15"
          class="w-100p"
          :class="{ 'no-display': index !== 0 }"
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
</script>
