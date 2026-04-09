'use client';

import Link from 'next/link';
import { useState } from 'react';
import OrderPartsModal from '@/components/OrderPartsModal';
import { CNC360_CANONICAL_URL } from '@/lib/cnc360';

const navigation = [
  { label: 'Главная', href: '/' },
  { label: 'Блог', href: '/blog' },
  { label: 'О проекте', href: '/about' }
];

const quickLinks = [
  { label: 'Нужен аналог', href: '/blog?q=аналог' },
  { label: 'Совместимость', href: '/blog?q=совместимость' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary text-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            ПодборОборудования
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center rounded-md border border-white/30 px-3 py-2 text-sm md:hidden"
            aria-expanded={isOpen}
            aria-label="Открыть меню"
          >
            <span className="sr-only">Меню</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className="hidden items-center gap-5 md:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-white/90 hover:text-white">
                {item.label}
              </Link>
            ))}

            <div className="flex items-center gap-2 border-l border-white/20 pl-4">
              {quickLinks.map((item) => (
                <Link key={item.href} href={item.href} className="text-xs font-semibold text-white/80 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href={CNC360_CANONICAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/30 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              Каталог
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a8612a]"
            >
              Подобрать запчасть
            </button>
          </nav>
        </div>

        {isOpen ? (
          <nav className="border-t border-white/20 px-4 py-3 md:hidden">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={CNC360_CANONICAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-white/30 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Перейти в каталог
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="mt-1 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a8612a]"
                >
                  Заказать запчасти
                </button>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>

      <OrderPartsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
