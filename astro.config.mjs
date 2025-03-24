// @ts-check
import partytown from "@astrojs/partytown";
import starlight from "@astrojs/starlight";
import vercel from "@astrojs/vercel";
import {
  remarkEndOfMarkdown,
  viewTransitions,
} from "astro-vtbot/starlight-view-transitions";
import { defineConfig } from "astro/config";
import starlightCoolerCredit from "starlight-cooler-credit";
import starlightLlmsTxt from "starlight-llms-txt";
import viteCompression from "vite-plugin-compression";

// https://astro.build/config
export default defineConfig({
  site: "https://jasondb.vercel.app/",
  markdown: {
    remarkPlugins: [remarkEndOfMarkdown],
  },
  integrations: [
    starlight({
      plugins: [starlightCoolerCredit(), starlightLlmsTxt()],
      components: {
        Hero: './src/components/Hero.astro',
      },
      title: "JasonDB",
      lastUpdated: true,
      credits: true,
      editLink: {
        baseUrl: "https://github.com/aurijs/jason-docs/edit/main",
      },
      social: {
        github: "https://github.com/aurijs/jason",
      },
      favicon: "favicon.svg",
      head: [
        {
          tag: "script",
          attrs: {
            async: true,
            src: "https://www.googletagmanager.com/gtag/js?id=G-0S40CK3NKX",
          },
        },
        {
          tag: "script",
          attrs: {
            type: "text/partytown",
          },
          content: `function a(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],a("js",new Date),a("config","G-0S40CK3NKX");`,
        },
      ],
      logo: {
        dark: "./src/assets/logo_dark.webp",
        light: "./src/assets/logo_light.webp",
        alt: "JasonDB logo",
        replacesTitle: true,
      },
      customCss: ["./src/styles/global.css"],
      sidebar: [
        {
          label: "Start Here",
          items: ["getting-started"],
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
      ],
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
        debug: import.meta.env.DEV,
      },
    }),
  ],
  vite: {
    plugins: [
      viteCompression({
        algorithm: "brotliCompress",
        verbose: false,
        threshold: 1024,
        compressionOptions: {
          level: 3,
        },
      }),
    ],
    build: {
      target: "esnext",
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          pure_getters: true,
          drop_console: import.meta.env.PROD,
        },
        mangle: {
          properties: true,
          keep_fnames: false,
        },
        format: {
          comments: false,
        },
        ecma: 2020,
      },
    },
  },
  adapter: vercel({
    isr: true,
    imagesConfig: {
      sizes: [320, 640, 1280],
      domains: ["jasondb.vercel.app"],
    },
  }),
});
