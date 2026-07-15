import type { Visitor } from './visitors';

export type ChoiceResult = {
  livesLost: number;
  message: string;
  gameOver: boolean;
  jumpscare: boolean;
};

export function resolveChoice(visitor: Visitor, choice: 'allow' | 'refuse'): ChoiceResult {
  if (visitor.kind === 'skinwalker' && choice === 'allow') {
    return { livesLost: 3, message: 'It crosses the threshold smiling.', gameOver: true, jumpscare: true };
  }

  if (visitor.kind === 'human' && choice === 'refuse') {
    return { livesLost: 1, message: 'A human is left in the storm.', gameOver: false, jumpscare: false };
  }

  if (visitor.kind === 'human' && choice === 'allow' && visitor.outcome === 'injure') {
    return { livesLost: 1, message: 'They panic inside and hurt you by accident.', gameOver: false, jumpscare: false };
  }

  if (visitor.kind === 'human' && choice === 'allow' && visitor.outcome === 'steal') {
    return { livesLost: 0, message: 'They leave before dawn. Some supplies are missing.', gameOver: false, jumpscare: false };
  }

  if (visitor.kind === 'empty') {
    return { livesLost: 0, message: 'The doorway opens to snow and nothing else.', gameOver: false, jumpscare: false };
  }

  return { livesLost: 0, message: 'The choice passes without disaster.', gameOver: false, jumpscare: false };
}
