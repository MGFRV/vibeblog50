# ПодборОборудования — Блог о закупках промышленного оборудования

## Установка
npm install

## Разработка
npm run dev

## Сборка
npm run build

## Деплой
Папка `out/` содержит готовый статический сайт.

### Vercel
vercel deploy --prod

### Netlify
Перетащите папку `out/` в Netlify Drop или настройте CI.

### Nginx
Скопируйте содержимое `out/` в директорию сервера.

## Проверка домена

Для быстрой диагностики DNS кастомного домена используйте:

```bash
./scripts/check-domain.sh
```

Скрипт проверяет, указывает ли apex-домен на рекомендованный для Vercel IP `76.76.21.21`.

## Индексация и краулеры

- `robots.txt` генерируется из `app/robots.ts`.
- `sitemap.xml` генерируется из `app/sitemap.ts`.
- Если в ответах есть `X-Vercel-Mitigated: challenge` и HTTP `403`, это блокировка на уровне Vercel Security/WAF, а не проблема контента или robots.
