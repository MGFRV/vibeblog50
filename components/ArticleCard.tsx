import Link from 'next/link';
import type { ArticleFrontmatter } from '@/lib/types';

interface ArticleCardProps {
  article: ArticleFrontmatter;
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="rounded-lg bg-surface p-5 shadow-sm transition hover:shadow-md">
      <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
        {article.category}
      </span>

      <h3 className="mt-3 text-xl font-bold text-primary">
        <Link href={`/blog/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-text/80">{article.description}</p>

      <div className="mt-4 flex items-center gap-3 text-xs text-text/60">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span>•</span>
        <span>{article.readingTime} мин чтения</span>
      </div>
    </article>
  );
}
