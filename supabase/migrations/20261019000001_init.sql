-- Minnie's two sites (wedding celebrant + RCC Workshops) share one project; every row says which site it belongs to.

-- People allowed to edit (Minnie). Add a row after their first sign-in, or by email before it (see is_editor).
create table public.editors (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);
alter table public.editors enable row level security;

create or replace function public.is_editor() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.editors e where e.email = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;
grant execute on function public.is_editor() to anon, authenticated;

create policy "editors see editors" on public.editors for select using (public.is_editor());

-- Edited text, lists and image paths, overriding the defaults in the code (src/lib/content/*.ts) key by key.
create table public.content (
  site text not null check (site in ('wedding', 'rcc')),
  key text not null check (char_length(key) <= 100),
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by text,
  primary key (site, key)
);
alter table public.content enable row level security;
create policy "anyone reads content" on public.content for select using (true);
create policy "editors write content" on public.content for all using (public.is_editor()) with check (public.is_editor());

-- Enquiries (wedding) and booking requests (RCC). Inserted by the server; only editors can read or update them.
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  site text not null check (site in ('wedding', 'rcc')),
  kind text not null check (kind in ('enquiry', 'booking')),
  name text not null default '',
  email text not null default '',
  data jsonb not null default '{}',
  status text not null default 'new' check (status in ('new', 'replied', 'booked', 'done', 'archived')),
  notes text not null default '',
  created_at timestamptz not null default now()
);
create index submissions_site_created on public.submissions (site, created_at desc);
alter table public.submissions enable row level security;
create policy "editors read submissions" on public.submissions for select using (public.is_editor());
create policy "editors update submissions" on public.submissions for update using (public.is_editor()) with check (public.is_editor());

-- Grants: new tables get none by default, and without them every read/write fails silently. RLS above decides rows.
grant select on public.content to anon, authenticated;
grant insert, update, delete on public.content to authenticated;
grant select, update on public.submissions to authenticated;
grant select on public.editors to authenticated;
grant all on public.content, public.submissions, public.editors to service_role;

-- Images Minnie uploads when swapping a picture: public to read, editors to write.
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
create policy "anyone reads media" on storage.objects for select using (bucket_id = 'media');
create policy "editors upload media" on storage.objects for insert with check (bucket_id = 'media' and public.is_editor());
create policy "editors change media" on storage.objects for update using (bucket_id = 'media' and public.is_editor());
create policy "editors delete media" on storage.objects for delete using (bucket_id = 'media' and public.is_editor());

-- Minnie's addresses (one per site); either can sign in to edit both sites.
insert into public.editors (email) values ('modernminnieweddings@gmail.com'), ('rccworkshopsuk@gmail.com') on conflict do nothing;
