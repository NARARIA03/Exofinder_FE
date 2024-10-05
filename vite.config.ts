import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@apis", replacement: path.resolve(__dirname, "src/apis") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants"),
      },
      {
        find: "@data",
        replacement: path.resolve(__dirname, "src/data"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "src/store"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/utils"),
      },
    ],
  },
});
