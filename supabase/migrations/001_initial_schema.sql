create extension if not exists btree_gist;

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  max_guests integer not null default 4,
  check_in_time time not null default '15:00',
  check_out_time time not null default '11:00',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.properties (id,name,address,max_guests)
values ('00000000-0000-0000-0000-000000000001', 'D''Anzi House', 'Via Dego 4, 00168 Roma RM', 4)
on conflict (id) do nothing;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  booking_code text not null unique,
  source text not null default 'website' check (source in ('website','airbnb','manual')),
  check_in date not null,
  check_out date not null,
  guests integer not null check (guests between 1 and 4),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  message text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  stay_period daterange generated always as (daterange(check_in, check_out, '[)')) stored,
  constraint booking_dates_valid check (check_out > check_in)
);

alter table public.bookings
  add constraint bookings_no_overlap
  exclude using gist (property_id with =, stay_period with &&)
  where (status in ('pending','confirmed'));

create table if not exists public.calendar_blocks (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  source text not null check (source in ('airbnb','manual')),
  external_uid text,
  start_date date not null,
  end_date date not null,
  type text not null default 'blocked',
  synced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint block_dates_valid check (end_date > start_date),
  unique(property_id, source, external_uid)
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;

create or replace function public.create_booking_request(
  p_property_id uuid,
  p_check_in date,
  p_check_out date,
  p_guests integer,
  p_first_name text,
  p_last_name text,
  p_email text,
  p_phone text,
  p_message text default null
) returns text
language plpgsql security definer set search_path=public as $$
declare
  v_code text;
begin
  perform pg_advisory_xact_lock(hashtext(p_property_id::text));
  if p_check_out <= p_check_in then raise exception 'INVALID_DATES'; end if;
  if p_guests < 1 or p_guests > 4 then raise exception 'INVALID_GUESTS'; end if;

  if exists (
    select 1 from public.calendar_blocks
    where property_id=p_property_id
      and daterange(start_date,end_date,'[)') && daterange(p_check_in,p_check_out,'[)')
  ) then raise exception 'DATES_NOT_AVAILABLE'; end if;

  if exists (
    select 1 from public.bookings
    where property_id=p_property_id and status in ('pending','confirmed')
      and stay_period && daterange(p_check_in,p_check_out,'[)')
  ) then raise exception 'DATES_NOT_AVAILABLE'; end if;

  v_code := 'DH-' || to_char(now(),'YYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,6));
  insert into public.bookings(property_id,booking_code,check_in,check_out,guests,first_name,last_name,email,phone,message)
  values(p_property_id,v_code,p_check_in,p_check_out,p_guests,trim(p_first_name),trim(p_last_name),lower(trim(p_email)),trim(p_phone),nullif(trim(p_message),''));
  return v_code;
end; $$;

create or replace function public.replace_airbnb_blocks(p_property_id uuid, p_blocks jsonb)
returns void language plpgsql security definer set search_path=public as $$
begin
  perform pg_advisory_xact_lock(hashtext(p_property_id::text));
  delete from public.calendar_blocks where property_id=p_property_id and source='airbnb';
  insert into public.calendar_blocks(property_id,source,external_uid,start_date,end_date,type,synced_at)
  select p_property_id,'airbnb',x.uid,x.start_date::date,x.end_date::date,'blocked',now()
  from jsonb_to_recordset(coalesce(p_blocks,'[]'::jsonb)) as x(uid text,start_date text,end_date text)
  where x.start_date::date < x.end_date::date;
end; $$;

alter table public.properties enable row level security;
alter table public.bookings enable row level security;
alter table public.calendar_blocks enable row level security;
alter table public.admin_users enable row level security;

create policy "Public can read availability blocks" on public.calendar_blocks for select using (true);
create policy "Admins can manage bookings" on public.bookings for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage blocks" on public.calendar_blocks for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins can read properties" on public.properties for select using (public.is_admin());

revoke all on function public.create_booking_request(uuid,date,date,integer,text,text,text,text,text) from public, anon, authenticated;
revoke all on function public.replace_airbnb_blocks(uuid,jsonb) from public, anon, authenticated;
