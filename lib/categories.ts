import { CATEGORIES } from '@/lib/constants';
import type { ArticleFrontmatter } from '@/lib/types';

export interface CategoryItem {
  name: string;
  slug: string;
  description: string;
  count: number;
}

export function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function buildCategories(articles: ArticleFrontmatter[]): CategoryItem[] {
  const counts = new Map<string, number>();

  for (const article of articles) {
    counts.set(article.category, (counts.get(article.category) ?? 0) + 1);
  }

  const knownByName = new Map(CATEGORIES.map((category) => [category.name, category]));

  return [...counts.entries()]
    .map(([name, count]) => {
      const known = knownByName.get(name);

      return {
        name,
        slug: known?.slug ?? slugifyCategory(name),
        description: known?.description ?? 'Статьи по категории',
        count
      };
    })
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ru'));
}

export function resolveCategoryBySlug(categories: Array<{ name: string; slug: string }>, slug?: string): string {
  if (!slug) {
    return 'Все';
  }

  const found = categories.find((category) => category.slug === slug);
  return found?.name ?? 'Все';
}
