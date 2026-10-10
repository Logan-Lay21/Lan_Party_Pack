import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site work from any GitHub Pages sub-path.
// The app uses HashRouter, so deep links never 404 on Pages.
export default defineConfig({
  base: './',
  plugins: [react()],
});
