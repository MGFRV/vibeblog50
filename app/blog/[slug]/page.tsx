import type { Metadata } from 'next';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Статья | ЗакупкиПро'
  };
}

export default function ArticlePage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-semibold text-primary">Статья</h1>
      <p className="mt-4">Контент статьи будет добавлен позже.</p>
    </main>
  );
}
