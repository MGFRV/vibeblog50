import { Suspense } from 'react';
import BlogPageClient from '@/components/BlogPageClient';
import BlogPageContent from '@/components/BlogPageContent';
import CategoryFilter from '@/components/CategoryFilter';
import { getAllArticles } from '@/lib/articles';
import { buildCategories } from '@/lib/categories';

export default function BlogPage() {
  const articles = getAllArticles().map(({ content: _content, ...frontmatter }) => frontmatter);
  const categories = buildCategories(articles);

  const staticFallback = (
    <div className="rounded-xl border border-primary/10 bg-surface p-4 md:p-5">
      <p className="text-sm text-text/75">
        Каталог статей по подбору, совместимости и закупке промышленного оборудования.
      </p>
      <div className="mt-4">
        <BlogPageContent articles={articles} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Блог</h1>

      <CategoryFilter categories={categories} />

      <Suspense fallback={staticFallback}>
        <BlogPageClient articles={articles} />
      </Suspense>
    </div>
  );
}
