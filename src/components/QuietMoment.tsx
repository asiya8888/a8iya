import type { GameSettings } from '../lib/settings';
import { TypewriterText } from './TypewriterText';

type QuietMomentProps = {
  outcome?: string;
  settings: GameSettings;
};

export function QuietMoment({ outcome, settings }: QuietMomentProps) {
  return (
    <section className="visitor-card quiet-card">
      <p className="label">Inside the cabin</p>
      <h2>Quiet</h2>
      {outcome && <TypewriterText className="event-text" settings={settings} text={outcome} />}
      <TypewriterText className="quote" settings={settings} text="The fireplace crackles softly." />
      <TypewriterText className="quote" settings={settings} text="Wind moves against the walls, then fades." />
    </section>
  );
}
