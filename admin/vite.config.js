// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//         '/api': {
//             target: 'http://localhost:3000', // Backend URL
//             changeOrigin: true,
//             secure: false,
//         },
//     },
// },
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // Ensures correct paths for built assets
  build: {
    outDir: path.resolve(__dirname, '../server/admin'), // Store inside server/admin/dist
    emptyOutDir: true,  // Clears the output directory before building
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.univerlens.com', // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

