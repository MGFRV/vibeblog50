import Link from 'next/link';
import { CNC360_CANONICAL_URL } from '@/lib/cnc360';
import Cnc360OutboundLink from '@/components/Cnc360OutboundLink';
import HeaderClientControls from '@/components/HeaderClientControls';

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
  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          ПодборОборудования
        </Link>

        <HeaderClientControls mode="mobile" navigation={navigation} quickLinks={quickLinks} cnc360Url={CNC360_CANONICAL_URL} />

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

          <Cnc360OutboundLink
            href={CNC360_CANONICAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/30 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            Каталог
          </Cnc360OutboundLink>

          <HeaderClientControls mode="desktop" navigation={navigation} quickLinks={quickLinks} cnc360Url={CNC360_CANONICAL_URL} />
        </nav>
      </div>
    </header>
  );
}
