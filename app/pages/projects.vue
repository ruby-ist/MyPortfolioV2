<template>
  <main>
    <h1 font="s-1.8rem f-header-font" class="p-40-80 m-0">Srira's Projects</h1>
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
        <div class="pb-20" border-b="1px solid color-indigo">
          <a
            href="https://github.com/ruby-ist/weaviate_record"
            target="_blank"
            class="color-indigo"
          >
            <h2>Weaviate Record</h2>
          </a>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div class="pb-20" border-b="1px solid color-indigo">
          <a
            href="https://github.com/ruby-ist/dijkstra_trace"
            target="_blank"
            class="color-indigo"
          >
            <h2>Dijkstra Trace</h2>
          </a>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div />
    </div>
  </main>
</template>
