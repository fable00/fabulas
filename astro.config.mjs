// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'
import { loadEnv } from "vite";
import { validateEnv } from "./src/utils/env.js";

const rawEnv = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
const env = validateEnv(rawEnv);

// https://astro.build/config
export default defineConfig({
  server: {
    port: env.PORT
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  i18n: {
    locales: ["en", "pt-br"],
    defaultLocale: "en",
    fallback: {
      "pt-br": "en"
    },
    routing: {
      fallbackType: 'redirect'
    }
  }
});
