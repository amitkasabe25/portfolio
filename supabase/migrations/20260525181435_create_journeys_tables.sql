create table journeys (
  id uuid primary key default gen_random_uuid(),

  year text not null,

  company text not null,

  role text not null,

  date_range text not null,

  badge text not null,

  description text not null,

  created_at timestamptz default now()
);

create table journey_technologies (
  id uuid primary key default gen_random_uuid(),

  journey_id uuid not null references journeys(id) on delete cascade,

  technology text not null
);

alter table journeys
enable row level security;

alter table journey_technologies
enable row level security;

create policy "Allow public read access on journeys"
on journeys
for select
using (true);

create policy "Allow public read access on journey technologies"
on journey_technologies
for select
using (true);