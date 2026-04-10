'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import type { ArticleFrontmatter } from '@/lib/types';

interface BlogPageClientProps {
  articles: ArticleFrontmatter[];
  categories: Array<{ name: string; slug: string; count: number }>;
}

const quickQueries = ['аналог', 'совместимость', 'срочная закупка', 'серводвигатели', 'чек-лист'];

export default function BlogPageClient({ articles, categories }: BlogPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const updateUrlQuery = useCallback(
    (nextQuery: string) => {
      const normalized = nextQuery.trim().toLowerCase();
      const nextParams = new URLSearchParams(searchParams.toString());

      if (normalized) {
        nextParams.set('q', normalized);
      } else {
        nextParams.delete('q');
      }

      const nextSearch = nextParams.toString();
      const currentSearch = searchParams.toString();

      if (nextSearch === currentSearch) {
        return;
      }

      const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const categoryFromQuery = searchParams.get('category');
    const activeFromQuery = categories.find((category) => category.slug === categoryFromQuery)?.name ?? 'Все';
    const queryFromUrl = (searchParams.get('q') ?? '').trim().toLowerCase();

    setActiveCategory((prev) => (prev === activeFromQuery ? prev : activeFromQuery));
    setSearchQuery((prev) => (prev === queryFromUrl ? prev : queryFromUrl));
  }, [categories, searchParams]);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return articles.filter((article) => {
      const inCategory = activeCategory === 'Все' || article.category === activeCategory;
      if (!inCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = `${article.title} ${article.description} ${article.tags.join(' ')}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [activeCategory, articles, searchQuery]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Блог</h1>

      <div className="mt-4 rounded-xl border border-primary/10 bg-surface p-4 md:p-5">
        <p className="text-sm text-text/75">
          Используйте поиск как основной навигатор по задачам: от «нужен аналог» и «проверка совместимости» до
          «срочная закупка».
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {quickQueries.map((queryItem) => (
            <button
              key={queryItem}
              type="button"
              onClick={() => {
                const normalized = queryItem.trim().toLowerCase();
                setSearchQuery(normalized);
                updateUrlQuery(normalized);
              }}
              className="rounded-full border border-primary/15 bg-background px-3 py-1 text-xs font-medium text-text/80 transition hover:border-accent/40 hover:text-accent"
            >
              {queryItem}
            </button>
          ))}
        </div>
<<<<<<< codex/audit-and-fix-yandex-metrica-integration-wq2wze
      </div>

      <div className="mt-4">
        <SearchBar
          articles={articles}
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onSearchSubmit={updateUrlQuery}
        />
=======
>>>>>>> main
      </div>

      <div className="mt-4">
        <SearchBar
          articles={articles}
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onSearchSubmit={updateUrlQuery}
        />
      </div>

      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-slate-600">
          По вашему запросу ничего не найдено. Попробуйте изменить категорию или поисковую фразу.
        </div>
      ) : null}
    </div>
  );
}
