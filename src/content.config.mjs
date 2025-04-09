import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    heroImage: z.string().optional(),
  }).extend({
    Content: z.function().returns(z.string())
  }),
});

export const collections = {
  docs,
};