import { SITE } from '../consts';

type JsonLd = Record<string, unknown>;

const absolute = (path: string): string =>
  path.startsWith('http') ? path : new URL(path, SITE.url).toString();

export const organizationSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: absolute('/logo.svg'),
  sameAs: [],
});

export const websiteSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
});

export interface Crumb {
  label: string;
  href?: string;
}

export const breadcrumbSchema = (crumbs: Crumb[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    ...(c.href ? { item: absolute(c.href) } : {}),
  })),
});

export interface SoftwareAppInput {
  name: string;
  url: string;
  category: string;
  description?: string;
  operatingSystem?: string;
  rating?: { value: number; count: number; best?: number };
}

export const softwareAppSchema = (app: SoftwareAppInput): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: app.name,
  url: app.url,
  applicationCategory: app.category,
  ...(app.description && { description: app.description }),
  ...(app.operatingSystem && { operatingSystem: app.operatingSystem }),
  ...(app.rating && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: app.rating.value,
      reviewCount: app.rating.count,
      bestRating: app.rating.best ?? 5,
    },
  }),
});

export interface ReviewInput {
  vendor: string;
  vendorUrl: string;
  category: string;
  rating: number;
  best?: number;
  author: string;
  datePublished: string;
  reviewBody: string;
}

export const reviewSchema = (r: ReviewInput): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'SoftwareApplication',
    name: r.vendor,
    url: r.vendorUrl,
    applicationCategory: r.category,
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: r.rating,
    bestRating: r.best ?? 5,
  },
  author: { '@type': 'Person', name: r.author },
  datePublished: r.datePublished,
  reviewBody: r.reviewBody,
  publisher: { '@type': 'Organization', name: SITE.name },
});
