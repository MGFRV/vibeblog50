'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { trackCnc360Click } from '@/lib/cnc360';

const OrderPartsModal = dynamic(() => import('@/components/OrderPartsModal'), { ssr: false });

interface HeaderLinkItem {
  label: string;
  href: string;
}

interface HeaderClientControlsProps {
  mode: 'mobile' | 'desktop';
  navigation: HeaderLinkItem[];
  quickLinks: HeaderLinkItem[];
  cnc360Url: string;
}

export default function HeaderClientControls({ mode, navigation, quickLinks, cnc360Url }: HeaderClientControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (mode === 'desktop') {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a8612a]"
        >
          Подобрать запчасть
        </button>
        {isModalOpen ? <OrderPartsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> : null}
      </>
    );
  }

  return (
    <>
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
                href={cnc360Url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md border border-white/30 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                onClick={() => {
                  setIsOpen(false);
                  trackCnc360Click();
                }}
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

      {isModalOpen ? <OrderPartsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> : null}
    </>
  );
}
