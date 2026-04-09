export const CNC360_CANONICAL_URL = 'https://cnc360.ru/?utm_source=podbor&utm_medium=referral';

export function isCnc360Hostname(hostname: string): boolean {
  return hostname.toLowerCase().endsWith('cnc360.ru');
}

export function toCanonicalCnc360Url(href: string, baseOrigin?: string): string {
  try {
    const fallbackBase = baseOrigin ?? 'https://podbor-oborudovaniya.ru';
    const parsed = new URL(href, fallbackBase);

    if (!isCnc360Hostname(parsed.hostname)) {
      return href;
    }

    return CNC360_CANONICAL_URL;
  } catch {
    return href;
  }
}
