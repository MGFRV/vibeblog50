import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap' });

export const metadata: Metadata = {
  title: 'ЗакупкиПро — Блог о закупках промышленного оборудования',
  description: SITE_DESCRIPTION
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="ru">
      <body className={`${inter.className} min-h-screen bg-background text-text antialiased`}>
        <SchemaOrg data={webSiteSchema} />
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
