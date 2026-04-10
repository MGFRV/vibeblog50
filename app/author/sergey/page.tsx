import type { Metadata } from 'next';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Сергей С. — главный редактор ПодборОборудования',
  description:
    '20 лет в поставках запчастей для ЧПУ. Главный редактор проекта ПодборОборудования от ООО «Эффективное производство».',
  alternates: {
    canonical: '/author/sergey/'
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'profile',
    siteName: 'ПодборОборудования',
    locale: 'ru_RU',
    title: 'Сергей С. — главный редактор ПодборОборудования',
    description:
      '20 лет в поставках запчастей для ЧПУ. Главный редактор проекта ПодборОборудования от ООО «Эффективное производство».',
    url: `${SITE_URL}/author/sergey/`
  }
};

export default function SergeyAuthorPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Сергей С.',
    jobTitle: 'Главный редактор',
    description: '20 лет в поставках запчастей и комплектующих для станков с ЧПУ',
    url: `${SITE_URL}/author/sergey/`,
    worksFor: {
      '@type': 'Organization',
      name: 'ПодборОборудования',
      url: SITE_URL
    },
    knowsAbout: [
      'станки с ЧПУ',
      'запчасти для ЧПУ',
      'FANUC',
      'Siemens CNC',
      'HEIDENHAIN',
      'Renishaw',
      'модернизация станков',
      'промышленная электроника'
    ]
  };

  return (
    <main>
      <SchemaOrg data={personSchema} />
      <article className="mx-auto max-w-4xl space-y-8" itemScope itemType="https://schema.org/Person">
        <header className="flex flex-col gap-4 rounded-xl border border-primary/10 bg-surface p-6 sm:flex-row sm:items-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary"
            aria-label="Фото автора"
          >
            СС
          </div>

          <div>
            <h1 className="text-3xl font-bold text-primary" itemProp="name">
              Сергей С.
            </h1>
            <p className="mt-1 text-sm text-text/70" itemProp="jobTitle">
              Главный редактор · ПодборОборудования
            </p>
            <p className="mt-2 text-text/85">20 лет в поставках запчастей и комплектующих для станков с ЧПУ</p>
          </div>
        </header>

        <section className="space-y-4 text-text/85">
          <h2 className="text-2xl font-bold text-primary">Об авторе</h2>
          <p itemProp="description">
            Сергей занимается поставками комплектующих для ЧПУ-оборудования более 20 лет. За это время прошёл путь от
            технического специалиста до руководителя направления. Работал с брендами FANUC, Siemens, HEIDENHAIN,
            Renishaw, Balluff — знает не только каталоги, но и реальные условия эксплуатации на производстве.
          </p>
          <p>
            Как главный редактор проекта <strong>ПодборОборудования</strong> отвечает за точность технических
            описаний, актуальность цен и корректность подборок. Все материалы сайта проходят проверку на основе
            практического опыта работы с предприятиями нефтегазовой, автомобильной и авиационной отраслей.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">Экспертиза</h2>
          <ul className="list-disc space-y-2 pl-6 text-text/85">
            <li>Подбор запчастей для станков с ЧПУ (FANUC, Siemens, HEIDENHAIN)</li>
            <li>Поставки из Китая и Европы, в том числе ранее недоступных в РФ брендов</li>
            <li>Диагностика и ремонт промышленной электроники</li>
            <li>Модернизация систем управления ЧПУ</li>
            <li>Комплектование новых станков и после капитального ремонта</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">Организация</h2>
          <p>
            Представляет проект <strong>ПодборОборудования</strong> — медийную инициативу компании{' '}
            <a
              href="https://cnc360.ru"
              rel="noopener noreferrer"
              target="_blank"
              className="font-semibold text-accent hover:underline"
              itemProp="affiliation"
            >
              ООО «Эффективное производство»
            </a>{' '}
            (Смоленск, основана в 1992 году).
          </p>
        </section>
      </article>
    </main>
  );
}
