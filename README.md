# Monteverde Landscapes

Website + internal dashboard for Monteverde Landscapes (marketing site, quote flow, and operational dashboard for leads/quotes/projects/reviews).

**Production (Vercel):** https://monteverde-landscapes.vercel.app  
**Primary domain (planned):** monteverdelandscapers.com

---

## Overview

This repository contains:

- **Marketing site** (high-trust brand pages, services, projects, reviews, contact).
- **Quote flow** (`/quote`) built to reduce friction and increase conversions.
- **Internal dashboard** (`/app/...`) for operational visibility (leads, quotes, projects, reviews, settings).
- **API routes** for form submissions and backend operations.
- **Supabase** as database + auth (server/client clients).
- **Resend** for transactional email (lead/quote confirmations and internal notifications).

---

## Tech Stack

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS**
- **Supabase** (Postgres + API)
- **Resend** (transactional email)
- **Vercel** (hosting/deploy)

---

## Project Structure

High-level tree:

- `src/app/(marketing)/...` → marketing pages (home, services, projects, quote, etc.)
- `src/app/(dashboard)/app/...` → dashboard pages
- `src/app/api/...` → Next.js API routes (`lead`, `quote`, `review`, `upload`)
- `src/components/...` → UI components (forms, dashboard widgets, marketing sections)
- `src/content/...` → content modules (services, projects, testimonials, FAQs)
- `supabase/migrations` + `supabase/seed.sql` → DB setup

Key public routes:

- `/` (Home)
- `/about`
- `/services`
- `/process`
- `/projects`
- `/projects/[slug]`
- `/reviews`
- `/contact`
- `/quote`

Key dashboard routes:

- `/login`
- `/app`
- `/app/leads`
- `/app/quotes`
- `/app/projects`
- `/app/reviews`
- `/app/settings`

Note: `/app/calenda` exists and appears to be a typo for a calendar page.

---

## Local Development

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install

```bash
npm install

Environment Variables

This project requires Supabase configuration for both client and server.

Create a .env.local (or use the template if available) and set:

Required
# Used by server-side code (API routes, secure DB access)
SUPABASE_URL=...

# Server-side secret (DO NOT expose to client)
SUPABASE_SERVICE_ROLE_KEY=...

# Used by client-side code (browser)
NEXT_PUBLIC_SUPABASE_URL=...


IMPORTANT:

SUPABASE_SERVICE_ROLE_KEY must never be exposed publicly.

On Vercel, these must be configured under Project → Settings → Environment Variables.

Deployment (Vercel)

This repo is deployed to Vercel.

The production URL is available at:

https://monteverde-landscapes.vercel.app

Common deployment issue

If Vercel build fails related to Supabase config, confirm the environment variables exist in All Environments (Production/Preview/Development) and are spelled exactly as above.

Email (Resend) — DNS Requirements

Resend is used for outbound transactional emails. Domain verification is done via DNS records in Namecheap.

Current state (expected)

DKIM should be Verified

SPF must be Verified for deliverability

Important SPF rule

You must have a single SPF record at the root host (@). Multiple SPF records cause verification failure.

Example SPF value used for Resend (Amazon SES):

v=spf1 include:amazonses.com ~all


DNS propagation can take time. Use Resend’s “Restart” button to re-check after updates.

What Has Been Implemented

Marketing site pages and layouts

Quote page + Quote Wizard component

Dashboard skeleton + core pages

API routes for lead/quote/review/upload

Supabase integration (server + client)

Production deploy on Vercel

Environment variable alignment for Supabase on Vercel

What Remains

Confirm Resend SPF final status becomes Verified

Run an end-to-end test:

submit quote form

verify DB insert in Supabase

verify transactional emails (internal + user)

Optional: connect custom domain (monteverdelandscapers.com) to Vercel

UI polish for /quote success state + CTA consistency across the site

Workflow Rules (Project Discipline)

One instruction/change at a time

Prefer small, reversible changes

Keep UI changes separate from backend changes

Validate visually after each step

DNS changes require propagation time; avoid repeated edits

Keep conversion links consistent: primary CTA should point to /quote

Git Workflow
git status
git add -A
git commit -m "Describe the change"
git push

License / Ownership

Internal project for Monteverde Landscapes.