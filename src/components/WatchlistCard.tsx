import type { WatchlistItem } from '../lib/watchlist';

export function WatchlistCard({ item, onClick }: { item: WatchlistItem; onClick: () => void }) {
  return (
    <button className="media-card" onClick={onClick} aria-label={`Open ${item.title}`}>
      <div className="poster">
        {item.poster_url ? <img src={item.poster_url} alt={`${item.title} poster`} /> : <span>{item.media_type}</span>}
      </div>
      <div className="media-card__body">
        <div className="media-card__top"><span className="eyebrow">{item.media_type} · {item.genre}</span><span className={`status status--${item.watch_status.replace(/ /g, '-').toLowerCase()}`}>{item.watch_status}</span></div>
        <h3>{item.title}</h3>
        <p>{item.rating ? `★ ${item.rating}/10` : 'No rating yet'}</p>
      </div>
    </button>
  );
}
