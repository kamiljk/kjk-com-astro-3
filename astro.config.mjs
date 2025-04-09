// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
<<<<<<< HEAD

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()]
=======
import remarkWikiLink from 'remark-wiki-link';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [
      [
        remarkWikiLink,
        {
          hrefTemplate: (permalink) => `/docs/${permalink}`, // Resolve [[wikilinks]] to /docs/<slug>
        },
      ],
    ],
  },
  vite: {
    server: {
      fs: {
        allow: [
          './',
        ],
        deny: ['.obsidian'] // Exclude .obsidian folder
      },
    },
  },
>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)
});