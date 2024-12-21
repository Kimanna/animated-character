import { defineConfig } from 'vite';

export default defineConfig({
  root: 'examples',
  base: './',
  server: {
    port: 3000,
    open: true
  }
}); 