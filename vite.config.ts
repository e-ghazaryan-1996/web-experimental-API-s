import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({
    include : ["global.d.ts"]
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
