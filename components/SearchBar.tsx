'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ArticleFrontmatter } from '@/lib/types';

interface SearchBarProps {
  articles: ArticleFrontmatter[];
  onQueryChange?: (query: string) => void;
}

export default function SearchBar({ articles, onQueryChange }: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextQuery = query.trim().toLowerCase();
      setDebouncedQuery(nextQuery);
      onQueryChange?.(nextQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [onQueryChange, query]);

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

  const showResults = isOpen && Boolean(query.trim()) && results.length > 0;

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>

        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Поиск статей..."
          className="w-full rounded-lg border border-primary/20 bg-surface py-2 pl-10 pr-3 text-sm text-text outline-none ring-accent/30 transition focus:border-accent focus:ring"
        />
      </div>

      {showResults ? (
        <ul className="absolute z-20 mt-2 w-full rounded-lg border border-primary/10 bg-surface p-2 shadow-sm">
          {results.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/blog/${article.slug}`}
                className="block rounded-md px-3 py-2 hover:bg-background"
                onClick={() => setIsOpen(false)}
              >
                <p className="text-sm font-semibold text-primary">{article.title}</p>
                <p className="text-xs text-text/70">{article.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
