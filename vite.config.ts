import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: 'build',
    lib: {
      entry: 'src/tz-path.ts',
      name: 'tz-path',
      fileName: format => `tz-path.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
  },
});
