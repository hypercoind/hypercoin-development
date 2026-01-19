import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['live', 'development', 'planning']),
    tech: z.array(z.string()),
    siteUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    icon: z.string().optional(),
    featured: z.boolean().default(false),
    sortOrder: z.number().default(0),
  }),
});

export const collections = { projects };
