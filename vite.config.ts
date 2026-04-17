import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  /**
   * Default `./` so asset URLs work on a custom domain (root) and on
   * `*.github.io/<repo>/`. Router basename for the repo path is handled in App
   * via `VITE_GITHUB_PAGES_REPO` (set in the deploy workflow). Override with
   * `VITE_BASE_URL` if you use a fixed absolute base.
   */
  let base =
    env.VITE_BASE_URL || process.env.VITE_BASE_URL || './';
  if (base !== '/' && base !== './' && !base.endsWith('/')) base += '/';

  return {
    base,
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
