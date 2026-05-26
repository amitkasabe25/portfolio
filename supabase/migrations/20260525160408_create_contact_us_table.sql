create table contact_messages (
  id uuid primary key default gen_random_uuid(),

  inquiry_type text not null,

  full_name text not null,

  email text not null,

  subject text not null,

  message text not null,

  budget_range text,

  created_at timestamptz default now()
);