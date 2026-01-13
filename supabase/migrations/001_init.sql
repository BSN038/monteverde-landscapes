-- =========================
-- Monteverde Landscaping
-- Initial Database Schema
-- =========================

-- Leads (project enquiries)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  project_type text not null,
  location text,
  budget_range text,
  notes text,
  status text default 'new',
  created_at timestamp with time zone default now()
);

-- Projects (internal + portfolio)
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  status text default 'planning',
  start_date date,
  end_date date,
  featured boolean default false,
  created_at timestamp with time zone default now()
);

-- Quotes
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  amount numeric,
  status text default 'draft',
  notes text,
  created_at timestamp with time zone default now()
);

-- Reviews (feedback)
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  approved boolean default false,
  created_at timestamp with time zone default now()
);
