import Link from 'next/link';

export default function CtaBanner() {
  return (
    <div className="my-12 rounded-xl bg-[#0F4C3A] p-6 text-white">
      <h3 className="mb-2 text-lg font-bold">Ищете запчасти для станков или измерительное оборудование?</h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-200">
        Поставляем серводвигатели, энкодеры, платы управления, дисплеи и другие запчасти для ЧПУ и промышленного
        оборудования. Прямые поставки из Китая и Европы, включая бренды, недоступные на российском рынке.
      </p>
      <Link
        href="https://cnc360.ru"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg bg-[#C87533] px-5 py-2.5 font-medium text-white transition hover:bg-[#a8612a]"
      >
        Отправить запрос на cnc360.ru →
      </Link>
    </div>
  );
}
