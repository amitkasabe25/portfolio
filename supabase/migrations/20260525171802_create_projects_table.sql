create table projects (
  id uuid primary key default gen_random_uuid(),

  title text not null,

  organization text not null,

  description text not null,

  category text not null,

  status text not null,

  role text not null,

  year text not null,

  logo_url text,

  metric_1_label text,
  metric_1_value text,

  metric_2_label text,
  metric_2_value text,

  metric_3_label text,
  metric_3_value text,

  created_at timestamptz default now()
);