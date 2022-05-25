import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';
import path from 'path';

export default defineConfig({
  plugins: [cesium()],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src/'),
      },
    ],
  },
  server: {
    host: true, // 服务器主机名
  },
});
