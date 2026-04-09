'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { CNC360_CANONICAL_URL, isCnc360Hostname, toCanonicalCnc360Url } from '@/lib/cnc360';

const METRIKA_ID = 108317503;
const CNC360_GOAL = 'click_cnc360_outbound';

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

const METRIKA_ID = 108317503;
const CNC360_GOAL = 'click_cnc360_outbound';

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

function withCnc360Utm(rawHref: string): string {
  try {
    const parsed = new URL(rawHref, window.location.origin);
    const host = parsed.hostname.toLowerCase();

    if (!host.endsWith('cnc360.ru')) {
      return rawHref;
    }

    if (!parsed.searchParams.has('utm_source')) {
      parsed.searchParams.set('utm_source', 'podbor');
    }

    if (!parsed.searchParams.has('utm_medium')) {
      parsed.searchParams.set('utm_medium', 'referral');
    }

    if (rawHref.startsWith('/')) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }

    return parsed.toString();
  } catch {
    return rawHref;
  }
}

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

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const updateAnchor = (anchor: HTMLAnchorElement) => {
      const href = anchor.getAttribute('href');
      if (!href) {
        return;
      }

      const nextHref = toCanonicalCnc360Url(href, window.location.origin);
      if (nextHref !== href) {
        anchor.setAttribute('href', nextHref);
      }
    };

    const updateAllAnchors = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(updateAnchor);
    };

    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) {
        return;
      }

      updateAnchor(anchor);

      const href = anchor.getAttribute('href');
      if (!href) {
        return;
      }

      try {
        const parsed = new URL(href, window.location.origin);
        if (isCnc360Hostname(parsed.hostname)) {
          window.ym?.(METRIKA_ID, 'reachGoal', CNC360_GOAL, {
            href: CNC360_CANONICAL_URL
          });
        }
      } catch {
        // noop
      }
    };

    updateAllAnchors();

    const observer = new MutationObserver(() => {
      updateAllAnchors();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href']
    });

    document.addEventListener('click', handleClick, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
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
