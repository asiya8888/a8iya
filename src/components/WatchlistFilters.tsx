import { mediaTypes, watchStatuses, type MediaType, type WatchStatus } from '../lib/watchlist';

type Props = {
  status: WatchStatus | 'All';
  type: MediaType | 'All';
  genre: string;
  genres: string[];
  onStatusChange: (value: WatchStatus | 'All') => void;
  onTypeChange: (value: MediaType | 'All') => void;
  onGenreChange: (value: string) => void;
};

export function WatchlistFilters({ status, type, genre, genres, onStatusChange, onTypeChange, onGenreChange }: Props) {
  return (
    <section className="filters" aria-label="Watchlist filters">
      <label>
        Status
        <select value={status} onChange={(event) => onStatusChange(event.target.value as WatchStatus | 'All')}>
          <option>All</option>
          {watchStatuses.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label>
        Type
        <select value={type} onChange={(event) => onTypeChange(event.target.value as MediaType | 'All')}>
          <option>All</option>
          {mediaTypes.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label>
        Genre
        <select value={genre} onChange={(event) => onGenreChange(event.target.value)}>
          <option value="All">All</option>
          {genres.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
    </section>
  );
}
