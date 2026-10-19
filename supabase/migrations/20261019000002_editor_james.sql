-- James (developer) can sign in and edit too, kept after launch
insert into editors (email) values ('jamesmlupton@gmail.com') on conflict do nothing;
