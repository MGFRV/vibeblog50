import Link from 'next/link';
import type { ArticleFrontmatter } from '@/lib/types';

interface TopicHubItem {
  name: string;
  slug: string;
  description: string;
  count: number;
  articles: ArticleFrontmatter[];
}

interface TopicHubSectionProps {
  hubs: TopicHubItem[];
}

export default function TopicHubSection({ hubs }: TopicHubSectionProps) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Тематические хабы</p>
          <h2 className="mt-2 text-2xl font-bold text-primary">Выберите направление и начните с ключевых материалов</h2>
        </div>
        <Link href="/blog" className="text-sm font-semibold text-accent hover:underline">
          Перейти ко всем статьям
        </Link>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {hubs.map((hub) => (
          <article key={hub.slug} className="rounded-xl border border-primary/10 bg-surface p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent/90">{hub.count} статей</p>
            <h3 className="mt-2 text-lg font-bold text-primary">
              <Link href={`/blog?category=${hub.slug}`} className="hover:underline">
                {hub.name}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-text/75">{hub.description}</p>

            <ul className="mt-4 space-y-2">
              {hub.articles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/blog/${article.slug}`} className="text-sm text-primary hover:text-accent hover:underline">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/blog?category=${hub.slug}`}
              className="mt-4 inline-flex text-sm font-semibold text-accent hover:underline"
            >
              Открыть хаб →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
