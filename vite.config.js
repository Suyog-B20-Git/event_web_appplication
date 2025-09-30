// import {defineConfig} from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['redux-thunk','redux-debounced'],
//   },
//   server: {
//     host: '0.0.0.0', // This binds the server to all network interfaces.
//   },
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),

    // 🔹 Image optimization (shrinks PNG, JPG, SVG, etc.)
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 }, // adjust quality (lower = smaller size)
      pngquant: { quality: [0.6, 0.8] },
      svgo: { plugins: [{ removeViewBox: false }] },
    }),

    // 🔹 Bundle analyzer (creates stats.html after build)
    visualizer({ filename: "stats.html", template: "treemap" }),
  ],

  optimizeDeps: {
    include: ["redux-thunk", "redux-debounced"],
  },

  server: {
    host: "0.0.0.0", // allows LAN/devices in network to access
  },

  build: {
    sourcemap: false, // disable source maps for smaller bundles
    chunkSizeWarningLimit: 600, // silence warnings for >500kb chunks
    rollupOptions: {
      output: {
        // 🔹 Manual chunk splitting (better caching for vendor libs)
        manualChunks: {
          react: ["react", "react-dom"],
          redux: ["react-redux", "redux", "redux-thunk", "redux-debounced"],
        },
      },
    },
  },
});
