import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categoryEnum = z.enum(['kyc', 'kyb', 'aml', 'fraud']);

const vendors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/vendors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      slug: z.string().optional(),
      website: z.string().url(),
      logo: image().optional(),
      categories: z.array(categoryEnum).nonempty(),
      regions: z.array(z.string()).default([]),
      pricingModel: z
        .enum(['per-verification', 'subscription', 'enterprise', 'custom', 'unknown'])
        .default('unknown'),
      foundedYear: z.number().int().optional(),
      headquarters: z.string().optional(),
      summary: z.string(),
      strengths: z.array(z.string()).default([]),
      weaknesses: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      teamRole: z.enum(['operator', 'contributor']).optional(),
      updated: z.coerce.date(),
    }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    vendor: reference('vendors'),
    category: categoryEnum,
    rating: z.number().min(0).max(5),
    verdict: z.string(),
    reviewer: z.string(),
    reviewerRole: z.string().optional(),
    disclosures: z.array(z.string()).default([]),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const rankings = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/rankings' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: categoryEnum,
      year: z.number().int(),
      description: z.string(),
      methodology: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      entries: z
        .array(
          z.object({
            rank: z.number().int().positive(),
            vendor: reference('vendors'),
            note: z.string().optional(),
            bestFor: z.string().optional(),
            pick: z.enum(['editors', 'best-value', 'best-enterprise']).optional(),
          }),
        )
        .nonempty(),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      draft: z.boolean().default(false),
    }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      dek: z.string(),
      author: z.string().default('BestKYC Editorial'),
      categories: z.array(categoryEnum).default([]),
      image: image().optional(),
      imageAlt: z.string().optional(),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { vendors, reviews, rankings, articles };
