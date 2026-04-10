import type { Metadata } from 'next';
import Link from 'next/link';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'О проекте ПодборОборудования — справочник запчастей для ЧПУ',
  description:
    'ПодборОборудования — проект ООО «Эффективное производство». Более 30 лет на рынке, поставки комплектующих для ЧПУ на 300+ предприятий России.',
  alternates: {
    canonical: '/about/'
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    siteName: 'ПодборОборудования',
    locale: 'ru_RU',
    title: 'О проекте ПодборОборудования — справочник запчастей для ЧПУ',
    description:
      'ПодборОборудования — проект ООО «Эффективное производство». Более 30 лет на рынке, поставки комплектующих для ЧПУ на 300+ предприятий России.',
    url: `${SITE_URL}/about/`
  }
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ПодборОборудования',
    url: SITE_URL,
    description: 'Справочный проект по подбору запчастей и комплектующих для станков с ЧПУ',
    foundingDate: '1992',
    numberOfEmployees: 139,
    parentOrganization: {
      '@type': 'Organization',
      name: 'ООО «Эффективное производство»',
      url: 'https://cnc360.ru',
      legalName: 'ООО «Эффективное производство»',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ул. Коненкова, д. 4А',
        addressLocality: 'Смоленск',
        postalCode: '214000',
        addressCountry: 'RU'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+7-499-648-20-40',
        email: 'info@cnc360.ru',
        contactType: 'sales'
      }
    },
    knowsAbout: [
      'запчасти для ЧПУ',
      'комплектующие для станков с ЧПУ',
      'FANUC',
      'Siemens CNC',
      'HEIDENHAIN энкодеры',
      'модернизация станков'
    ]
  };

  return (
    <main>
      <SchemaOrg data={aboutSchema} />
      <article className="mx-auto max-w-4xl space-y-10" itemScope itemType="https://schema.org/AboutPage">
        <h1 className="text-3xl font-bold text-primary">О проекте ПодборОборудования</h1>

        <section className="space-y-4 text-text/85">
          <p>
            <strong>ПодборОборудования</strong> — справочный интернет-проект, созданный специалистами компании
            <strong> ООО «Эффективное производство»</strong> для технологов, механиков и снабженцев промышленных
            предприятий.
          </p>
          <p>
            Здесь вы найдёте подборки, сравнения и технические описания запчастей и комплектующих для станков с ЧПУ:
            энкодеры, серводвигатели, приводы, печатные платы, блоки питания, датчики, панели оператора и многое
            другое.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border border-primary/10 bg-surface p-6">
          <h2 className="text-2xl font-bold text-primary">Кто стоит за проектом</h2>
          <p>
            Проект создан на базе экспертизы <strong>ООО «Эффективное производство»</strong> (до октября 2022 года —
            ИЦ «Станкосервис»), основанной в 1992 году в Смоленске.
          </p>
          <p>
            За 30+ лет работы компания поставила комплектующие более чем на 300 предприятий нефтегазовой,
            автомобильной и авиационной отраслей. В штате — 139 специалистов. Офисы в Смоленске (головной) и Москве.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { number: '30+', label: 'лет на рынке' },
              { number: '300+', label: 'предприятий-клиентов' },
              { number: '139', label: 'специалистов' }
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-primary/10 bg-background p-4 text-center">
                <p className="text-2xl font-bold text-primary">{item.number}</p>
                <p className="text-xs text-text/70">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">Наша специализация</h2>
          <ul className="list-disc space-y-2 pl-6 text-text/85">
            <li>
              <strong>Комплектующие для ЧПУ:</strong> энкодеры (HEIDENHAIN, Renishaw, Balluff), серводвигатели и
              сервоприводы (FANUC, Siemens, Mitsubishi Electric), панели оператора, датчики, печатные платы.
            </li>
            <li>
              <strong>Инструмент и оснастка:</strong> токарные патроны (Kitagawa, Samchully), приводные блоки (EWS,
              WTO), зажимные приспособления OML, оснастка SMW-Autoblok.
            </li>
            <li>
              <strong>Модернизация УЧПУ:</strong> обновление систем НЦ31, МС2109, 2С42, 2Р22, замена FDD-дисководов,
              модернизация шлифовальных станков.
            </li>
            <li>
              <strong>Прямые поставки:</strong> из Китая и Европы, включая бренды, ранее недоступные в РФ.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">С какими брендами мы работаем</h2>
          <p>
            FANUC · HEIDENHAIN · Siemens · Renishaw · Balluff · Omron · Autonics · Delta Electronics · Hexagon ·
            Marposs · Blum-Novotest · Mitsubishi Electric · Kitagawa · SMW-Autoblok · OML · WTO · Baruffaldi · Carl
            Zeiss и другие.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">Участие в выставках</h2>
          <p>
            Специалисты компании ежегодно представляют продукцию на ключевых отраслевых мероприятиях: ИННОПРОМ,
            Металлообработка, MashExpo Siberia, Технофорум, RUSWELD.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">Редакция</h2>
          <p>
            Все материалы проекта готовятся под руководством главного редактора —{' '}
            <Link href="/author/sergey/" className="font-semibold text-accent hover:underline">
              Сергея С.
            </Link>
            , специалиста с 20-летним опытом в поставках запчастей для ЧПУ.
          </p>
        </section>
      </article>
    </main>
  );
}
