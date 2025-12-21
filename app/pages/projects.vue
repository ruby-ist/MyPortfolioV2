<template>
  <main>
    <h1 font="s-1.8rem f-header-font" class="p-40-80 m-0">
      <a class="color-white" href="/">Srira</a>'s Projects
    </h1>
    <div class="grid grid-columns-2.2fr-5.8fr-1fr-4fr-1fr">
      <div />
      <div class="min-w-0">
        <h1 class="mb-60" font="f-thick-font">Websites</h1>
        <ProjectTile
          v-for="project in PROJECTS"
          :key="project.id"
          :project="project"
        />
      </div>
      <div />
      <div>
        <h1 class="mb-60" font="f-thick-font">GitHub</h1>
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
