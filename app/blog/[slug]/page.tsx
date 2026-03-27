import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import RelatedArticles from '@/components/RelatedArticles';
import SchemaOrg from '@/components/SchemaOrg';
import ShareButtons from '@/components/ShareButtons';
import TableOfContents from '@/components/TableOfContents';
import { AUTHOR, SITE_NAME, SITE_URL } from '@/lib/constants';
import { getAllSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/articles';

interface ArticlePageProps {
  params: { slug: string };
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-');
}

function extractHeadings(content: string): Heading[] {
  return content
    .split('\n')
    .map((line) => {
      const match = /^(##|###)\s+(.+)$/.exec(line.trim());
      if (!match) {
        return null;
      }

      const level = match[1].length;
      const text = match[2].trim();
      return {
        id: slugify(text),
        text,
        level
      };
    })
    .filter((value): value is Heading => value !== null);
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Статья не найдена | ЗакупкиПро'
    };
  }

  const canonical = `${SITE_URL}/blog/${article.slug}`;

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.description,
    alternates: {
      canonical
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article'
    }
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const headings = extractHeadings(article.content);
  const related = getRelatedArticles(article.slug, article.category, 3).map(({ content: _content, ...item }) => item);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: AUTHOR
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME
    },
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`
  };

  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Блог', href: '/blog' },
    { label: article.category },
    { label: article.title }
  ];

  return (
    <>
      <SchemaOrg data={articleSchema} />
      <Breadcrumbs items={breadcrumbs} />

      <article>
        <h1 className="text-3xl font-bold text-primary md:text-4xl">{article.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-text/70">
          <time dateTime={article.date}>{article.date}</time>
          <span>•</span>
          <span>{article.readingTime} мин чтения</span>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{article.category}</span>
        </div>

        <div className="mt-5">
          <ShareButtons title={article.title} url={`${SITE_URL}/blog/${article.slug}`} />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
          <div>
            <div className="lg:hidden">
              <TableOfContents headings={headings} />
            </div>
            <div className="prose max-w-none prose-headings:font-bold prose-headings:text-primary">
              <MDXRemote
                source={article.content}
                options={{
                  mdxOptions: {
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: 'append'
                        }
                      ]
                    ]
                  }
                }}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <TableOfContents headings={headings} />
          </div>
        </div>
      </article>

      <FAQ items={article.faq} />
      <RelatedArticles articles={related} />
    </>
  );
}
