create table project_technologies (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null references projects(id) on delete cascade,

  technology text not null
);

/**id = 3fa85f64-5717-4562-b3fc-2c963f66afa6