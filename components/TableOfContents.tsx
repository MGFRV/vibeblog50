'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  const safeHeadings = useMemo(() => headings.filter((heading) => heading.id), [headings]);

  useEffect(() => {
    if (!safeHeadings.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0.1, 0.25, 0.5]
      }
    );

    safeHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [safeHeadings]);

  if (!safeHeadings.length) {
    return null;
  }

  const list = (
    <ul className="space-y-2">
      {safeHeadings.map((heading) => {
        const isActive = activeId === heading.id;

        return (
          <li key={heading.id} className={heading.level > 2 ? 'pl-4' : ''}>
            <Link
              href={`#${heading.id}`}
              className={`block border-l-2 pl-3 text-sm transition ${
                isActive
                  ? 'border-accent text-accent font-semibold'
                  : 'border-transparent text-text/70 hover:border-accent/60 hover:text-text'
              }`}
            >
              {heading.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <details className="mb-6 rounded-lg border border-primary/10 bg-surface p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold text-primary">Содержание статьи</summary>
        <div className="mt-3">{list}</div>
      </details>

      <aside className="sticky top-24 hidden lg:block">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-text/60">Содержание</p>
        {list}
      </aside>
    </>
  );
}
