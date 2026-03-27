export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: Category;
  tags: string[];
  date: string; // ISO формат "2025-03-15"
  readingTime: number; // минуты
  faq: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article extends ArticleFrontmatter {
  content: string; // MDX-контент без frontmatter
}

export type Category =
  | 'Выбор оборудования'
  | 'Процесс закупки'
  | 'Работа с поставщиками'
  | 'Документация и договоры'
  | 'Ошибки и лайфхаки';
