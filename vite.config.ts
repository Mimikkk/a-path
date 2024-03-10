import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: 'build',
    lib: {
      entry: 'src/a-path.ts',
      name: 'a-path',
      fileName: format => `a-path.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
  },
});
