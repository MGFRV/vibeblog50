import { getAllArticles } from '@/lib/articles';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export async function GET() {
  const articles = getAllArticles();

  const items = articles
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${SITE_URL}/blog/${a.slug}/</link>
      <description><![CDATA[${a.description}]]></description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <guid>${SITE_URL}/blog/${a.slug}/</guid>
    </item>
  `
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${SITE_NAME}</title>
        <link>${SITE_URL}</link>
        <description>${SITE_DESCRIPTION}</description>
        <language>ru</language>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
        ${items}
      </channel>
    </rss>`;

  return new Response(rss.trim(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
