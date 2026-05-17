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

Cada inscripció es guarda a:

1. **`data/waitlist.csv`** (local, amb `npm run dev`)
2. **CSV a Vercel Blob** (producció a Vercel)
3. **`localStorage`** del navegador (comptador en temps real)

### CSV local (desenvolupament)

Amb `npm run dev`, els correus s'afegeixen a `data/waitlist.csv`:

```csv
email,source,joinedAt
usuari@exemple.cat,hero,2026-05-17T10:00:00.000Z
```

### CSV a Vercel (producció)

1. Al projecte Vercel: **Storage → Create Database → Blob**
2. Redesplega (es crea sol `BLOB_READ_WRITE_TOKEN`)
3. Variable `WAITLIST_ADMIN_SECRET=una-clau-segura` a Vercel

### Consultar correus (recomanat)

Obre el **panell d'admin** (taula + cerca + exportació):

**https://farre.vercel.app/admin.html**

Introdueix la clau `WAITLIST_ADMIN_SECRET`. Pots descarregar `waitlist.csv` (compatible amb Excel).

Alternativa per línia de comandes:

```bash
curl -H "x-admin-key: LA_TEVA_CLAU" "https://farre.vercel.app/api/waitlist" -o waitlist.csv
```

### Formspree (opcional)

Per rebre també un email per inscripció:

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

A GitHub Pages (només estàtics) el CSV **no** es guarda al servidor; només `localStorage`. Per recollir correus en CSV, usa **Vercel** amb Blob.

## Stack

- React 19
- Vite 8
- CSS vanilla (sense dependències d'UI)
