'use client';

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const all = ['Все', ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((category) => {
        const isActive = active === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'border-accent bg-accent text-white'
                : 'border-primary/30 bg-transparent text-primary hover:border-accent hover:text-accent'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
