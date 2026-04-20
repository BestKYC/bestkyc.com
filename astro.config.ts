import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { EnumChangefreq } from 'sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.bestkyc.com',
  trailingSlash: 'never',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/') && !page.endsWith('/404'),
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname === '/') {
          return { ...item, priority: 1.0, changefreq: EnumChangefreq.WEEKLY };
        }
        if (url.pathname.startsWith('/rankings/')) {
          return { ...item, priority: 0.9, changefreq: EnumChangefreq.MONTHLY };
        }
        if (url.pathname.startsWith('/reviews/')) {
          return { ...item, priority: 0.8, changefreq: EnumChangefreq.MONTHLY };
        }
        return { ...item, priority: 0.6, changefreq: EnumChangefreq.MONTHLY };
      },
    }),
  ],
});
