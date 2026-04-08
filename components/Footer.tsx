import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { buildCategories } from '@/lib/categories';

export default function Footer() {
  const categories = buildCategories(getAllArticles());

  return (
    <footer className="mt-16 bg-text text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 md:px-6">
        <div>
          <Link href="/" className="text-xl font-bold">
            ПодборОборудования
          </Link>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            Экспертный B2B-блог о выборе и закупке промышленного оборудования и запчастей в РФ.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">Категории</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/blog?category=${category.slug}`} className="hover:text-white">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">Запчасти для ЧПУ</h3>
          <p className="mt-3 text-sm text-white/70">
            Серводвигатели, энкодеры, платы управления, дисплеи для станков Fanuc, Siemens, Heidenhain.
          </p>
          <a
            href="https://cnc360.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent/80"
          >
            Каталог cnc360.ru
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">Контакты</h3>
          <a className="mt-3 inline-block text-sm text-white/70 hover:text-white" href="mailto:info@cnc360.ru">
            info@cnc360.ru
          </a>
        </div>
      </div>

      {/* Брендинг cnc360 */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 text-center md:flex-row md:justify-between md:px-6 md:text-left">
          <p className="text-sm text-white/70">
            Проект компании{' '}
            <a
              href="https://cnc360.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-accent"
            >
              «Эффективное производство»
            </a>{' '}
            — поставка запчастей для станков с ЧПУ с 2005 года. Склад в Москве и Смоленске.
          </p>
          <a
            href="https://cnc360.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a8612a]"
          >
            cnc360.ru →
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/60 md:px-6">© 2025 ПодборОборудования</p>
      </div>
    </footer>
  );
}
