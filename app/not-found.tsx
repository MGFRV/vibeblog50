import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-[#0F4C3A]">404</h1>
      <p className="mb-2 text-xl text-[#1A2E26]">Страница не найдена</p>
      <p className="mb-8 text-gray-500">Возможно, она была перемещена или удалена</p>
      <Link href="/blog" className="rounded-lg bg-[#C87533] px-6 py-3 text-white transition hover:bg-[#a8612a]">
        Перейти к статьям
      </Link>
    </div>
  );
}
