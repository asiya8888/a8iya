-- Personal movie, series and anime watchlists. Every row belongs to its creator.
create table public.watchlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(trim(title)) > 0),
  poster_url text,
  media_type text not null check (media_type in ('Movie', 'Series', 'Anime')),
  genre text not null check (char_length(trim(genre)) > 0),
  watch_status text not null default 'Want to Watch'
    check (watch_status in ('Want to Watch', 'Watching', 'Watched')),
  rating smallint check (rating between 1 and 10),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.watchlist_items enable row level security;

create policy "read own watchlist items"
  on public.watchlist_items for select using (auth.uid() = user_id);

create policy "insert own watchlist items"
  on public.watchlist_items for insert with check (auth.uid() = user_id);

create policy "update own watchlist items"
  on public.watchlist_items for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "delete own watchlist items"
  on public.watchlist_items for delete using (auth.uid() = user_id);
