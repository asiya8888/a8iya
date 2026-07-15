import { useEffect, useMemo, useState } from 'react';
import { createWatchlistItem, deleteWatchlistItem, loadWatchlist, updateWatchlistItem, type MediaType, type WatchlistItem, type WatchlistItemInput, type WatchStatus } from '../lib/watchlist';
import { WatchlistCard } from './WatchlistCard';
import { WatchlistDetail } from './WatchlistDetail';
import { WatchlistFilters } from './WatchlistFilters';
import { WatchlistForm } from './WatchlistForm';

export function Watchlist({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [items, setItems] = useState<WatchlistItem[]>([]); const [selected, setSelected] = useState<WatchlistItem | null>(null); const [editing, setEditing] = useState<WatchlistItem | null | undefined>(undefined); const [status, setStatus] = useState<WatchStatus | 'All'>('All'); const [type, setType] = useState<MediaType | 'All'>('All'); const [genre, setGenre] = useState('All'); const [error, setError] = useState('');
  const load = async () => { const { data, error } = await loadWatchlist(); if (error) setError(error.message); else setItems(data ?? []); };
  useEffect(() => { void load(); }, []);
  const genres = useMemo(() => [...new Set(items.map((item) => item.genre))].sort(), [items]);
  const visible = items.filter((item) => (status === 'All' || item.watch_status === status) && (type === 'All' || item.media_type === type) && (genre === 'All' || item.genre === genre));
  async function save(input: WatchlistItemInput) { const result = editing ? await updateWatchlistItem(editing.id, input) : await createWatchlistItem(input); if (result.error) { setError(result.error.message); return; } setEditing(undefined); setSelected(null); await load(); }
  async function remove() { if (!selected || !window.confirm(`Delete “${selected.title}”?`)) return; const { error } = await deleteWatchlistItem(selected.id); if (error) setError(error.message); else { setSelected(null); await load(); } }
  return <main className="watchlist-page"><header className="topbar"><div><p className="eyebrow">PERSONAL WATCHLIST</p><h1>Screen time, <em>well spent.</em></h1></div><button className="avatar" title={`Signed in as ${email}`} onClick={onSignOut}>Sign out</button></header><section className="intro"><p>Keep every movie, series, and anime you want to remember — all in one calm little space.</p><button onClick={() => setEditing(null)}>+ Add a title</button></section><WatchlistFilters status={status} type={type} genre={genre} genres={genres} onStatusChange={setStatus} onTypeChange={setType} onGenreChange={setGenre} />{error && <p className="message">{error}</p>}<section className="results"><p>{visible.length} {visible.length === 1 ? 'title' : 'titles'}</p><div className="media-grid">{visible.map((item) => <WatchlistCard key={item.id} item={item} onClick={() => setSelected(item)} />)}</div>{visible.length === 0 && <div className="empty-state"><span>✦</span><h2>Your list is quiet</h2><p>Add a title you’re excited to watch.</p></div>}</section>{editing !== undefined && <WatchlistForm item={editing} onSave={save} onClose={() => setEditing(undefined)} />}{selected && <WatchlistDetail item={selected} onClose={() => setSelected(null)} onEdit={() => setEditing(selected)} onDelete={remove} />}</main>;
}
