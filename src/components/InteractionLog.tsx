type InteractionLogProps = {
  entries: string[];
  outcome?: string;
};

export function InteractionLog({ entries, outcome }: InteractionLogProps) {
  if (entries.length === 0 && !outcome) return null;

  return (
    <div className="interaction-log">
      {entries.map((entry) => (
        <p key={entry}>{entry}</p>
      ))}
      {outcome && <p className="outcome-text">{outcome}</p>}
    </div>
  );
}
