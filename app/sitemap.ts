import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { buildCategories } from '@/lib/categories';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const articles = getAllArticles();
  const categories = buildCategories(articles);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      priority: 1,
      changeFrequency: 'daily'
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'daily'
    },
    {
      url: `${SITE_URL}/about/`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'weekly'
    },
    {
      url: `${SITE_URL}/author/sergey/`,
      lastModified: now,
      priority: 0.7,
      changeFrequency: 'monthly'
    }
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/blog?category=${encodeURIComponent(category.slug)}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: 'weekly'
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: article.date
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
