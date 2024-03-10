import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: 'build',
    lib: {
      entry: 'src/z-path.ts',
      name: 'z-path',
      fileName: format => `z-path.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
  },
});
