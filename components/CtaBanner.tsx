import Link from 'next/link';
import { CNC360_CANONICAL_URL } from '@/lib/cnc360';
import Cnc360OutboundLink from '@/components/Cnc360OutboundLink';

export default function CtaBanner() {
  return (
    <div className="my-12 overflow-hidden rounded-xl bg-[#0F4C3A] text-white">
      {/* Верхняя полоска-бейдж */}
      <div className="bg-white/10 px-6 py-2 text-xs font-medium tracking-wide text-white/80">
        ПРОЕКТ КОМПАНИИ «ЭФФЕКТИВНОЕ ПРОИЗВОДСТВО» · ПОСТАВКИ С 2005 ГОДА
      </div>

      <div className="p-6 md:p-8">
        <h3 className="mb-2 text-xl font-bold md:text-2xl">
          Нужны комплектующие к станкам с ЧПУ?
        </h3>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-gray-200 md:text-base">
          Поставляем серводвигатели, энкодеры, платы управления, дисплеи и другие запчасти
          для&nbsp;станков Fanuc, Siemens, Heidenhain, Mitsubishi. Прямые поставки из Китая
          и&nbsp;Европы, склад в&nbsp;Москве и&nbsp;Смоленске. Включая бренды, недоступные
          на&nbsp;российском рынке.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Cnc360OutboundLink
            href={CNC360_CANONICAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C87533] px-6 py-3 font-semibold text-white transition hover:bg-[#a8612a]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              <circle cx="7" cy="6" r="1" fill="currentColor" stroke="none" />
              <circle cx="7" cy="12" r="1" fill="currentColor" stroke="none" />
              <circle cx="7" cy="18" r="1" fill="currentColor" stroke="none" />
            </svg>
            Смотреть каталог cnc360.ru
          </Cnc360OutboundLink>

          <Link
            href="mailto:info@cnc360.ru?subject=%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D0%BD%D0%B0%20%D0%B7%D0%B0%D0%BF%D1%87%D0%B0%D1%81%D1%82%D0%B8"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12h6M12 9v6" strokeLinecap="round" />
              <rect x="3" y="5" width="18" height="14" rx="2" />
            </svg>
            Оставить заявку на поставку
          </Link>
        </div>

        {/* Примеры запчастей */}
        <div className="mt-6 flex flex-wrap gap-2">
          {['Fanuc', 'Siemens', 'Heidenhain', 'Mitsubishi', 'Omron', 'Yaskawa'].map((brand) => (
            <span key={brand} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
