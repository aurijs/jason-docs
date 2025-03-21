// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import viteCompression from "vite-plugin-compression";
import vercel from "@astrojs/vercel";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://jasondb.vercel.app/",
  integrations: [
    starlight({
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
          tag: "meta",
          attrs: {
            name: "view-transition",
            content: "same-origin",
          },
        },
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
      },
    }),
  ],
  vite: {
    plugins: [
      viteCompression({
        algorithm: "brotliCompress",
        verbose: false,
        threshold: 512,
        compressionOptions: {
          level: 3,
        },
      }),
    ],
    build: {
      minify: "terser",
      target: "esnext",
      reportCompressedSize: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          pure_getters: true,
          drop_console: true,
        },
      },
    },
  },
  adapter: vercel({
    isr: true,
    imagesConfig: {
      sizes: [320, 640, 1280],
      domains: [""],
    },
  }),
});
