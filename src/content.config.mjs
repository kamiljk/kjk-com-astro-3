import { defineCollection, z } from 'astro:content';

<<<<<<< HEAD
const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    heroImage: z.string().optional(),
  }).extend({
    Content: z.function().returns(z.string())
  }),
=======
// Helper function to preprocess dates
const preprocessDate = (dateString) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return new Date(`${dateString}T00:00:00Z`);
  }
  return new Date(dateString);
};

const docs = defineCollection({
  schema: z.discriminatedUnion('fmContentType', [
    z.object({
      fmContentType: z.literal('definition'),
      title: z.string(),
      definition: z.string(),
      keyAttributes: z.array(z.string()).optional(),
      scale: z.string().optional(),
      maturity: z.string().optional(),
      source: z.string().optional(),
      created: z.preprocess((val) => preprocessDate(val), z.date()).optional(),
      last_tended: z.preprocess((val) => preprocessDate(val), z.date()).optional(),
      epistemic_status: z.string().optional(),
    }),
    z.object({
      fmContentType: z.literal('article'),
      title: z.string(),
      description: z.string().optional(),
      body: z.string(),
      images: z.array(z.string()).optional(),
      pubDate: z.preprocess((val) => preprocessDate(val), z.date()),
      created: z.preprocess((val) => preprocessDate(val), z.date()).optional(),
      last_tended: z.preprocess((val) => preprocessDate(val), z.date()).optional(),
      epistemic_status: z.string().optional(),
    }),
    z.object({
      fmContentType: z.literal('macro-piece'),
      title: z.string(),
      description: z.string().optional(),
      sections: z.array(z.object({
        title: z.string(),
        content: z.string(),
      })),
      references: z.array(z.string()).optional(),
      pubDate: z.preprocess((val) => preprocessDate(val), z.date()),
      created: z.preprocess((val) => preprocessDate(val), z.date()).optional(),
      last_tended: z.preprocess((val) => preprocessDate(val), z.date()).optional(),
      epistemic_status: z.string().optional(),
    }),
  ]),
>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)
});

export const collections = {
  docs,
};