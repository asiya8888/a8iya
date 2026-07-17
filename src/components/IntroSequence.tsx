import { useState } from 'react';
import type { GameSettings } from '../lib/settings';
import { snowStyle } from '../lib/snow';
import { startAmbience } from '../lib/sounds';
import { TypewriterText } from './TypewriterText';

type IntroSequenceProps = {
  onComplete: () => void;
  settings: GameSettings;
};

const introFrames = [
  'You live alone in a small cabin deep in the mountains.',
  'The storm has covered the road. No one is leaving tonight.',
  'Several weeks ago, you found a diary half-buried under the snow.',
  'Most pages were ruined. The readable ones mentioned Mimics.',
  'The diary gives warnings, then contradicts itself.',
  'If you survive seven more nights, the storm should finally pass.',
];

export function IntroSequence({ onComplete, settings }: IntroSequenceProps) {
  const [frame, setFrame] = useState(0);
  const [ending, setEnding] = useState(false);
  const finalFrame = frame >= introFrames.length;

  const advance = () => {
    startAmbience();
    if (!finalFrame) setFrame((current) => current + 1);
    else {
      setEnding(true);
      window.setTimeout(onComplete, 2400);
    }
  };

  return (
    <main className={`intro-shell ${ending ? 'intro-shell--fade' : ''}`}>
      {Array.from({ length: 46 }, (_, index) => (
        <span className="intro-snow" key={index} style={snowStyle(index)} />
      ))}
      <section className="intro-panel">
        {finalFrame ? (
          <>
            <p className="label">Night 1</p>
            <h1>11:43 PM</h1>
            <TypewriterText settings={settings} text="The storm seems stronger tonight." />
          </>
        ) : (
          <>
            <p className="label">Seven nights remain</p>
            <h1>WHITEOUT</h1>
            <TypewriterText settings={settings} text={introFrames[frame]} />
          </>
        )}
        <button onClick={advance}>{finalFrame ? 'Begin' : 'Continue'}</button>
      </section>
    </main>
  );
}
