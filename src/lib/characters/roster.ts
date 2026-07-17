import { mainCharacters } from './mainCharacters';
import { randomCharactersA } from './randomCharactersA';
import { randomCharactersB } from './randomCharactersB';
import { randomCharactersC } from './randomCharactersC';
import { rareCharacters } from './rareCharacters';
import type { GameCharacter } from './types';

export const randomCharacters = [...randomCharactersA, ...randomCharactersB, ...randomCharactersC];
export const allCharacters = [...mainCharacters, ...randomCharacters, ...rareCharacters];

export function findCharacter(id: string) {
  return allCharacters.find((character) => character.id === id);
}

export function assertRosterComplete() {
  const ids = new Set(allCharacters.map((character) => character.id));
  const expectedCounts: Record<GameCharacter['tier'], number> = { main: 15, random: 45, rare: 10 };
  const counts = allCharacters.reduce<Record<GameCharacter['tier'], number>>(
    (total, character) => ({ ...total, [character.tier]: total[character.tier] + 1 }),
    { main: 0, random: 0, rare: 0 },
  );

  return ids.size === 70 && allCharacters.length === 70 &&
    counts.main === expectedCounts.main &&
    counts.random === expectedCounts.random &&
    counts.rare === expectedCounts.rare;
}
