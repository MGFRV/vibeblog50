import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import BlogPageClient from '@/components/BlogPageClient';
import BlogPageContent from '@/components/BlogPageContent';
import CategoryFilter from '@/components/CategoryFilter';
import { getAllArticles } from '@/lib/articles';
import { buildCategories } from '@/lib/categories';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

interface CategoryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const categories = buildCategories(getAllArticles());
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = buildCategories(getAllArticles());
  const category = categories.find((item) => item.slug === params.slug);

  if (!category) {
    return {
      title: 'Категория не найдена | ПодборОборудования'
    };
  }

  const canonical = `${SITE_URL}/blog/category/${category.slug}/`;

  return {
    title: `${category.name} | Блог ${SITE_NAME}`,
    description: category.description,
    alternates: {
      canonical
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const allArticles = getAllArticles().map(({ content: _content, ...frontmatter }) => frontmatter);
  const categories = buildCategories(allArticles);
  const category = categories.find((item) => item.slug === params.slug);

  if (!category) {
    notFound();
  }

  const articles = allArticles.filter((article) => article.category === category.name);

  const staticFallback = (
    <div className="rounded-xl border border-primary/10 bg-surface p-4 md:p-5">
      <p className="text-sm text-text/75">{category.description}</p>
      <div className="mt-4">
        <BlogPageContent articles={articles} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{category.name}</h1>
      <p className="text-sm text-text/75">{category.description}</p>

      <CategoryFilter categories={categories} activeSlug={category.slug} />

      <Suspense fallback={staticFallback}>
        <BlogPageClient articles={articles} showQuickQueries={false} />
      </Suspense>
    </div>
  );
}
