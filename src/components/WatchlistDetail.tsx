import type { WatchlistItem } from '../lib/watchlist';

type Props = { item: WatchlistItem; onEdit: () => void; onDelete: () => void; onClose: () => void };

export function WatchlistDetail({ item, onEdit, onDelete, onClose }: Props) {
  return <div className="modal-backdrop" role="presentation"><article className="modal detail" role="dialog" aria-modal="true" aria-label={`${item.title} details`}><div className="modal__header"><span className="eyebrow">Your watchlist</span><button className="icon-button" onClick={onClose} aria-label="Close">×</button></div><div className="detail__content"><div className="detail__poster poster">{item.poster_url ? <img src={item.poster_url} alt={`${item.title} poster`} /> : <span>{item.media_type}</span>}</div><div><p className="eyebrow">{item.media_type} · {item.genre}</p><h2>{item.title}</h2><span className={`status status--${item.watch_status.replace(/ /g, '-').toLowerCase()}`}>{item.watch_status}</span><p className="rating">{item.rating ? `★ ${item.rating}/10` : 'Not rated yet'}</p><h3>Your note</h3><p className="detail__note">{item.note || 'No note yet — add a thought when you’re ready.'}</p></div></div><div className="detail__actions"><button className="ghost" onClick={onDelete}>Delete</button><button onClick={onEdit}>Edit title</button></div></article></div>;
}
