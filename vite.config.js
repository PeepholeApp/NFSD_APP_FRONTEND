import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // Other Vite config options...
  esbuild: {
    target: "esnext",
    platform: "linux",
  },
  // Other Vite config options...
});
