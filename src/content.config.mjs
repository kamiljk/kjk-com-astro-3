import { defineCollection, z } from 'astro:content';

// Define your collections here
const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  docs: docsCollection,
};