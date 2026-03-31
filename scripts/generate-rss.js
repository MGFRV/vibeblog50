const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://podbor-oborudovaniya.ru';
const SITE_NAME = 'ПодборОборудования';

const articlesDir = path.join(process.cwd(), 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.mdx'));

const articles = files
  .map((file) => {
    const raw = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const { data } = matter(raw);
    return data;
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const items = articles
  .map(
    (a) => `
  <item>
    <title><![CDATA[${a.title}]]></title>
    <link>${SITE_URL}/blog/${a.slug}/</link>
    <description><![CDATA[${a.description}]]></description>
    <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    <guid>${SITE_URL}/blog/${a.slug}/</guid>
  </item>`
  )
  .join('');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Экспертный блог о закупке промышленного оборудования</description>
    <language>ru</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss.trim());
console.log('RSS generated:', articles.length, 'articles');
