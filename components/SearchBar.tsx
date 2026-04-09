'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ArticleFrontmatter } from '@/lib/types';

interface SearchBarProps {
  articles: ArticleFrontmatter[];
  query: string;
  onQueryChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}

export default function SearchBar({
  articles,
  query,
  onQueryChange,
  onSearchSubmit,
}: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState(query);
  const [debouncedQuery, setDebouncedQuery] = useState(query.trim().toLowerCase());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setInputValue(query);
    setDebouncedQuery(query.trim().toLowerCase());
  }, [query]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextQuery = inputValue.trim().toLowerCase();
      setDebouncedQuery(nextQuery);
      onQueryChange?.(nextQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, onQueryChange]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const results = useMemo(() => {
    if (!debouncedQuery) {
      return [];
    }

    return articles
      .filter((article) => {
        const haystack = `${article.title} ${article.description} ${article.tags.join(' ')}`.toLowerCase();
        return haystack.includes(debouncedQuery);
      })
      .slice(0, 5);
  }, [articles, debouncedQuery]);

  const showResults = isOpen && Boolean(inputValue.trim()) && results.length > 0;

  function submitSearch() {
    const normalized = inputValue.trim().toLowerCase();
    onQueryChange?.(normalized);
    onSearchSubmit?.(normalized);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative flex gap-2">
        <input
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              submitSearch();
            }
          }}
          placeholder="Поиск статей..."
          className="w-full rounded-lg border border-primary/20 bg-surface py-2 pl-10 pr-3 text-sm text-text outline-none ring-accent/30 transition focus:border-accent focus:ring"
        />

        <button
          type="button"
          onClick={submitSearch}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Искать
        </button>
      </div>

      {showResults ? (
        <ul className="absolute z-10 mt-2 w-full rounded-lg border bg-white shadow-lg">
          {results.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/blog/${article.slug}`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 hover:bg-slate-50"
              >
                <div className="text-sm font-medium">{article.title}</div>
                <div className="mt-1 text-xs text-slate-500">{article.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
