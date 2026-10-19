// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://lokajapanesefoodsbeverage.com',
  // Match the WordPress permalink structure (/about-us-loka/ etc.)
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  redirects: {
    // WordPress served the blog page at /blog/news/ via redirect
    '/blog/news/': '/news/',
  },
});
