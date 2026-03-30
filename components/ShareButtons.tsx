'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const vkUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={telegramUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-surface px-3 py-2 text-sm text-text hover:border-accent hover:text-accent"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M21.4 4.6a1 1 0 0 0-1.04-.17L3.4 11.1a1 1 0 0 0 .06 1.88l4.2 1.44 1.44 4.2a1 1 0 0 0 .84.66h.1a1 1 0 0 0 .81-.42L21.57 5.63a1 1 0 0 0-.17-1.03Zm-10.8 9.9-.83 2.43-.83-2.43-2.43-.83 10.8-4.26-6.71 5.09Z" />
        </svg>
        Telegram
      </a>

      <a
        href={vkUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-surface px-3 py-2 text-sm text-text hover:border-accent hover:text-accent"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M3.5 5.5c.17 8.2 4.27 13.13 11.46 13.13h.4v-4.3c2.4.24 4.2 1.98 4.93 4.3H24c-.94-3.42-3.4-5.32-4.93-6.04 1.53-.9 3.7-3.07 4.2-7.1h-3.32c-.66 3.25-2.67 5.43-4.6 5.7V5.5h-3.3v9.85c-1.95-.49-4.4-2.84-4.5-9.85H3.5Z" />
        </svg>
        VK
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-surface px-3 py-2 text-sm text-text hover:border-accent hover:text-accent"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {copied ? 'Скопировано!' : 'Копировать ссылку'}
      </button>
    </div>
  );
}
