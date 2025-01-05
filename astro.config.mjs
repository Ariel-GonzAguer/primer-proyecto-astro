import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
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
});
