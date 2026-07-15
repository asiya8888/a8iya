import { supabase } from './supabase';

export const mediaTypes = ['Movie', 'Series', 'Anime'] as const;
export const watchStatuses = ['Want to Watch', 'Watching', 'Watched'] as const;

export type MediaType = (typeof mediaTypes)[number];
export type WatchStatus = (typeof watchStatuses)[number];

export type WatchlistItem = {
  id: string;
  title: string;
  poster_url: string | null;
  media_type: MediaType;
  genre: string;
  watch_status: WatchStatus;
  rating: number | null;
  note: string | null;
  created_at: string;
};

export type WatchlistItemInput = Omit<WatchlistItem, 'id' | 'created_at'>;

export async function loadWatchlist() {
  return supabase.from('watchlist_items').select('*').order('created_at', { ascending: false });
}

export async function createWatchlistItem(item: WatchlistItemInput) {
  return supabase.from('watchlist_items').insert(item);
}

export async function updateWatchlistItem(id: string, item: WatchlistItemInput) {
  return supabase.from('watchlist_items').update(item).eq('id', id);
}

export async function deleteWatchlistItem(id: string) {
  return supabase.from('watchlist_items').delete().eq('id', id);
}
