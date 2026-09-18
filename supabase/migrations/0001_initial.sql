-- Lohan 29er Season Hub — initial normalized schema
-- Production note: run this in a dedicated EU-region Supabase/PostgreSQL project.

create extension if not exists pgcrypto;

create type app_role as enum ('athlete','coach','parent','teammate','admin');
create type event_kind as enum ('race','camp','school','travel','milestone');
create type sponsor_stage as enum ('target','contacted','discussion','sent','followup','won','lost');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role app_role not null default 'athlete',
  created_at timestamptz not null default now()
);

create table seasons (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  starts_on date not null,
  ends_on date not null,
  created_at timestamptz not null default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  kind event_kind not null,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  priority char(1) check (priority in ('A','B','C')),
  notes text,
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

create table goals (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  title text not null,
  detail text,
  target text,
  deadline date,
  progress smallint not null default 0 check (progress between 0 and 100),
  scope text not null check (scope in ('individual','crew')),
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

create table workouts (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  sport text not null,
  title text not null,
  scheduled_at timestamptz not null,
  planned_minutes integer,
  actual_minutes integer,
  rpe smallint check (rpe between 1 and 10),
  source text not null default 'manual',
  external_id text,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  unique(source, external_id)
);

create table boat_setups (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  name text not null,
  wind_min smallint,
  wind_max smallint,
  sea_state text,
  mast_rake text,
  rig_tension text,
  notes text,
  is_reference boolean not null default false,
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

create table sailing_sessions (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  workout_id uuid references workouts(id) on delete set null,
  setup_id uuid references boat_setups(id) on delete set null,
  starts_at timestamptz not null,
  location text,
  wind_min smallint,
  wind_max smallint,
  sea_state text,
  current_notes text,
  objective_1 text,
  objective_2 text,
  upwind_score smallint check (upwind_score between 1 and 5),
  downwind_score smallint check (downwind_score between 1 and 5),
  maneuvers_score smallint check (maneuvers_score between 1 and 5),
  tactics_score smallint check (tactics_score between 1 and 5),
  communication_score smallint check (communication_score between 1 and 5),
  energy_score smallint check (energy_score between 1 and 5),
  strengths text[] not null default '{}',
  problem text,
  next_action text,
  crew_shared boolean not null default false,
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

create table nutrition_logs (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  workout_id uuid references workouts(id) on delete cascade,
  event_id uuid references events(id) on delete cascade,
  phase text not null check (phase in ('before','during','after')),
  label text not null,
  planned_quantity text,
  actual_quantity text,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table sponsors (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  organisation text not null,
  contact_name text,
  contact_email text,
  stage sponsor_stage not null default 'target',
  value_sought text,
  next_action text not null,
  due_date date,
  created_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  title text not null,
  category text not null,
  object_path text,
  external_url text,
  visibility text not null default 'private' check (visibility in ('private','crew','coach','parents')),
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

create table season_members (
  season_id uuid not null references seasons(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role app_role not null,
  primary key (season_id, user_id)
);

create table external_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  provider text not null,
  provider_account_id text,
  encrypted_access_token text,
  encrypted_refresh_token text,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, provider)
);

create table external_activities (
  id uuid primary key default gen_random_uuid(),
  external_account_id uuid not null references external_accounts(id) on delete cascade,
  provider_activity_id text not null,
  occurred_at timestamptz not null,
  payload jsonb not null default '{}',
  imported_workout_id uuid references workouts(id) on delete set null,
  unique(external_account_id, provider_activity_id)
);

create table sync_jobs (
  id uuid primary key default gen_random_uuid(),
  external_account_id uuid not null references external_accounts(id) on delete cascade,
  idempotency_key text not null unique,
  status text not null check (status in ('queued','running','succeeded','failed')),
  error_message text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table seasons enable row level security;
alter table events enable row level security;
alter table goals enable row level security;
alter table workouts enable row level security;
alter table boat_setups enable row level security;
alter table sailing_sessions enable row level security;
alter table nutrition_logs enable row level security;
alter table sponsors enable row level security;
alter table documents enable row level security;
alter table season_members enable row level security;
alter table external_accounts enable row level security;
alter table external_activities enable row level security;
alter table sync_jobs enable row level security;

-- Membership helper used by resource policies.
create or replace function is_season_member(target_season uuid)
returns boolean language sql stable security definer set search_path = public
as $$
  select exists(
    select 1 from season_members sm
    where sm.season_id = target_season and sm.user_id = auth.uid()
  );
$$;

create policy "profile self read" on profiles for select using (id = auth.uid());
create policy "profile self update" on profiles for update using (id = auth.uid());

create policy "season members read seasons" on seasons for select using (is_season_member(id) or owner_id = auth.uid());
create policy "owner creates seasons" on seasons for insert with check (owner_id = auth.uid());

create policy "members read events" on events for select using (is_season_member(season_id));
create policy "members read goals" on goals for select using (is_season_member(season_id));
create policy "members read workouts" on workouts for select using (is_season_member(season_id));
create policy "members read setups" on boat_setups for select using (is_season_member(season_id));
create policy "members read sessions" on sailing_sessions for select using (
  is_season_member(season_id)
  and (
    (select role from season_members where season_id = sailing_sessions.season_id and user_id = auth.uid()) <> 'teammate'
    or crew_shared = true
  )
);
create policy "members read nutrition" on nutrition_logs for select using (
  is_season_member(season_id)
  and (select role from season_members where season_id = nutrition_logs.season_id and user_id = auth.uid()) in ('athlete','coach','admin')
);
create policy "athlete parent admin read sponsors" on sponsors for select using (
  is_season_member(season_id)
  and (select role from season_members where season_id = sponsors.season_id and user_id = auth.uid()) in ('athlete','parent','admin')
);
create policy "documents by visibility" on documents for select using (
  is_season_member(season_id)
  and (
    visibility = 'crew'
    or created_by = auth.uid()
    or (visibility = 'coach' and (select role from season_members where season_id = documents.season_id and user_id = auth.uid()) in ('athlete','coach','admin'))
    or (visibility = 'parents' and (select role from season_members where season_id = documents.season_id and user_id = auth.uid()) in ('athlete','parent','admin'))
  )
);

-- Write policies should be tightened further when real identities/roles are provisioned.
