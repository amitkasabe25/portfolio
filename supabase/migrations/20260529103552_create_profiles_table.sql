create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

-- Optional: enable RLS
alter table public.profiles enable row level security;

-- Policy: users can view their own profile
create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = id);

-- Policy: users can update their own profile
create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);

-- Policy: users can insert their own profile
create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);