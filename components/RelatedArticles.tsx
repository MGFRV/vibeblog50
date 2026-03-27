import type { ArticleFrontmatter } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';

interface RelatedArticlesProps {
  articles: ArticleFrontmatter[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-primary">Похожие статьи</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
