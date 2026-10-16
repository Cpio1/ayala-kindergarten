# АЯЛА балабақшасы — сайт

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # продакшн-сборка (Vercel)
```

## Фотографии

Положите файлы в `public/images` или `public/` (фото: jpg / jpeg / png / webp / avif) и пересоберите проект:

| Файл | Где используется |
| --- | --- |
| `main-page.*` | Главный экран (Hero) в исходных пропорциях, Open Graph |
| `main-page2.mp4` (или `.webm`, `.mov`) | **Видео** в разделе «АЯЛА туралы» и на странице `/about` |
| `main-page2-poster.jpg` | Кадр-обложка видео (необязательно) |
| любые другие | Фотогалерея (сортировка по имени: `1.jpg`, `2.jpg`, … `10.jpg`) |

Фото главного экрана и точные копии в галерее не дублируются. Пока фото нет — показываются иллюстрации, а не сломанные картинки.

## Что настраивается

Все данные — в `src/config/site.ts`, тексты KZ/RU — в `src/i18n/translations.ts`.

- **Адрес и карта 2ГИС** — `site.address`, `site.coordinates` и `site.twoGis.firmId` (карточка организации
  https://2gis.kz/almaty/firm/70000001033758486). Карта — официальный виджет 2ГИС; кнопка «Построить маршрут»
  открывает маршрут до этой организации. Если `firmId` или `coordinates` = `null`, вместо карты показывается сообщение.
- **Документы** — переменная окружения `NEXT_PUBLIC_DOCUMENTS_URL` (ссылка Google Drive / Mail.ru Cloud). Пока пусто — показывается информационное сообщение вместо кнопки.
- **Домен** — `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, robots, Open Graph).

На Vercel переменные задаются в Settings → Environment Variables (см. `.env.example`).

Видео: H.264 + AAC в MP4 воспроизводится во всех современных браузерах. Файлы `.mov` (HEVC) лучше заранее перекодировать:
`ffmpeg -i in.mov -c:v libx264 -pix_fmt yuv420p -c:a aac -movflags +faststart main-page2.mp4`
