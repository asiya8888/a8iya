import { useEffect, useState } from 'react';
import type { GameSettings } from '../lib/settings';

type TypewriterTextProps = {
  className?: string;
  settings: GameSettings;
  text: string;
};

const delays = { Slow: 42, Normal: 24, Fast: 10 };

export function TypewriterText({ className, settings, text }: TypewriterTextProps) {
  const [shown, setShown] = useState(settings.typewriter ? '' : text);

  useEffect(() => {
    if (!settings.typewriter) {
      setShown(text);
      return undefined;
    }

    setShown('');
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setShown(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, delays[settings.textSpeed]);

    return () => window.clearInterval(timer);
  }, [settings.textSpeed, settings.typewriter, text]);

  return <p className={className}>{shown}</p>;
}
