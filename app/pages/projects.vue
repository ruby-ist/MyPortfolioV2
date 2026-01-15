<template>
  <main
    id="projects"
    class="bg-color-main-background color-primary-text noisy-background"
    font="f-paragraph-font"
  >
    <h1
      font="w-400 s-1.6rem md:s-1.8rem lg:s-1.8rem f-name-font"
      class="p-40 md:p-40-80 lg:p-40-80 m-0-0-20 lg:m-0 lg:bd-none"
      border-b="1px solid color-primary-text"
    >
      <a class="color-primary-text" href="/">Srira</a>'s Projects
    </h1>
    <div
      class="grid lg:grid-columns-2.2fr-5.8fr-1fr-4fr-1fr p-0-40-80 md:p-0-80-80 lg:p-0"
    >
      <div />
      <div class="min-w-0">
        <h1 class="mt-20 mb-60" font="f-header-font">Websites</h1>
        <ProjectTile
          v-for="project in PROJECTS"
          :key="project.id"
          :project="project"
        />
      </div>
      <div />
      <div>
        <h1 class="mt-20 mb-60" font="f-header-font">GitHub</h1>
        <GitHubRepoTile
          v-for="gitHubRepo in GITHUB_REPOS"
          :key="gitHubRepo.id"
          :git-hub-repo="gitHubRepo"
        />
      </div>
      <div />
    </div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    useSeoMeta({
      title: "Srira's Projects",
      ogTitle: "Srira's Projects",
      description:
        "A showcase of web development projects built by Sriram V to explore ideas and solve problems.",
      ogDescription:
        "A showcase of web development projects built by Sriram V to explore ideas and solve problems.",
    });
  },
});
</script>
