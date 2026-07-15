type EndScreenProps = {
  label?: string;
  title: string;
  text: string;
  actionLabel?: string;
  danger?: boolean;
  menu?: boolean;
  onRestart: () => void;
};

export function EndScreen({
  label,
  title,
  text,
  actionLabel = 'Restart',
  danger = false,
  menu = false,
  onRestart,
}: EndScreenProps) {
  return (
    <div className={`end-screen ${danger ? 'end-screen--danger' : ''} ${menu ? 'end-screen--menu' : ''}`}>
      <div>
        <p className="label">{label ?? (danger ? 'The door was a mistake' : 'Sunrise')}</p>
        <h2>{title}</h2>
        <p>{text}</p>
        <button onClick={onRestart}>{actionLabel}</button>
      </div>
    </div>
  );
}
