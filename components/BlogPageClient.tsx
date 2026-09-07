'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import BlogPageContent from '@/components/BlogPageContent';
import SearchBar from '@/components/SearchBar';
import type { ArticleFrontmatter } from '@/lib/types';

interface BlogPageClientProps {
  articles: ArticleFrontmatter[];
}

export default function BlogPageClient({ articles }: BlogPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
    const queryFromUrl = (searchParams.get('q') ?? '').trim().toLowerCase();
    setSearchQuery((prev) => (prev === queryFromUrl ? prev : queryFromUrl));
  }, [searchParams]);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return articles;
    }

    return articles.filter((article) => {
      const haystack = `${article.title} ${article.description} ${article.tags.join(' ')}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [articles, searchQuery]);

  return (
    <div className="space-y-6">
      <SearchBar
        articles={articles}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSearchSubmit={updateUrlQuery}
      />

      <BlogPageContent articles={filteredArticles} />

      {filteredArticles.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-slate-600">
          По вашему запросу ничего не найдено. Попробуйте изменить поисковую фразу.
        </div>
      ) : null}
    </div>
  );
}
