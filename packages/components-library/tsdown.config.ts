import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  css: {},
  deps: {
    neverBundle:[
      'react',
      'react-dom',
      '@mantine/core',
      '@mantine/hooks',
    ]
  },
});