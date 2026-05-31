-- Prime Digital Mall — Supabase schema (Phase 2: business self-serve + admin).
-- Run this in Supabase → SQL Editor once. Free tier is enough to start.

-- ── Profiles (roles) ────────────────────────────────────────────────
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null default 'buyer' check (role in ('buyer','seller','admin')),
  full_name text,
  created_at timestamptz default now()
);

-- ── Business submissions (the seller signup → admin approval queue) ──
create table if not exists business_submissions (
  id text primary key,
  owner uuid references auth.users on delete set null,
  vertical text not null check (vertical in ('shop','food','health','services')),
  category text not null,
  business_name text not null,
  owner_name text not null,
  city text not null,
  phone text not null,
  whatsapp text not null,
  description text not null,
  address text,
  delivery text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);

-- ── Listings (products/dishes/doctors/offerings once approved) ──────
create table if not exists listings (
  id text primary key,
  business_id text references business_submissions(id) on delete cascade,
  owner uuid references auth.users on delete set null,
  vertical text not null,
  category text not null,
  name text not null,
  price integer not null default 0,        -- whole PKR
  compare_at integer,
  emoji text default '🛍️',
  short_desc text,
  description text,
  image_url text,                           -- store in Cloudflare R2; keep URL here
  city text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  rating numeric default 0,
  review_count integer default 0,
  created_at timestamptz default now()
);

-- ── Orders (capture real orders; launch with COD/bank) ─────────────
create table if not exists orders (
  id text primary key,
  buyer uuid references auth.users on delete set null,
  vertical text not null,
  items jsonb not null,                     -- [{slug,name,qty,price}]
  subtotal integer not null,
  delivery_fee integer not null default 0,
  total integer not null,
  customer_name text not null,
  customer_phone text not null,
  customer_address text,
  city text,
  payment_method text not null default 'cod' check (payment_method in ('cod','easypaisa','bank','online')),
  status text not null default 'placed' check (status in ('placed','confirmed','shipped','delivered','cancelled')),
  created_at timestamptz default now()
);

-- ── Row Level Security ──────────────────────────────────────────────
alter table profiles enable row level security;
alter table business_submissions enable row level security;
alter table listings enable row level security;
alter table orders enable row level security;

-- helper: is current user an admin?
create or replace function is_admin() returns boolean language sql security definer stable as $$
  select exists(select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

-- profiles: a user reads/updates only their own
create policy "own profile read"  on profiles for select using (auth.uid() = id or is_admin());
create policy "own profile write" on profiles for update using (auth.uid() = id);

-- submissions: anyone may create (signup); owner or admin reads; admin updates status
create policy "submit business"   on business_submissions for insert with check (true);
create policy "read own or admin" on business_submissions for select using (owner = auth.uid() or is_admin());
create policy "admin updates"     on business_submissions for update using (is_admin());

-- listings: public reads only approved; owners manage own; admin manages all
create policy "public approved listings" on listings for select using (status = 'approved' or owner = auth.uid() or is_admin());
create policy "owner inserts listing"    on listings for insert with check (owner = auth.uid());
create policy "owner or admin updates"   on listings for update using (owner = auth.uid() or is_admin());

-- orders: buyer reads own; admin reads all; anyone may place
create policy "place order"      on orders for insert with check (true);
create policy "read own orders"  on orders for select using (buyer = auth.uid() or is_admin());
create policy "admin updates ord" on orders for update using (is_admin());

-- ── Auto-create a profile row on signup ─────────────────────────────
create or replace function handle_new_user() returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- To make yourself admin after signing up:
--   update profiles set role='admin' where id = (select id from auth.users where email='you@example.com');
