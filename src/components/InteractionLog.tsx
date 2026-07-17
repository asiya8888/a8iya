import type { GameSettings } from '../lib/settings';
import { TypewriterText } from './TypewriterText';

type InteractionLogProps = {
  entries: string[];
  outcome?: string;
  settings: GameSettings;
};

export function InteractionLog({ entries, outcome, settings }: InteractionLogProps) {
  if (entries.length === 0 && !outcome) return null;

  return (
    <div className="interaction-log">
      {entries.map((entry) => (
        <TypewriterText key={entry} settings={settings} text={entry} />
      ))}
      {outcome && <TypewriterText className="outcome-text" settings={settings} text={outcome} />}
    </div>
  );
}
