-- Blog posts for both sites. Visitors see published posts only (published_at set and not in the future); editors see
-- and change everything, including drafts.
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  site text not null check (site in ('wedding', 'rcc')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 80),
  title text not null default '' check (char_length(title) <= 200),
  excerpt text not null default '' check (char_length(excerpt) <= 400),
  cover text not null default '',
  cover_alt text not null default '',
  body text not null default '',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text,
  unique (site, slug)
);
create index posts_site_published on public.posts (site, published_at desc);
alter table public.posts enable row level security;
create policy "anyone reads published posts" on public.posts for select using (published_at is not null and published_at <= now());
create policy "editors read all posts" on public.posts for select using (public.is_editor());
create policy "editors write posts" on public.posts for all using (public.is_editor()) with check (public.is_editor());
grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;
grant all on public.posts to service_role;

-- RCC free download: the email a teacher leaves to get the PDF is saved alongside enquiries and bookings.
alter table public.submissions drop constraint submissions_kind_check;
alter table public.submissions add constraint submissions_kind_check check (kind in ('enquiry', 'booking', 'download'));
