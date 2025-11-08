<template>
  <main>
    <h1 font="s-1.8rem f-header-font" class="pl-80 pt-20">Srira's Origami</h1>
    <div font="f-paragraph-font" class="grid place-i-center m-60-0">
      <div class="origami-grid grid gap-0-20 grid-auto-rows-1px max-w-80vw">
        <OrigamiCard
          v-for="origamiInfo in ORIGAMI_INFO_ARRAY"
          :key="origamiInfo.id"
          :origami-info="origamiInfo"
        />
      </div>
    </div>
  </main>
</template>

<style>
body {
  --medium-black: #1c1c1c;
  --header-font: "Life Savers", serif;
  --paragraph-font: "Wix Madefor Text", serif;

  background: var(--medium-black) url("/noise.avif");
  color: white;
}

:root {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.origami-grid {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
