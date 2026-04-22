'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { METRIKA_ID } from '@/lib/cnc360';

export default function YandexMetrikaRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstHit = useRef(true);

  useEffect(() => {
    if (!pathname || typeof window === 'undefined' || typeof window.ym !== 'function') {
      return;
    }

    if (isFirstHit.current) {
      isFirstHit.current = false;
      return;
    }

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window.ym(METRIKA_ID, 'hit', url);
  }, [pathname, searchParams]);

  return null;
}
