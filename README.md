# АЯЛА балабақшасы — сайт

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # продакшн-сборка (Vercel)
```

## Фотографии

Положите фото в `public/images` (jpg / jpeg / png / webp / avif) и пересоберите проект:

| Файл | Где используется |
| --- | --- |
| `main-page.*` | Главный экран (Hero), Open Graph |
| `main-page2.*` | Раздел «АЯЛА туралы» и страница `/about` |
| любые другие | Фотогалерея (сортировка по имени: `1.jpg`, `2.jpg`, … `10.jpg`) |

Фото главного экрана и точные копии в галерее не дублируются. Пока фото нет — показываются иллюстрации, а не сломанные картинки.

## Что настраивается

Все данные — в `src/config/site.ts`, тексты KZ/RU — в `src/i18n/translations.ts`.

- **Адрес** — `site.address` (сейчас `null`, нигде не показывается).
- **Карта** — `site.coordinates` (`{ lat, lng }`), после этого в «Контактах» появится карта и ссылки Google Maps / 2ГИС.
- **Документы** — переменная окружения `NEXT_PUBLIC_DOCUMENTS_URL` (ссылка Google Drive / Mail.ru Cloud). Пока пусто — показывается информационное сообщение вместо кнопки.
- **Домен** — `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, robots, Open Graph).

На Vercel переменные задаются в Settings → Environment Variables (см. `.env.example`).
