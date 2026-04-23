'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { METRIKA_ID } from '@/lib/cnc360';

export default function YandexMetrika() {
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

  return (
    <>
      <Script id="yandex-metrika" strategy="lazyOnload">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.defer=1,k.src=r,a.parentNode.insertBefore(k,a);
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${METRIKA_ID}, "init", {
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            defer: true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img src={`https://mc.yandex.ru/watch/${METRIKA_ID}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
    </>
  );
}
