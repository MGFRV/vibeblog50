'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

interface HomeSearchPanelProps {
  suggestedTags: string[];
}

export default function HomeSearchPanel({ suggestedTags }: HomeSearchPanelProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      router.push('/blog');
      return;
    }

    router.push(`/blog?q=${encodeURIComponent(normalized)}`);
  };

  return (
    <section className="rounded-2xl border border-primary/10 bg-surface p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Навигация по задачам</p>
          <h2 className="mt-2 text-2xl font-bold text-primary">Найдите решение по оборудованию за 10 секунд</h2>
          <p className="mt-2 max-w-2xl text-sm text-text/70">
            Поиск по блогу работает по названиям, описаниям и тегам. Введите марку, узел или задачу: например,
            «совместимость Fanuc», «аналог энкодера», «закупка сервопривода».
          </p>
        </div>

        <Link href="/blog" className="text-sm font-semibold text-accent hover:underline">
          Открыть весь архив статей →
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Что нужно найти?"
          className="w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-sm text-text outline-none ring-accent/30 transition focus:border-accent focus:ring"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Найти статью
        </button>
      </form>

      {suggestedTags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestedTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?q=${encodeURIComponent(tag.toLowerCase())}`}
              className="rounded-full border border-primary/15 bg-background px-3 py-1.5 text-xs font-medium text-text/80 transition hover:border-accent/40 hover:text-accent"
            >
              {tag}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
