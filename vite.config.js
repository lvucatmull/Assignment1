import { defineConfig } from "vite";

export default defineConfig({
    root: './',
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        build: {
            rollupOptions: {
              input: {
                app: './public/index.html',
              },
            },
        }
    }
});