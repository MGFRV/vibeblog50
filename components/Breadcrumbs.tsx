import Link from 'next/link';
import SchemaOrg from '@/components/SchemaOrg';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href
    }))
  };

  return (
    <nav aria-label="Хлебные крошки" className="mb-5 text-sm text-text/70">
      <SchemaOrg data={schema} />

      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-accent hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-text/50' : ''}>{item.label}</span>
              )}

              {!isLast ? <span aria-hidden="true">→</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
