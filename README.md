Monteverde Landscapes

Marketing website and internal data layer for Monteverde Landscapes, including lead capture, quote flow, contact forms, customer reviews, and project content.

Production (Vercel):
https://monteverde-landsccapes.vercel.app

Primary domain:
https://monteverdelandscapers.com

Overview

This repository contains:

Marketing website (Home, Services, Projects, Reviews, Contact).

Quote flow (/quote) for structured price estimation.

Contact form (/contact) for general enquiries.

Reviews system powered by Supabase with manual approval.

Supabase as the database backend.

Formspree for form submissions and email delivery.

Vercel for deployment and hosting.

Tech Stack

Next.js (App Router)

TypeScript

Tailwind CSS

Supabase (Postgres database)

Formspree (Quote & Contact forms → email delivery)

Vercel (production hosting)

Project Structure

High-level structure:

src/
├─ app/
│  ├─ (marketing)/
│  │  ├─ page.tsx          # Home
│  │  ├─ services/
│  │  ├─ projects/
│  │  ├─ reviews/
│  │  ├─ contact/
│  │  └─ quote/
│  ├─ api/
│  │  └─ reviews/
│  │     └─ route.ts       # Reviews API (Supabase)
│  └─ layout.tsx
├─ components/
│  ├─ layout/
│  │  ├─ Header.tsx
│  │  └─ Footer.tsx
│  ├─ forms/
│  └─ ui/
├─ content/
│  ├─ projects.ts
│  ├─ services.ts
│  └─ reviews.ts
└─ types/

Forms & Email Flow (IMPORTANT)
Quote Form (/quote)

Provider: Formspree

Endpoint: Configured directly in the Quote page

What happens:

User submits quote form

Formspree receives submission

Email is sent to info@monteverdelandscapers.com

Submission is also visible in Formspree dashboard

Success message shown on the website

No backend email logic is used for quotes anymore.

Contact Form (/contact)

Provider: Formspree

Purpose: General enquiries

Flow: Same as Quote

Emails go to: info@monteverdelandscapers.com

Reviews System
How Reviews Work

Reviews are stored in Supabase

Table: reviews

Key fields:

full_name

email

rating

message

status (pending | approved)

created_at

Approval Process (Manual)

User submits a review on the website

Review is saved in Supabase with:

status = 'pending'


Admin opens Supabase Dashboard

Go to:

Table Editor → reviews


Change:

status: pending → approved


Only approved reviews appear on the website

✅ This gives full control and prevents spam or fake reviews.

Supabase Usage

Supabase is used only as a database (no public auth yet).

Tables in use:

reviews

leads (historical / internal)

Supabase access:

Managed via Supabase Dashboard (web UI)

Production project is already configured

Footer & Contact Info

The footer includes:

Company copyright

Phone number

Email address

Social media icons:

Facebook

Instagram

Google (brand presence)

Nextdoor

Icons are rendered via React Icons and controlled in:

src/components/layout/Footer.tsx

Local Development
Install
npm install

Run locally
npm run dev


App runs at:

http://localhost:3000

Environment Variables

Only Supabase is required:

NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...


⚠️ Never expose SUPABASE_SERVICE_ROLE_KEY to the client.

Deployment (Vercel)

Automatic deploy on push to master

Production environment is active

Domain can be managed in Vercel settings

Workflow Rules (IMPORTANT)

One change at a time

Always:

Visual check → Commit → Push → Vercel deploy


Avoid mixing:

UI changes

Backend changes

Always confirm:

Form submission

Email delivery

Supabase records

Git Workflow
git status
git add -A
git commit -m "Describe the change"
git push

Roadmap / Next Improvements

Product color selector (resin, paving, flags, Indian stone)

Gallery filtering by material

Admin dashboard (optional)

SEO structured data for reviews

Google Reviews integration

Ownership

Internal project for Monteverde Landscapes.
All rights reserved.