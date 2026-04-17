'use client';

import { useState, useEffect, useRef } from 'react';
import { CNC360_CANONICAL_URL, trackCnc360Click } from '@/lib/cnc360';

type ModalView = 'choose' | 'form' | 'success';

interface OrderPartsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderPartsModal({ isOpen, onClose }: OrderPartsModalProps) {
  const [view, setView] = useState<ModalView>('choose');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setView('choose');
      setFormData({ name: '', email: '', phone: '', description: '' });
      setSubmitError('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'efb5634c-52e7-4950-9f5c-5ad0b50d1bcf',
          subject: 'Заявка на поставку запчастей с сайта cnc360.ru',
          from_name: 'Форма заявки на поставку',
          to: 'info@cnc360.ru',
          ccemail: 'info@podbor-oborudovaniya.ru',
          name: formData.name,
          email: formData.email,
          replyto: formData.email,
          phone: formData.phone || 'не указан',
          message: formData.description
        })
      });

      const result = await response.json();
      if (!response.ok || !result?.success) {
        throw new Error('Ошибка отправки формы');
      }

      setView('success');
    } catch (error) {
      console.error(error);
      setSubmitError('Не удалось отправить заявку. Напишите нам на info@podbor-oborudovaniya.ru или info@cnc360.ru.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Заказать запчасти"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl"
        style={{ animation: 'modalIn 0.2s ease-out' }}
      >
        {/* Шапка */}
        <div className="flex items-center justify-between rounded-t-2xl bg-primary px-6 py-4">
          <h2 className="text-lg font-bold text-white">
            {view === 'choose' && 'Запчасти для станков с ЧПУ'}
            {view === 'form' && 'Оставить заявку на поставку'}
            {view === 'success' && 'Заявка отправлена'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Закрыть"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Экран выбора */}
          {view === 'choose' && (
            <div className="space-y-4">
              <p className="text-sm text-text/70">
                Поставляем серводвигатели, энкодеры, платы управления, дисплеи и другие комплектующие для ЧПУ.
                Склад в Москве и Смоленске, прямые поставки из Китая и Европы.
              </p>

              {/* Вариант 1: каталог */}
              <a
                href={CNC360_CANONICAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border-2 border-primary/10 p-4 transition hover:border-primary/30 hover:bg-primary/5"
                onClick={trackCnc360Click}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                    <circle cx="7" cy="6" r="1" fill="currentColor" stroke="none" />
                    <circle cx="7" cy="12" r="1" fill="currentColor" stroke="none" />
                    <circle cx="7" cy="18" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-primary">Посмотреть каталог запчастей</h3>
                  <p className="mt-1 text-sm text-text/60">
                    Откройте cnc360.ru — каталог комплектующих Fanuc, Siemens, Heidenhain, Mitsubishi и других брендов
                  </p>
                </div>
                <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-text/30 transition group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>

              {/* Вариант 2: форма */}
              <button
                onClick={() => setView('form')}
                className="group flex w-full items-start gap-4 rounded-xl border-2 border-accent/10 p-4 text-left transition hover:border-accent/30 hover:bg-accent/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12h6M12 9v6" strokeLinecap="round" />
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-accent">Оставить заявку на поставку</h3>
                  <p className="mt-1 text-sm text-text/60">
                    Опишите, какие запчасти вам нужны — мы подберём и предложим варианты с ценами и сроками
                  </p>
                </div>
                <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-text/30 transition group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <p className="text-center text-xs text-text/40">
                Проект компании «Эффективное производство» · поставки с 2005 года
              </p>
            </div>
          )}

          {/* Экран формы */}
          {view === 'form' && (
            <div>
              <button
                onClick={() => setView('choose')}
                className="mb-4 inline-flex items-center gap-1 text-sm text-text/50 transition hover:text-text"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Назад
              </button>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="op-name" className="mb-1 block text-sm font-medium text-text/80">
                    Ваше имя <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="op-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Иван Петров"
                    className="w-full rounded-lg border border-text/15 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/40 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="op-email" className="mb-1 block text-sm font-medium text-text/80">
                    Электронная почта <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="op-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ivan@company.ru"
                    className="w-full rounded-lg border border-text/15 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/40 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="op-phone" className="mb-1 block text-sm font-medium text-text/80">
                    Телефон <span className="text-text/40">(необязательно)</span>
                  </label>
                  <input
                    id="op-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-lg border border-text/15 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/40 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="op-desc" className="mb-1 block text-sm font-medium text-text/80">
                    Какие запчасти нужны? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="op-desc"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Например: серводвигатель Fanuc A06B-0075-B403, 2 шт. Или опишите задачу — мы подберём нужные комплектующие."
                    className="w-full resize-none rounded-lg border border-text/15 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/40 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-accent px-5 py-3 font-semibold text-white transition hover:bg-[#a8612a] disabled:opacity-60"
                >
                  {isSubmitting ? 'Отправка…' : 'Отправить заявку'}
                </button>

                {submitError && (
                  <p className="text-center text-sm text-red-600">{submitError}</p>
                )}

                <p className="text-center text-xs text-text/40">
                  Ответим в течение 1 рабочего дня на указанную почту
                </p>
              </form>
            </div>
          )}

          {/* Экран успеха */}
          {view === 'success' && (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text">Заявка отправлена!</h3>
              <p className="mt-2 text-sm text-text/60">
                Мы получили ваш запрос и свяжемся с вами в ближайшее время.
                Обычно отвечаем в течение 1 рабочего дня.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
