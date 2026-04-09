'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type React from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState(query);
  const [debouncedQuery, setDebouncedQuery] = useState(query.trim().toLowerCase());
  const [isOpen, setIsOpen] = useState(false);
  const lastEmittedQueryRef = useRef(query.trim().toLowerCase());

  useEffect(() => {
    if (query !== inputValue) {
      setInputValue(query);
    }

    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery !== debouncedQuery) {
      setDebouncedQuery(normalizedQuery);
    }

    lastEmittedQueryRef.current = normalizedQuery;
  }, [query, inputValue, debouncedQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextQuery = inputValue.trim().toLowerCase();

      if (nextQuery !== debouncedQuery) {
        setDebouncedQuery(nextQuery);
      }

      if (nextQuery !== lastEmittedQueryRef.current) {
        lastEmittedQueryRef.current = nextQuery;
        onQueryChange?.(nextQuery);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, debouncedQuery, onQueryChange]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

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

  const submitSearch = () => {
    const normalized = inputValue.trim().toLowerCase();

    if (normalized !== lastEmittedQueryRef.current) {
      lastEmittedQueryRef.current = normalized;
      onQueryChange?.(normalized);
    }

    onSearchSubmit?.(normalized);
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch();
  };

  return (
    <div className="relative" ref={containerRef}>
      <form className="relative" onSubmit={handleSubmit}>
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
          className="w-full rounded-lg border border-primary/20 bg-surface py-2 pl-10 pr-28 text-sm text-text outline-none ring-accent/30 transition focus:border-accent focus:ring"
        />

        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary/90"
        >
          Найти
        </button>
      </form>

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
