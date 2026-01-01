<template>
  <main
    id="index"
    class="grid min-h-100vh lg:grid-columns-1fr-auto relative z-0 bg-color-main-background color-primary-text noisy-background"
    font="f-paragraph-font"
  >
    <div class="p-60px-10p-18p md:p-12p-16p-0 lg:p-16p-21p">
      <div font="s-1.38rem md:s-1.45rem lg:s-1.45rem">
        <h1
          font="s-1.6rem md:s-2.2rem lg:s-2.2rem f-name-font"
          class="mb-48 md:mb-60 lg:mb-60"
        >
          Sriram V
        </h1>
        <p class="mb-40 lh-38px md:lh-44px lg:lh-44px" font="f-info-font">
          I build elegant things with Ruby <em>and</em> Rails, mess around with
          Vue and Nuxt for fun, and fold
          <a class="relative color-brown" href="/origami">origami</a> when I’m
          not debugging reality. I also write
          <a class="relative color-brown" href="/blogs">blogs</a> about what I
          learn and find interesting, and build
          <a class="relative color-brown" href="/projects">projects</a> to show
          where curiosity takes me.
        </p>
        <p font="f-info-font">
          Contact:&ensp;
          <a class="relative color-brown" href="mailto:srira.venkat@gmail.com">
            Email
          </a>
          <span>,</span>
          <a
            class="relative color-brown"
            target="_blank"
            href="https://www.linkedin.com/in/sriravenkat/"
          >
            Linkedin
          </a>
        </p>
      </div>
    </div>
    <div class="grid place-i-center md:place-i-end"><IconsGrid /></div>
  </main>
</template>

<style scoped>
a::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 66%;
  left: -0.1em;
  right: -0.1em;
  bottom: 0;
  border-radius: 4px;
  height: 8px;
  background-image: url("/noise.avif"), var(--highlight-background);
}
</style>
