# Dylan Knapp - Personal Website

Personal portfolio for Dylan Knapp, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Overview

The homepage presents an interactive index of RepQuest and three websites made through Quoia, followed by a RepQuest walkthrough, a website gallery, background, and contact information.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for Production

```bash
npm run build
```

## Project Structure

```text
app/
  globals.css
  icon.tsx
  layout.tsx
  opengraph-image.tsx
  page.tsx
  robots.ts
  sitemap.ts
  twitter-image.tsx
components/
  Contact.tsx
  Hero.tsx
  Navbar.tsx
  ProjectComposition.tsx
  QuoiaGallery.tsx
  RepQuestShowcase.tsx
  ScrollReveals.tsx
assets/
  headshot.png
  headshot.webp
  preview-*.webp
  repquest-*.jpg
public/
  resume.pdf
```

## Content Locations

- Main page content lives in `app/page.tsx`.
- Site metadata and SEO live in `app/layout.tsx`.
- Open Graph and Twitter image routes live in `app/opengraph-image.tsx` and `app/twitter-image.tsx`.
- The favicon is generated in `app/icon.tsx`.
- Visual theme and motion styling live in `app/globals.css`.
- `npm run build` writes the static site to `out/`.
- RepQuest screenshots are from the official App Store listing. Website previews were captured from the live RentPadAI, Knapp Arcade, and Feeding the NRV sites. The résumé is served from `public/resume.pdf`.
