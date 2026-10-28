import { defineConfig } from 'vite';

export default defineConfig({
  // 상대 경로로 빌드해서 GitHub Pages(https://<user>.github.io/science/)에서도 동작하도록 함
  base: './',
  server: { host: true, port: 5173 },
});
