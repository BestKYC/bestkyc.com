import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE } from '../consts';

export const GET: APIRoute = async (context) => {
  const reviews = (await getCollection('reviews', ({ data }) => !data.draft)).map(
    (r) => ({
      title: r.data.title,
      pubDate: r.data.published,
      description: r.data.verdict,
      link: `/reviews/${r.id}/`,
    }),
  );

  const rankings = (await getCollection('rankings', ({ data }) => !data.draft)).map(
    (r) => ({
      title: r.data.title,
      pubDate: r.data.published,
      description: r.data.description,
      link: `/rankings/${r.id}/`,
    }),
  );

  const articles = (await getCollection('articles', ({ data }) => !data.draft)).map(
    (a) => ({
      title: a.data.title,
      pubDate: a.data.published,
      description: a.data.dek,
      link: `/articles/${a.id}/`,
    }),
  );

  const feedUrl = new URL('/rss.xml', context.site ?? SITE.url).toString();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: [...reviews, ...rankings, ...articles].sort(
      (a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
    ),
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>en-us</language><atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
  });
};
