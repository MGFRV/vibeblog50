import ArticleCard from '@/components/ArticleCard';
import type { ArticleFrontmatter } from '@/lib/types';

interface BlogPageContentProps {
  articles: ArticleFrontmatter[];
}

export default function BlogPageContent({ articles }: BlogPageContentProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
