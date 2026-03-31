import type { Category } from '@/lib/types';

export const SITE_NAME = 'ПодборОборудования';
export const SITE_DESCRIPTION =
  'Экспертный блог о поиске, выборе и закупке промышленного оборудования и запчастей в России. Для специалистов по закупкам и снабжению.';
export const SITE_URL = 'https://podbor-oborudovaniya.ru'; // плейсхолдер
export const AUTHOR = 'Редакция ПодборОборудования';

export const CATEGORIES: { name: Category; slug: string; description: string }[] = [
  {
    name: 'Выбор оборудования',
    slug: 'vybor-oborudovaniya',
    description: 'Как подобрать насосы, двигатели, компрессоры и другое промышленное оборудование'
  },
  {
    name: 'Процесс закупки',
    slug: 'protsess-zakupki',
    description: 'Этапы закупки от заявки до поставки, тендеры, планирование'
  },
  {
    name: 'Работа с поставщиками',
    slug: 'rabota-s-postavshchikami',
    description: 'Поиск, проверка и оценка поставщиков, переговоры, импортозамещение'
  },
  {
    name: 'Документация и договоры',
    slug: 'dokumentatsiya-i-dogovory',
    description: 'Договоры, спецификации, акты, сертификация, ЭДО'
  },
  {
    name: 'Ошибки и лайфхаки',
    slug: 'oshibki-i-layfkhaki',
    description: 'Типичные ошибки закупщиков, чек-листы, KPI, инструменты'
  }
];
