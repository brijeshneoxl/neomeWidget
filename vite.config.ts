import preact from "@preact/preset-vite";
import {resolve} from "path";
import {defineConfig} from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname,"/src/index.ts"),
      name: "neomeWidget",
      fileName: (format) => `neomeWidget.${format}.js`
    }
  },
  plugins: [preact()]
});
