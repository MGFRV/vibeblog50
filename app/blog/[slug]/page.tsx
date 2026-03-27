import type { Metadata } from 'next';
import { getAllSlugs, getArticleBySlug } from '@/lib/articles';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  return {
    title: article ? `${article.title} | ЗакупкиПро` : 'Статья | ЗакупкиПро',
    description: article?.description
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl p-8">
        <h1 className="text-2xl font-semibold text-primary">Статья не найдена</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-semibold text-primary">{article.title}</h1>
      <p className="mt-4">{article.description}</p>
    </main>
  );
}
