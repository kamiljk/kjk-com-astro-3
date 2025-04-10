// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import remarkWikiLink from 'remark-wiki-link';
import solid from '@astrojs/solid-js';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solid()],

  markdown: {
    remarkPlugins: [
      [
        remarkWikiLink,
        {
          /**
           * @param {string} permalink
           */
          hrefTemplate: (permalink) => `/docs/${permalink}`, // Resolve [[wikilinks]] to /docs/<slug>
        },
      ],
    ],
  },

  vite: {
    server: {
      fs: {
        allow: ['./'],
        deny: ['.obsidian'], // Exclude .obsidian folder
      },
    },
  },

  adapter: vercel(),
});