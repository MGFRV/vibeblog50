import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap' });

export const metadata: Metadata = {
  title: 'ЗакупкиПро',
  description: 'B2B-блог о закупках промышленного оборудования и запчастей в РФ.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
