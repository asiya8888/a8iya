import { useState } from 'react';
import { snowStyle } from '../lib/snow';
import { startAmbience } from '../lib/sounds';

type IntroSequenceProps = {
  onComplete: () => void;
};

const introFrames = [
  'You live alone in a small cabin deep in the mountains.',
  'The storm has covered the road. No one is leaving tonight.',
  'Several weeks ago, you found a diary half-buried under the snow.',
  'Most pages were ruined. The readable ones mentioned Mimics.',
  'The diary gives warnings, then contradicts itself.',
  'If you survive seven more nights, the storm should finally pass.',
];

export function IntroSequence({ onComplete }: IntroSequenceProps) {
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
            <p>The storm seems stronger tonight.</p>
          </>
        ) : (
          <>
            <p className="label">Seven nights remain</p>
            <h1>WHITEOUT</h1>
            <p>{introFrames[frame]}</p>
          </>
        )}
        <button onClick={advance}>{finalFrame ? 'Begin' : 'Continue'}</button>
      </section>
    </main>
  );
}
