import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import CtaBanner from '@/components/CtaBanner';
import { getAllArticles } from '@/lib/articles';
import { buildCategories } from '@/lib/categories';
import { CNC360_CANONICAL_URL } from '@/lib/cnc360';

export default function HomePage() {
  const allArticles = getAllArticles();
  const latestArticles = allArticles.slice(0, 6);
  const categories = buildCategories(allArticles);

  return (
    <div className="space-y-14">
      <section className="rounded-2xl bg-primary px-6 py-12 text-white md:px-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/60">
          Проект компании «Эффективное производство» · cnc360.ru
        </p>
        <h1 className="max-w-3xl text-3xl font-bold md:text-4xl">Всё о закупках промышленного оборудования</h1>
        <p className="mt-4 max-w-2xl text-white/85 md:text-lg">
          Экспертные статьи, чек-листы и инструкции для специалистов по снабжению
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/blog"
            className="inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Читать блог
          </Link>
          <a
            href={CNC360_CANONICAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Каталог запчастей cnc360.ru
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Последние статьи</h2>
          <Link href="/blog" className="text-sm font-semibold text-accent hover:underline">
            Все статьи
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-primary">Категории</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const total = category.count;

            return (
              <article key={category.slug} className="rounded-lg bg-surface p-5 shadow-sm">
                <h3 className="text-lg font-bold text-primary">{category.name}</h3>
                <p className="mt-2 text-sm text-text/80">{category.description}</p>
                <p className="mt-3 text-xs text-text/60">Статей: {total}</p>
                <Link href={`/blog?category=${category.slug}`} className="mt-3 inline-flex text-sm font-semibold text-accent">
                  Смотреть категорию
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
