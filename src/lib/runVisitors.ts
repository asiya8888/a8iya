import { createCharacterSchedule, scheduledCharacter, type CharacterSchedule } from './characterSchedule';
import { STARTING_SUPPLIES } from './gameConfig';
import { makeVisitor } from './visitors';
import type { VisitorMemory } from './visitorMemory';

export type VisitorRunState = {
  hadMimicInside: boolean;
  schedule: CharacterSchedule;
};

export type VisitorRunStats = {
  helped: number;
  refused: number;
  supplies: number;
};

export const createVisitorRun = (): VisitorRunState => ({
  hadMimicInside: false,
  schedule: createCharacterSchedule(),
});

export const initialRunStats = (): VisitorRunStats => ({
  helped: 0,
  refused: 0,
  supplies: STARTING_SUPPLIES,
});

export function makeRunVisitor(
  run: VisitorRunState,
  index: number,
  night: number,
  stats: VisitorRunStats,
  memories: VisitorMemory[] = [],
) {
  return makeVisitor(index, night, scheduledCharacter(run.schedule, night, index, {
    hadMimicInside: run.hadMimicInside,
    ...stats,
  }), memories);
}
