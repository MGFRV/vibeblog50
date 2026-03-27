'use client';

import { useMemo, useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import type { ArticleFrontmatter } from '@/lib/types';

interface BlogPageClientProps {
  articles: ArticleFrontmatter[];
  categories: string[];
}

export default function BlogPageClient({ articles, categories }: BlogPageClientProps) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

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
    <section>
      <h1 className="text-3xl font-bold text-primary">Блог</h1>

      <div className="mt-6">
        <SearchBar articles={articles} onQueryChange={setSearchQuery} />
      </div>

      <div className="mt-4">
        <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 ? (
        <p className="mt-8 rounded-lg border border-primary/10 bg-surface p-4 text-sm text-text/70">
          По вашему запросу ничего не найдено. Попробуйте изменить категорию или поисковую фразу.
        </p>
      ) : null}
    </section>
  );
}
