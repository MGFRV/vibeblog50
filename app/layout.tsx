import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import SchemaOrg from '@/components/SchemaOrg';
import YandexMetrika from '@/components/YandexMetrika';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';
import './globals.css';

const inter = Inter({ subsets: ['cyrillic'], display: 'swap', preload: true });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'ПодборОборудования — Блог о закупках промышленного оборудования',
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml'
    }
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'ПодборОборудования — Блог о закупках промышленного оборудования',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'ПодборОборудования — Блог о закупках промышленного оборудования'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ПодборОборудования — Блог о закупках промышленного оборудования',
    description: SITE_DESCRIPTION,
    images: ['/og-default.svg']
  }
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


  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ПодборОборудования',
    description: 'Справочный проект ООО «Эффективное производство» по подбору запчастей и комплектующих для станков с ЧПУ',
    url: SITE_URL,
    parentOrganization: {
      '@type': 'Organization',
      name: 'ООО «Эффективное производство»',
      url: 'https://cnc360.ru',
      foundingDate: '1992',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ул. Коненкова, д. 4А',
        addressLocality: 'Смоленск',
        postalCode: '214000',
        addressCountry: 'RU'
      }
    }
  };

  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <link rel="canonical" href={SITE_URL + '/'} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-text antialiased`}>
        <SchemaOrg data={webSiteSchema} />
        <SchemaOrg data={organizationSchema} />
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6">{children}</main>
        <Footer />
        <ScrollToTop />
        <Suspense fallback={null}>
          <YandexMetrika />
        </Suspense>
      </body>
    </html>
  );
}
