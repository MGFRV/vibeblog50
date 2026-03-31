import BlogPageClient from '@/components/BlogPageClient';
import { CATEGORIES } from '@/lib/constants';
import { getAllArticles } from '@/lib/articles';

export default function BlogPage() {
  const articles = getAllArticles().map(({ content: _content, ...frontmatter }) => frontmatter);
  const categories = CATEGORIES.map((category) => ({
    name: category.name,
    count: articles.filter((article) => article.category === category.name).length
  }));

  return <BlogPageClient articles={articles} categories={categories} />;
}
