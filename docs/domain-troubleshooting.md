# Проблема с доступностью `podbor-oborudovaniya.ru`

Дата обновления проверки: **2026-04-28**.

## Что обнаружено

1. `podbor-oborudovaniya.ru` открывается с HTTP `403 Forbidden` для краулеров.
2. В ответе присутствуют заголовки:
   - `X-Vercel-Mitigated: challenge`
   - `X-Vercel-Challenge-Token: ...`
3. Это означает, что запросы ботов блокируются защитой Vercel на уровне платформы (challenge), а не `robots.txt`.

## Вывод

`robots.txt` и мета-теги в приложении не могут обойти Vercel challenge.
Пока в проекте включён режим challenge для ботов, часть краулеров (включая YandexBot) будет получать 403 и не индексировать страницы.

## Что исправлено в репозитории

- Роботы переведены на metadata-route `app/robots.ts` (единый источник правды в коде).
- Удалён статический `public/robots.txt`, чтобы не было расхождений.
- Удалён статический `public/sitemap.xml`, используется генерация из `app/sitemap.ts`.
- Добавлен `vercel.json` с явным `X-Robots-Tag: index, follow` и кеш-заголовками для `robots.txt` / `sitemap.xml`.

## Что нужно сделать в Vercel (обязательно)

1. Project → **Settings → Security** (или Firewall/Bot Protection).
2. Отключить режим challenge для verified search bots (минимум для YandexBot/Googlebot).
3. Если включён WAF managed challenge globally — добавить bypass для:
   - `User-Agent` содержит `YandexBot`, `Googlebot`, `Bingbot`;
   - путей `/robots.txt`, `/sitemap.xml`.
4. Проверить, что домен `podbor-oborudovaniya.ru` в **Settings → Domains** имеет статус `Valid`.

## Быстрая проверка после изменения настроек

```bash
curl -I https://podbor-oborudovaniya.ru/robots.txt
curl -I https://podbor-oborudovaniya.ru/sitemap.xml
curl -I -A "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)" https://podbor-oborudovaniya.ru/
```

Ожидаемо: HTTP 200/301/308 (но не 403), и отсутствие `X-Vercel-Mitigated: challenge`.
