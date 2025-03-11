
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Ensures correct paths for built assets
  build: {
    outDir: path.resolve(__dirname, '../server/admin/dist'), // Store inside server/admin/dist
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

