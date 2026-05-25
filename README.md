# Dylan Knapp - Personal Website

Personal portfolio for Dylan Knapp, built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Overview

This site presents Dylan as a high school student, app developer, and student entrepreneur. It highlights RepQuest, Sequoia Apps LLC, client web work, education, leadership, and contact information.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for Production

```bash
npm run build
npm start
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
  Capabilities.tsx
  Contact.tsx
  Hero.tsx
  Navbar.tsx
  ProofChips.tsx
  ProjectCard.tsx
  ProjectModal.tsx
  RecruiterFAQ.tsx
  RecruiterSnapshot.tsx
  Section.tsx
  Skills.tsx
  SkillsEvidence.tsx
  Timeline.tsx
public/
  profile-grid.svg
```

## Content Locations

- Main page content lives in `app/page.tsx`.
- Site metadata and SEO live in `app/layout.tsx`.
- Open Graph and Twitter image routes live in `app/opengraph-image.tsx` and `app/twitter-image.tsx`.
- The favicon is generated in `app/icon.tsx`.
- Visual theme and motion styling live in `app/globals.css`.
