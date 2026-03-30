import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/constants';

const STATIC_LAST_MODIFIED = '2025-12-17';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: STATIC_LAST_MODIFIED,
      priority: 1,
      changeFrequency: 'weekly'
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: STATIC_LAST_MODIFIED,
      priority: 0.9,
      changeFrequency: 'weekly'
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: STATIC_LAST_MODIFIED,
      priority: 0.5,
      changeFrequency: 'monthly'
    }
  ];

  const articles = getAllArticles()
    .filter((article) => article.slug !== 'test-article')
    .map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: article.date
    }));

  return [...staticPages, ...articles];
}
