import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // 상대 경로로 빌드해서 GitHub Pages(https://<user>.github.io/science/)에서도 동작하도록 함
  base: './',
  server: { host: true, port: 5173 },
  build: {
    // 페이지를 추가하면 여기에도 한 줄 추가합니다.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        climate: resolve(import.meta.dirname, 'climate/index.html'),
        homeostasis: resolve(import.meta.dirname, 'homeostasis/index.html'),
      },
    },
  },
});
