import BlogPageClient from '@/components/BlogPageClient';
import { getAllArticles } from '@/lib/articles';
import { buildCategories } from '@/lib/categories';

export default function BlogPage() {
  const articles = getAllArticles().map(({ content: _content, ...frontmatter }) => frontmatter);
  const categories = buildCategories(articles);

  return <BlogPageClient articles={articles} categories={categories} />;
}
