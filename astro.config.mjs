// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jb-solutions.digital',
  integrations: [
    sitemap({
      filter: (page) => {
        const excludedPages = ['/404', '/impressum'];
        return !excludedPages.some(excluded => page.includes(excluded));
      }
    })
  ],
});
