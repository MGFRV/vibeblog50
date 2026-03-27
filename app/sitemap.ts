import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      priority: 1,
      changeFrequency: 'weekly'
    },
    {
      url: `${SITE_URL}/blog`,
      priority: 0.9,
      changeFrequency: 'weekly'
    },
    {
      url: `${SITE_URL}/about`,
      priority: 0.5,
      changeFrequency: 'monthly'
    }
  ];

  const articles = getAllArticles().map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: article.date
  }));

  return [...staticPages, ...articles];
}
