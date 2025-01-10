import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://astro0.netlify.app/",

  vite: {
    // relative paths 😁
    resolve: {
      alias: {
        "@components": "/src/components",
        "@layouts": "/src/layouts",
        "@tags": "/src/pages/tags",
        "@posts": "/src/pages/posts",
      },
    },
  },

  integrations: [
    // el include es necesario de agregar solo si se usan frameworks con la misma extensión
    preact({
      include: ["**/preact/*"],
    }),
    react({
      include: ["**/react/*"],
    }),
  ],
});
