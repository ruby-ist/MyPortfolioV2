<template>
  <main>
    <h1 font="s-1.8rem f-header-font" class="pl-80 pt-20">Srira's Origami</h1>
    <div font="f-paragraph-font" class="m-60-0 p-0-10p">
      <div ref="origamiGrid" class="max-w-80vw relative">
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
</style>
