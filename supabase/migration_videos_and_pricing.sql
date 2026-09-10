-- =========================================================
-- NetWatchShop — Migration: Product pricing/video fields
-- + separate "videos" table (Videos section)
-- =========================================================
-- Run this once in your Supabase project's SQL Editor
-- (Dashboard → SQL Editor → New Query → paste → Run).
-- It is safe to run more than once (uses IF NOT EXISTS).
-- =========================================================

-- 1) New optional columns on the existing "products" table.
--    Existing products and existing "price" / "specifications"
--    columns are left untouched, so nothing currently working
--    will break.
alter table public.products
  add column if not exists regular_price numeric,
  add column if not exists discount_price numeric,
  add column if not exists discount_percentage numeric,
  add column if not exists product_video_url text;

-- specifications already exists as a text column. From now on the
-- Admin Panel stores it as one specification per line (newline
-- separated) so it can be shown as a bullet list in the collapsible
-- "Specifications ▼" dropdown. No column change is needed.


-- 2) New "videos" table for the separate "Videos" section.
--    This is completely separate from:
--      • the "video" table (singular) which holds the ONE main
--        homepage video, and
--      • "product_video_url" on products, which is per-product.
create table if not exists public.videos (
  id bigint generated always as identity primary key,
  title text not null,
  video_url text not null,
  thumbnail_url text,
  description text,
  created_at timestamptz not null default now()
);

alter table public.videos enable row level security;

-- Public (anonymous) visitors can read videos so they show on the
-- live website.
drop policy if exists "Public can read videos" on public.videos;
create policy "Public can read videos"
  on public.videos
  for select
  to anon, authenticated
  using (true);

-- Only logged-in owners (Supabase Auth users, i.e. the admin panel)
-- can add, edit or delete videos. This mirrors how "products" and
-- "gallery" already restrict writes to authenticated users.
drop policy if exists "Authenticated can insert videos" on public.videos;
create policy "Authenticated can insert videos"
  on public.videos
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update videos" on public.videos;
create policy "Authenticated can update videos"
  on public.videos
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete videos" on public.videos;
create policy "Authenticated can delete videos"
  on public.videos
  for delete
  to authenticated
  using (true);

-- =========================================================
-- Done. After running this:
--   • Admin Panel → "Videos Management" tab can add/edit/delete
--     general videos, which appear in the "Videos" section on
--     the live website.
--   • Admin Panel → Add/Edit Product now has Discount Price and
--     Product Video URL fields, and Specifications is entered
--     one line per specification.
-- =========================================================
