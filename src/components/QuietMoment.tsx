type QuietMomentProps = {
  outcome?: string;
};

export function QuietMoment({ outcome }: QuietMomentProps) {
  return (
    <section className="visitor-card quiet-card">
      <p className="label">Inside the cabin</p>
      <h2>Quiet</h2>
      {outcome && <p className="event-text">{outcome}</p>}
      <p className="quote">The fireplace crackles softly.</p>
      <p className="quote">Wind moves against the walls, then fades.</p>
    </section>
  );
}
