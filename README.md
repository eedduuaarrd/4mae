# 4mæ — Landing

Landing page per **4mæ**, app d'entrenament adaptatiu amb IA i integració de wearables.

## Desenvolupament

```bash
npm install
npm run dev
```

Obre [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Llista d'espera

Per defecte, els emails es guarden a `localStorage` del navegador i el comptador s'actualitza en temps real.

Per enviar emails a un servei extern, crea `.env`:

```env
VITE_WAITLIST_ENDPOINT=https://formspree.io/f/el_teu_id
```

## Deploy (Vercel)

Connecta el repositori a Vercel i deixa el build per defecte (`npm run build` → `dist`).

**Important:** no defineixis `VITE_BASE_PATH=/4mae/` a les variables d'entorn de Vercel. Aquest valor és només per GitHub Pages; a l'arrel del domini els assets han d'anar a `/assets/...`, no a `/4mae/assets/...`.

## Deploy (GitHub Pages)

```bash
npm run build:pages
npm run preview:pages
```

El workflow `.github/workflows/deploy.yml` publica automàticament a **https://eedduuaarrd.github.io/4mae/** (amb `VITE_BASE_PATH=/4mae/` al build).

Al repositori de GitHub: **Settings → Pages → Build and deployment → GitHub Actions**.

## Stack

- React 19
- Vite 8
- CSS vanilla (sense dependències d'UI)
