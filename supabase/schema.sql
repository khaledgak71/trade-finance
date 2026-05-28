-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text,
  avatar_url   text,
  role         text not null default 'learner',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────
-- MODULES
-- ─────────────────────────────────────────
create table public.modules (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,
  title        text not null,
  description  text,
  icon         text,
  order_index  int not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now()
);
alter table public.modules enable row level security;
create policy "Published modules visible to authenticated users"
  on public.modules for select
  using (auth.role() = 'authenticated' and is_published = true);

-- ─────────────────────────────────────────
-- LESSONS
-- ─────────────────────────────────────────
create table public.lessons (
  id              uuid primary key default uuid_generate_v4(),
  module_id       uuid not null references public.modules(id) on delete cascade,
  slug            text not null,
  title           text not null,
  content_mdx     text,
  infographic_key text,
  order_index     int not null default 0,
  duration_mins   int,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now(),
  unique(module_id, slug)
);
alter table public.lessons enable row level security;
create policy "Published lessons visible to authenticated users"
  on public.lessons for select
  using (auth.role() = 'authenticated' and is_published = true);

-- ─────────────────────────────────────────
-- QUIZ QUESTIONS
-- ─────────────────────────────────────────
create table public.quiz_questions (
  id              uuid primary key default uuid_generate_v4(),
  module_id       uuid not null references public.modules(id) on delete cascade,
  question_text   text not null,
  options         jsonb not null,
  correct_key     text not null,
  explanation     text,
  order_index     int not null default 0
);
alter table public.quiz_questions enable row level security;
create policy "Questions visible to authenticated users"
  on public.quiz_questions for select using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────
-- PROGRESS
-- ─────────────────────────────────────────
create table public.progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  lesson_id     uuid not null references public.lessons(id) on delete cascade,
  module_id     uuid not null references public.modules(id) on delete cascade,
  completed     boolean not null default false,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  unique(user_id, lesson_id)
);
alter table public.progress enable row level security;
create policy "Users manage own progress"
  on public.progress for all using (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- QUIZ ATTEMPTS
-- ─────────────────────────────────────────
create table public.quiz_attempts (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  module_id     uuid not null references public.modules(id) on delete cascade,
  score         int not null,
  total_q       int not null,
  correct_q     int not null,
  answers       jsonb not null,
  passed        boolean not null,
  attempted_at  timestamptz not null default now()
);
alter table public.quiz_attempts enable row level security;
create policy "Users manage own quiz attempts"
  on public.quiz_attempts for all using (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- VIEWS
-- ─────────────────────────────────────────
create or replace view public.module_progress_summary as
select
  p.user_id,
  l.module_id,
  m.title        as module_title,
  m.slug         as module_slug,
  count(l.id)    as total_lessons,
  count(p.id) filter (where p.completed) as completed_lessons,
  round(
    count(p.id) filter (where p.completed)::numeric
    / nullif(count(l.id), 0) * 100
  ) as percent_complete
from public.modules m
join public.lessons l on l.module_id = m.id
left join public.progress p on p.lesson_id = l.id
where m.is_published and l.is_published
group by p.user_id, l.module_id, m.title, m.slug;
