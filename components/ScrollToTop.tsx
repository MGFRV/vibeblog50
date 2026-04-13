'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let current = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const next = window.scrollY > 600;
        if (next !== current) {
          current = next;
          setVisible(next);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#0F4C3A] text-lg text-white shadow-lg transition hover:bg-[#0a3a2c]"
      aria-label="Наверх"
    >
      ↑
    </button>
  );
}
