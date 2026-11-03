// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lokajapanesefoodsbeverage.com',
  // Match the WordPress permalink structure (/about-us-loka/ etc.)
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Link each English page with its Japanese twin (hreflang) in sitemap-0.xml
      i18n: { defaultLocale: 'en', locales: { en: 'en', ja: 'ja' } },
    }),
  ],
  devToolbar: { enabled: false },
  redirects: {
    // WordPress served the blog page at /blog/news/ via redirect
    '/blog/news/': '/news/',
  },
});
