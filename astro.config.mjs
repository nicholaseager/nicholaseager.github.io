// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://www.nicholaseager.com",
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Ignore redirects
        if (page.includes("/g/")) {
          return false;
        }

        if (page.endsWith("/links/")) {
          return false;
        }

        return true;
      },
    }),
    tailwind(),
    mdx(),
  ],
  experimental: {
    svg: true,
  },
});
