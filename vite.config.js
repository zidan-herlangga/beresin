import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function inlineCssPlugin() {
  return {
    name: 'inline-css',
    enforce: 'post',
    generateBundle(_, bundle) {
      const htmlKeys = Object.keys(bundle).filter(k => k.endsWith('.html'));
      for (const key of htmlKeys) {
        const html = bundle[key];
        if (html.type !== 'asset') continue;
        let source = typeof html.source === 'string' ? html.source : Buffer.from(html.source).toString();
        const cssFiles = Object.keys(bundle).filter(k => k.endsWith('.css'));
        for (const file of cssFiles) {
          const chunk = bundle[file];
          if (chunk.type !== 'asset') continue;
          const css = typeof chunk.source === 'string' ? chunk.source : Buffer.from(chunk.source).toString();
          const tag = `<link rel="stylesheet" crossorigin href="/${file}">`;
          if (source.includes(tag)) {
            source = source.replace(tag, `<style>${css}</style>`);
            delete bundle[file];
          }
        }
        html.source = source;
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCssPlugin()],
  server: {
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/react-router')) return 'vendor';
          if (id.includes('node_modules/tinymce') || id.includes('node_modules/@tinymce')) return 'editor';
        },
      },
    },
  },
})
