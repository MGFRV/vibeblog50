import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Article, ArticleFrontmatter, Category, FAQItem } from '@/lib/types';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

function isFAQItem(value: unknown): value is FAQItem {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const item = value as Partial<FAQItem>;
  return typeof item.question === 'string' && typeof item.answer === 'string';
}

function parseFrontmatter(data: unknown): ArticleFrontmatter {
  if (!data || typeof data !== 'object') {
    throw new Error('Неверный формат frontmatter: ожидается объект.');
  }

  const frontmatter = data as Partial<ArticleFrontmatter>;

  if (
    typeof frontmatter.title !== 'string' ||
    typeof frontmatter.slug !== 'string' ||
    typeof frontmatter.description !== 'string' ||
    typeof frontmatter.category !== 'string' ||
    !Array.isArray(frontmatter.tags) ||
    typeof frontmatter.date !== 'string' ||
    typeof frontmatter.readingTime !== 'number' ||
    !Array.isArray(frontmatter.faq)
  ) {
    throw new Error('Неверный формат frontmatter: отсутствуют обязательные поля.');
  }

  if (!frontmatter.tags.every((tag) => typeof tag === 'string')) {
    throw new Error('Неверный формат frontmatter: tags должны быть массивом строк.');
  }

  if (!frontmatter.faq.every(isFAQItem)) {
    throw new Error('Неверный формат frontmatter: faq должен быть массивом FAQItem.');
  }

  return {
    title: frontmatter.title,
    slug: frontmatter.slug,
    description: frontmatter.description,
    category: frontmatter.category as Category,
    tags: frontmatter.tags,
    date: frontmatter.date,
    readingTime: frontmatter.readingTime,
    faq: frontmatter.faq
  };
}

function getArticleFiles(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  return fs.readdirSync(ARTICLES_DIR).filter((fileName) => fileName.endsWith('.mdx'));
}

export function getAllArticles(): Article[] {
  const fileNames = getArticleFiles();

  const articles = fileNames.map((fileName) => {
    const fullPath = path.join(ARTICLES_DIR, fileName);
    const source = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(source);
    const frontmatter = parseFrontmatter(data);

    return {
      ...frontmatter,
      content
    };
  });

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getRelatedArticles(
  currentSlug: string,
  category: Category,
  count = 3
): Article[] {
  const articles = getAllArticles().filter((article) => article.slug !== currentSlug);
  const sameCategory = articles.filter((article) => article.category === category);

  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }

  const remaining = count - sameCategory.length;
  const fallback = articles
    .filter((article) => article.category !== category)
    .slice(0, remaining);

  return [...sameCategory, ...fallback];
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}

export function getAllTags(): string[] {
  const allTags = getAllArticles().flatMap((article) => article.tags);
  return [...new Set(allTags)];
}
