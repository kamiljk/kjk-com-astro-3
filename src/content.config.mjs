import { defineCollection, z } from 'astro:content';

// Define your collections here
const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
    draft: z.boolean().optional(),
    scale: z.string().optional(),
    maturity: z.string().optional(),
    source: z.string().optional(),
    created: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date().optional()),
    last_tended: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date().optional()),
    epistemic_status: z.string().optional(),
  }),
});

export const collections = {
  docs: docsCollection,
};