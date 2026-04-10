import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import CtaBanner from '@/components/CtaBanner';
import HomeSearchPanel from '@/components/HomeSearchPanel';
import TopicHubSection from '@/components/TopicHubSection';
import { getAllArticles } from '@/lib/articles';
import { buildCategories } from '@/lib/categories';
import { CNC360_CANONICAL_URL } from '@/lib/cnc360';

const quickScenarios = [
  {
    title: 'Нужен аналог детали',
    description: 'Подбор замен и проверка совместимости перед закупкой.',
    href: '/blog?q=аналог',
    cta: 'Найти материалы'
  },
  {
    title: 'Проверить совместимость',
    description: 'Чек-листы по артикулам, брендам и узлам станков ЧПУ.',
    href: '/blog?q=совместимость',
    cta: 'Спросить по совместимости'
  },
  {
    title: 'Срочная закупка',
    description: 'Как сократить сроки и риски в аварийных поставках.',
    href: '/blog?q=срочная закупка',
    cta: 'Открыть сценарий'
  }
];

const conversionPaths = [
  {
    title: 'Перейти в каталог',
    description: 'Откройте каталог комплектующих для ЧПУ с готовыми позициями.',
    href: CNC360_CANONICAL_URL,
    cta: 'В каталог cnc360'
  },
  {
    title: 'Подобрать запчасть',
    description: 'Оставьте заявку с моделью станка и артикулом — поможем подобрать вариант.',
    href: '#order-parts',
    cta: 'Заказать запчасти'
  },
  {
    title: 'Нужна консультация по аналогам',
    description: 'Для сложных позиций начните с подборки статей и переходите к запросу.',
    href: '/blog?q=аналог',
    cta: 'Нужен аналог'
  }
];

export default function HomePage() {
  const allArticles = getAllArticles();
  const latestArticles = allArticles.slice(0, 6);
  const categories = buildCategories(allArticles);

  const hubs = categories.slice(0, 3).map((category) => ({
    ...category,
    articles: allArticles
      .filter((article) => article.category === category.name)
      .slice(0, 3)
      .map(({ content: _content, ...frontmatter }) => frontmatter)
  }));

  const suggestedTags = [...new Set(allArticles.flatMap((article) => article.tags))].slice(0, 10);

  return (
    <div className="space-y-14">
      <section className="rounded-2xl bg-primary px-6 py-12 text-white md:px-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/60">
          Проект компании «Эффективное производство» · cnc360.ru
        </p>
        <h1 className="max-w-3xl text-3xl font-bold md:text-4xl">Всё о закупках промышленного оборудования</h1>
        <p className="mt-4 max-w-2xl text-white/85 md:text-lg">
          База практических материалов для снабжения: подбор, совместимость, закупка, проверка поставщиков,
          снижение рисков и затрат.
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
            Перейти в каталог
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {quickScenarios.map((scenario) => (
            <Link
              key={scenario.title}
              href={scenario.href}
              className="rounded-lg border border-white/15 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <p className="text-sm font-semibold text-white">{scenario.title}</p>
              <p className="mt-1 text-xs text-white/75">{scenario.description}</p>
              <span className="mt-3 inline-flex text-xs font-semibold text-accent">{scenario.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <HomeSearchPanel suggestedTags={suggestedTags} />

      <TopicHubSection hubs={hubs} />

      <section className="rounded-2xl border border-primary/10 bg-surface p-6 shadow-sm md:p-8" id="order-parts">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Следующий шаг</p>
            <h2 className="mt-2 text-2xl font-bold text-primary">Нужны запчасти сейчас? Выберите удобный путь</h2>
            <p className="mt-2 max-w-2xl text-sm text-text/70">
              Для срочных и нестандартных задач используйте быстрый переход в каталог или начните с материалов по
              подбору и совместимости.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {conversionPaths.map((path) => {
            const isExternal = path.href.startsWith('http');

            return (
              <article key={path.title} className="rounded-xl border border-primary/10 bg-background p-4">
                <h3 className="text-base font-semibold text-primary">{path.title}</h3>
                <p className="mt-2 text-sm text-text/70">{path.description}</p>
                <Link
                  href={path.href}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="mt-4 inline-flex text-sm font-semibold text-accent hover:underline"
                >
                  {path.cta} →
                </Link>
              </article>
            );
          })}
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
          {latestArticles.map((article) => {
            const { content: _content, ...frontmatter } = article;
            return <ArticleCard key={article.slug} article={frontmatter} />;
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-primary">Все категории</h2>
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
