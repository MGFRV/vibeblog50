'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    const categoryFromQuery = searchParams.get('category');
    const activeFromQuery =
      categories.find((category) => category.slug === categoryFromQuery)?.name ?? 'Все';
    const queryFromUrl = searchParams.get('q') ?? '';

    setActiveCategory(activeFromQuery);
    setSearchQuery(queryFromUrl);
  }, [categories, searchParams]);

  function updateUrlQuery(nextQuery: string) {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextQuery) {
      nextParams.set('q', nextQuery);
    } else {
      nextParams.delete('q');
    }

    const nextSearch = nextParams.toString();
    const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }

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

      <p className="text-slate-600">
        Используйте поиск как основной навигатор по задачам: от «нужен аналог» и «проверка
        совместимости» до «срочная закупка».
      </p>

      <SearchBar
        articles={articles}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSearchSubmit={updateUrlQuery}
      />

      <div className="flex flex-wrap gap-2">
        {quickQueries.map((queryItem) => (
          <button
            key={queryItem}
            type="button"
            onClick={() => {
              setSearchQuery(queryItem);
              updateUrlQuery(queryItem);
            }}
            className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50"
          >
            {queryItem}
          </button>
        ))}
      </div>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
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
