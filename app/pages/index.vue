<template>
  <div class="flex h-100vh">
    <div class="w-60p h-100p grid place-i-center">
      <div class="w-70p">
        <h1>Sriram V</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos.
        </p>
        <p>Contact: Email, Linkedin</p>
      </div>
    </div>
    <div class="w-40p grid place-i-end">
      <table border-collapse="collapse">
        <tbody>
          <!-- ROW 1 -->
          <tr>
            <td />
            <IconCell class="strict:bd-t-0">
              <template #mono>
                <IconsMonochromeDocker class="w-38" />
              </template>
              <template #color>
                <IconsColoredDocker class="w-38" />
              </template>
            </IconCell>
            <td />
            <td />
            <IconCell class="strict:bd-t-0">
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
            <IconCell>
              <template #mono
                ><IconsMonochromePostgres class="w-32" />
              </template>
              <template #color>
                <IconsColoredPostgres class="w-32" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeRedis class="w-36" />
              </template>
              <template #color>
                <IconsColoredRedis class="w-36" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeWebsocket class="w-36" />
              </template>
              <template #color>
                <IconsColoredWebsocket class="w-36" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeGrpc class="w-42" />
              </template>
              <template #color>
                <IconsColoredGrpc class="w-42" />
              </template>
            </IconCell>
            <IconCell>
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
            <IconCell class="strict:bd-l-0">
              <template #mono>
                <IconsMonochromeRuby class="w-36" />
              </template>
              <template #color>
                <IconsColoredRuby class="w-36" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeRails class="w-36" />
              </template>
              <template #color>
                <IconsColoredRails class="w-36" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeRest class="w-36" />
              </template>
              <template #color>
                <IconsColoredRest class="w-36" />
              </template>
            </IconCell>
            <IconCell>
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
            <IconCell class="strict:bd-l-0">
              <template #mono>
                <IconsMonochromeRspec class="w-36" />
              </template>
              <template #color>
                <IconsColoredRspec class="w-36" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeTurbo class="w-34" />
              </template>
              <template #color>
                <IconsColoredTurbo class="w-34" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeStimulus class="w-34" />
              </template>
              <template #color>
                <IconsColoredStimulus class="w-34" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeJavascript class="w-34" />
              </template>
              <template #color>
                <IconsColoredJavascript class="w-34" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeVue class="w-36" />
              </template>
              <template #color>
                <IconsColoredVue class="w-36" />
              </template>
            </IconCell>
            <IconCell>
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
            <IconCell>
              <template #mono>
                <IconsMonochromeTypescript class="w-34" />
              </template>
              <template #color>
                <IconsColoredTypescript class="w-34" />
              </template>
            </IconCell>
            <IconCell>
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
            <IconCell>
              <template #mono>
                <IconsMonochromeUnocss class="w-34" />
              </template>
              <template #color>
                <IconsColoredUnocss class="w-34" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeCss class="w-34" />
              </template>
              <template #color>
                <IconsColoredCss class="w-34" />
              </template>
            </IconCell>
            <IconCell>
              <template #mono>
                <IconsMonochromeHtml class="w-28" />
              </template>
              <template #color>
                <IconsColoredHtml class="w-28" />
              </template>
            </IconCell>
            <IconCell>
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
            <IconCell>
              <template #mono>
                <IconsMonochromeFigma class="w-34" />
              </template>
              <template #color>
                <IconsColoredFigma class="w-34" />
              </template>
            </IconCell>
            <IconCell>
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
    </div>
  </div>
</template>

<style>
body {
  --beige: #f2e2b1;
  --brown: #7e6752;
  --sea-green: #98eecc;
  --beach: #d0f5be;

  background: var(--beige) url("/noise.avif");
  color: var(--brown);
}

table {
  background:
    url("/noise.avif"), linear-gradient(115deg, var(--beach), var(--sea-green));
}

td {
  background: var(--beige) url("/noise.avif");
}
</style>
