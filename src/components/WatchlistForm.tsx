import { useEffect, useState } from 'react';
import { mediaTypes, watchStatuses, type WatchlistItem, type WatchlistItemInput } from '../lib/watchlist';

const emptyItem: WatchlistItemInput = { title: '', poster_url: null, media_type: 'Movie', genre: '', watch_status: 'Want to Watch', rating: null, note: null };

type Props = { item: WatchlistItem | null; onSave: (item: WatchlistItemInput) => Promise<void>; onClose: () => void };

export function WatchlistForm({ item, onSave, onClose }: Props) {
  const [form, setForm] = useState<WatchlistItemInput>(emptyItem);
  const [busy, setBusy] = useState(false);

  useEffect(() => { setForm(item ? { title: item.title, poster_url: item.poster_url, media_type: item.media_type, genre: item.genre, watch_status: item.watch_status, rating: item.rating, note: item.note } : emptyItem); }, [item]);
  const set = <K extends keyof WatchlistItemInput>(key: K, value: WatchlistItemInput[K]) => setForm((old) => ({ ...old, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    await onSave({ ...form, title: form.title.trim(), genre: form.genre.trim(), poster_url: form.poster_url?.trim() || null, note: form.note?.trim() || null });
    setBusy(false);
  }

  return <div className="modal-backdrop" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-label="Watchlist item"><div className="modal__header"><h2>{item ? 'Edit title' : 'Add a title'}</h2><button className="icon-button" onClick={onClose} aria-label="Close">×</button></div><form className="entry-form" onSubmit={submit}>
    <label>Title<input value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="e.g. Spirited Away" /></label>
    <label>Poster image URL<input type="url" value={form.poster_url ?? ''} onChange={(e) => set('poster_url', e.target.value)} placeholder="https://…" /></label>
    <div className="form-grid"><label>Type<select value={form.media_type} onChange={(e) => set('media_type', e.target.value as WatchlistItemInput['media_type'])}>{mediaTypes.map((value) => <option key={value}>{value}</option>)}</select></label><label>Genre<input value={form.genre} onChange={(e) => set('genre', e.target.value)} required placeholder="Drama" /></label></div>
    <div className="form-grid"><label>Status<select value={form.watch_status} onChange={(e) => set('watch_status', e.target.value as WatchlistItemInput['watch_status'])}>{watchStatuses.map((value) => <option key={value}>{value}</option>)}</select></label><label>Rating <span className="label-note">(1–10)</span><input type="number" min="1" max="10" value={form.rating ?? ''} onChange={(e) => set('rating', e.target.value ? Number(e.target.value) : null)} /></label></div>
    <label>Personal note<textarea value={form.note ?? ''} onChange={(e) => set('note', e.target.value)} placeholder="What did you think?" rows={4} /></label>
    <button disabled={busy}>{busy ? 'Saving…' : item ? 'Save changes' : 'Add to watchlist'}</button>
  </form></section></div>;
}
