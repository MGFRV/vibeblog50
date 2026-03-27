import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="mt-16 bg-text text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <Link href="/" className="text-xl font-bold">
            ЗакупкиПро
          </Link>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            Экспертный B2B-блог о выборе и закупке промышленного оборудования и запчастей в РФ.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">Категории</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link href={`/blog?category=${category.slug}`} className="hover:text-white">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">Контакты</h3>
          <a className="mt-3 inline-block text-sm text-white/70 hover:text-white" href="mailto:info@zakupkipro.ru">
            info@zakupkipro.ru
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/60 md:px-6">© 2025 ЗакупкиПро</p>
      </div>
    </footer>
  );
}
