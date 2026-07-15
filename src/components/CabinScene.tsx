export function CabinScene() {
  return (
    <section className="cabin" aria-label="Cabin front door">
      <div className="window">
        <div className="moon" />
        {Array.from({ length: 36 }, (_, index) => (
          <span
            className="snowflake"
            key={index}
            style={{
              left: `${(index * 29) % 100}%`,
              animationDelay: `${(index % 12) * 0.25}s`,
              animationDuration: `${4 + (index % 5)}s`,
            }}
          />
        ))}
      </div>
      <div className="door">
        <div className="door-panel" />
        <div className="door-panel" />
        <span className="knob" />
      </div>
      <div className="floor-light" />
    </section>
  );
}
