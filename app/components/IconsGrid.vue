<template>
  <table style="border-collapse: collapse; border-spacing: 0">
    <tbody>
      <!-- ROW 1 -->
      <tr>
        <td />
        <IconCell class="strict:bd-t-0" title="Docker">
          <template #mono>
            <IconsMonochromeDocker class="w-38" />
          </template>
          <template #color>
            <IconsColoredDocker class="w-38" />
          </template>
        </IconCell>
        <td />
        <td />
        <IconCell class="strict:bd-t-0" title="Kafka">
          <template #mono>
            <IconsMonochromeKafka class="w-20" />
          </template>
          <template #color>
            <IconsColoredKafka class="w-20" />
          </template>
        </IconCell>
        <td />
      </tr>

      <!-- ROW 2 -->
      <tr>
        <td />
        <IconCell title="Postgres">
          <template #mono><IconsMonochromePostgres class="w-32" /> </template>
          <template #color>
            <IconsColoredPostgres class="w-32" />
          </template>
        </IconCell>
        <IconCell title="Redis">
          <template #mono>
            <IconsMonochromeRedis class="w-36" />
          </template>
          <template #color>
            <IconsColoredRedis class="w-36" />
          </template>
        </IconCell>
        <IconCell title="WebSocket">
          <template #mono>
            <IconsMonochromeWebsocket class="w-36" />
          </template>
          <template #color>
            <IconsColoredWebsocket class="w-36" />
          </template>
        </IconCell>
        <IconCell title="gRPC">
          <template #mono>
            <IconsMonochromeGrpc class="w-42" />
          </template>
          <template #color>
            <IconsColoredGrpc class="w-42" />
          </template>
        </IconCell>
        <IconCell title="Go">
          <template #mono>
            <IconsMonochromeGo class="w-40" />
          </template>
          <template #color>
            <IconsColoredGo class="w-40" />
          </template>
        </IconCell>
      </tr>

      <!-- ROW 3 -->
      <tr>
        <IconCell class="strict:bd-l-0" title="Ruby">
          <template #mono>
            <IconsMonochromeRuby class="w-36" />
          </template>
          <template #color>
            <IconsColoredRuby class="w-36" />
          </template>
        </IconCell>
        <IconCell title="Ruby on Rails">
          <template #mono>
            <IconsMonochromeRails class="w-36" />
          </template>
          <template #color>
            <IconsColoredRails class="w-36" />
          </template>
        </IconCell>
        <IconCell title="Rest API">
          <template #mono>
            <IconsMonochromeRest class="w-36" />
          </template>
          <template #color>
            <IconsColoredRest class="w-36" />
          </template>
        </IconCell>
        <IconCell title="GraphQL">
          <template #mono>
            <IconsMonochromeGraphql class="w-30" />
          </template>
          <template #color>
            <IconsColoredGraphql class="w-30" />
          </template>
        </IconCell>
        <td />
        <td />
      </tr>

      <!-- ROW 4 -->
      <tr>
        <IconCell class="strict:bd-l-0" title="RSpec">
          <template #mono>
            <IconsMonochromeRspec class="w-36" />
          </template>
          <template #color>
            <IconsColoredRspec class="w-36" />
          </template>
        </IconCell>
        <IconCell title="Hotwire Turbo">
          <template #mono>
            <IconsMonochromeTurbo class="w-34" />
          </template>
          <template #color>
            <IconsColoredTurbo class="w-34" />
          </template>
        </IconCell>
        <IconCell title="Hotwire Stimulus">
          <template #mono>
            <IconsMonochromeStimulus class="w-34" />
          </template>
          <template #color>
            <IconsColoredStimulus class="w-34" />
          </template>
        </IconCell>
        <IconCell title="JavaScript">
          <template #mono>
            <IconsMonochromeJavascript class="w-34" />
          </template>
          <template #color>
            <IconsColoredJavascript class="w-34" />
          </template>
        </IconCell>
        <IconCell title="Vue.js">
          <template #mono>
            <IconsMonochromeVue class="w-36" />
          </template>
          <template #color>
            <IconsColoredVue class="w-36" />
          </template>
        </IconCell>
        <IconCell title="Nuxt JS">
          <template #mono>
            <IconsMonochromeNuxt class="w-38" />
          </template>
          <template #color>
            <IconsColoredNuxt class="w-38" />
          </template>
        </IconCell>
      </tr>

      <!-- ROW 5 -->
      <tr>
        <td />
        <td />
        <td />
        <IconCell title="TypeScript">
          <template #mono>
            <IconsMonochromeTypescript class="w-34" />
          </template>
          <template #color>
            <IconsColoredTypescript class="w-34" />
          </template>
        </IconCell>
        <IconCell title="GSAP">
          <template #mono>
            <IconsMonochromeGsap class="w-54" />
          </template>
          <template #color>
            <IconsColoredGsap class="w-54" />
          </template>
        </IconCell>
        <td />
      </tr>

      <!-- ROW 6 -->
      <tr>
        <td />
        <IconCell title="UnoCSS">
          <template #mono>
            <IconsMonochromeUnocss class="w-34" />
          </template>
          <template #color>
            <IconsColoredUnocss class="w-34" />
          </template>
        </IconCell>
        <IconCell title="CSS">
          <template #mono>
            <IconsMonochromeCss class="w-34" />
          </template>
          <template #color>
            <IconsColoredCss class="w-34" />
          </template>
        </IconCell>
        <IconCell title="HTML5">
          <template #mono>
            <IconsMonochromeHtml class="w-28" />
          </template>
          <template #color>
            <IconsColoredHtml class="w-28" />
          </template>
        </IconCell>
        <IconCell title="SVG">
          <template #mono>
            <IconsMonochromeSvg class="w-36" />
          </template>
          <template #color>
            <IconsColoredSvg class="w-36" />
          </template>
        </IconCell>
        <td />
      </tr>

      <!-- ROW 7 -->
      <tr>
        <td />
        <td />
        <td />
        <IconCell title="Figma">
          <template #mono>
            <IconsMonochromeFigma class="w-34" />
          </template>
          <template #color>
            <IconsColoredFigma class="w-34" />
          </template>
        </IconCell>
        <IconCell title="Adobe Illustrator">
          <template #mono>
            <IconsMonochromeIllustrator class="w-34" />
          </template>
          <template #color>
            <IconsColoredIllustrator class="w-34" />
          </template>
        </IconCell>
        <td />
      </tr>
    </tbody>
  </table>
</template>

<style>
table {
  background:
    url("/noise.avif"), linear-gradient(115deg, var(--beach), var(--sea-green));
}

td {
  background: var(--beige) url("/noise.avif");
}
</style>
