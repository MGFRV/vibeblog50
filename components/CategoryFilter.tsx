import Link from 'next/link';

interface CategoryFilterProps {
  categories: Array<{ name: string; slug: string; count: number }>;
  activeSlug?: string;
}

export default function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  const allCount = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog/"
        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
          !activeSlug
            ? 'border-accent bg-accent text-white'
            : 'border-primary/30 bg-transparent text-primary hover:border-accent hover:text-accent'
        }`}
      >
        Все ({allCount})
      </Link>
      {categories.map((category) => {
        const isActive = activeSlug === category.slug;

        return (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}/`}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'border-accent bg-accent text-white'
                : 'border-primary/30 bg-transparent text-primary hover:border-accent hover:text-accent'
            }`}
          >
            {category.name} ({category.count})
          </Link>
        );
      })}
    </div>
  );
}
