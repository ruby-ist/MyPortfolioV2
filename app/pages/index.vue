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
      <table
        class="[&_td]:bd-1 [&_td]:bd-solid [&_td]:bd-color-brown [&_td]:w-80 [&_td]:h-80 [&_td]:ta-center"
        border-collapse="collapse"
      >
        <tbody>
          <tr>
            <td class="strict:border-none" />
            <td class="strict:bd-t-0"><IconsMonochromeDocker /></td>
            <td class="strict:border-none" />
            <td class="strict:border-none" />
            <td class="strict:bd-t-0"><IconsMonochromeKafka /></td>
            <td class="strict:border-none" />
          </tr>
          <tr>
            <td class="strict:border-none" />
            <td><IconsMonochromePostgres /></td>
            <td><IconsMonochromeRedis /></td>
            <td><IconsMonochromeWebsocket /></td>
            <td><IconsMonochromeGrpc /></td>
            <td><IconsMonochromeGo /></td>
          </tr>
          <tr>
            <td class="strict:bd-l-0"><IconsMonochromeRuby /></td>
            <td><IconsMonochromeRails /></td>
            <td><IconsMonochromeRest /></td>
            <td><IconsMonochromeGraphql /></td>
            <td class="strict:border-none" />
            <td class="strict:border-none" />
          </tr>
          <tr>
            <td class="strict:bd-l-0"><IconsMonochromeRspec /></td>
            <td><IconsMonochromeTurbo /></td>
            <td><IconsMonochromeStimulus /></td>
            <td><IconsMonochromeJavascript /></td>
            <td><IconsMonochromeVue /></td>
            <td><IconsMonochromeNuxt /></td>
          </tr>
          <tr>
            <td class="strict:border-none" />
            <td class="strict:border-none" />
            <td class="strict:border-none" />
            <td><IconsMonochromeTypescript /></td>
            <td><IconsMonochromeGsap /></td>
            <td class="strict:border-none" />
          </tr>
          <tr>
            <td class="strict:border-none" />
            <td><IconsMonochromeUnocss /></td>
            <td><IconsMonochromeCss /></td>
            <td><IconsMonochromeHtml /></td>
            <td><IconsMonochromeSvg /></td>
            <td class="strict:border-none" />
          </tr>

          <tr>
            <td class="strict:border-none" />
            <td class="strict:border-none" />
            <td class="strict:border-none" />
            <td><IconsMonochromeFigma /></td>
            <td><IconsMonochromeIllustrator /></td>
            <td class="strict:border-none" />
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

td:not(.strict\:border-none):hover {
  background: none;
}
</style>
