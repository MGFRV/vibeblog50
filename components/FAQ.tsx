'use client';

import { useMemo, useState } from 'react';
import type { FAQItem } from '@/lib/types';
import SchemaOrg from '@/components/SchemaOrg';

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = 'Часто задаваемые вопросы' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }),
    [items]
  );

  if (!items.length) {
    return null;
  }

  return (
    <section className="mt-10">
      <SchemaOrg data={faqSchema} />

      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <article key={item.question} className="overflow-hidden rounded-lg border border-primary/10 bg-surface">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="pr-3 font-semibold text-text">{item.question}</span>
                <span className="text-xl leading-none text-accent">{isOpen ? '−' : '+'}</span>
              </button>

              <div
                className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm text-text/80">{item.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
