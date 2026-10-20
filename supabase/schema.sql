-- Bloomwise schema. Run in the Supabase SQL editor (Project > SQL Editor).
-- Every table is protected by Row Level Security: users only see their own rows.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  schedule text not null default 'flex' check (schedule in ('fixed','shift','flex')),
  daily_minutes int not null default 60 check (daily_minutes in (30,60,90,120,180)),
  focus text not null default 'both' check (focus in ('both','speak','tech')),
  start_date date not null default current_date,
  hard_mode boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.daily_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  progress_date date not null,
  task_key text not null,
  done boolean not null default true,
  primary key (user_id, progress_date, task_key)
);

create table if not exists public.week_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  task_key text not null,
  done boolean not null default true,
  primary key (user_id, task_key)
);

create table if not exists public.speaking_drafts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  point text not null default '',
  reason text not null default '',
  example text not null default '',
  conclusion text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.vocab_logs (
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  words text not null default '',
  primary key (user_id, log_date)
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null default current_date,
  feelings jsonb not null default '{}'::jsonb,
  bedtime jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists journal_entries_user_date on public.journal_entries (user_id, entry_date desc);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.daily_progress enable row level security;
alter table public.week_progress enable row level security;
alter table public.speaking_drafts enable row level security;
alter table public.vocab_logs enable row level security;
alter table public.journal_entries enable row level security;

create policy "profiles: own row" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "daily_progress: own rows" on public.daily_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "week_progress: own rows" on public.week_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "speaking_drafts: own row" on public.speaking_drafts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "vocab_logs: own rows" on public.vocab_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "journal_entries: own rows" on public.journal_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
