<template>
  <main class="flex h-100vh">
    <div class="w-60p pt-12p pl-16p">
      <div class="w-75p" font="s-1.45rem">
        <h1 font="s-2.2rem f-header-font" class="mb-60">Sriram V</h1>
        <p class="mb-40 lh-44px" font="f-paragraph-font">
          I build elegant things with Ruby <em>and</em> Rails, mess around with
          Vue and Nuxt for fun, and fold
          <a class="relative color-brown" href="/origami">origami</a> when I’m
          not debugging reality. I also write
          <a class="relative color-brown" href="/blogs">blogs</a> about what I
          learn and find interesting, and build
          <a class="relative color-brown" href="/projects">projects</a> to show
          where curiosity takes me.
        </p>
        <p font="f-paragraph-font">
          Contact:&ensp;
          <a class="relative color-brown" href="mailto:srira.venkat@gmail.com">
            Email
          </a>
          <span>,</span>
          <a
            class="relative color-brown"
            href="https://www.linkedin.com/in/sriravenkat/"
          >
            Linkedin
          </a>
        </p>
      </div>
    </div>
    <div class="grid place-i-end"><IconsGrid /></div>
  </main>
</template>

<style>
a::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 65%;
  left: -0.1em;
  right: -0.1em;
  bottom: 0;
  border-radius: 4px;
  height: 8px;
  background:
    url("/noise.avif"), linear-gradient(115deg, var(--beach), var(--sea-green));
}
</style>
