import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const page = (name) => fileURLToPath(new URL(name, import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        operator: page("./operator.html"),
        public: page("./public.html"),
        draw: page("./draw.html"),
      },
    },
  },
});
