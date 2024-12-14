import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000, // 개발 서버 포트
  },
  build: {
    outDir: 'dist',
  },
});
