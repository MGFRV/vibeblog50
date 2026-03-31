'use client';

interface CategoryFilterProps {
  categories: Array<{ name: string; slug: string; count: number }>;
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const allCount = categories.reduce((sum, category) => sum + category.count, 0);
  const all = [{ name: 'Все', count: allCount }, ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((category) => {
        const isActive = active === category.name;

        return (
          <button
            key={category.name}
            type="button"
            onClick={() => onChange(category.name)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'border-accent bg-accent text-white'
                : 'border-primary/30 bg-transparent text-primary hover:border-accent hover:text-accent'
            }`}
          >
            {category.name} ({category.count})
          </button>
        );
      })}
    </div>
  );
}
