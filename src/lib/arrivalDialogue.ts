import type { GameCharacter } from './characters/types';

const mainArrivals: Record<string, string> = {
  hunter: 'I lost the north trail about an hour ago. Something has stayed behind me since then.',
  'old-woman': 'I am sorry to wake you, dear. The path disappeared and my hands are going numb.',
  doctor: 'My car stopped on the lower road. I have medical supplies, but I cannot stay outside much longer.',
  'woman-red': 'I came from the lodge. The lights went out and somebody followed me into the trees.',
  priest: 'Forgive the late knock. I left the chapel before the road became impassable.',
  'lost-boy': 'Our bus stopped near the pass. I waited by the road until I heard someone calling from the trees.',
  lumberjack: 'The logging road is buried. I followed the power lines until I saw your chimney.',
  teacher: 'Our bus broke down near the pass. I went back for two students and lost the road.',
  fisherman: 'The reservoir ice cracked under me. I reached shore, but I heard someone climb out behind me.',
  musician: 'I left the lodge after the power failed. I kept hearing music farther down the road.',
  student: 'I left the dorm when the power went out. Someone was trying every door in the hallway.',
  photographer: 'I was taking storm photographs near the lodge. Someone followed me after the last flash.',
  'twin-sisters': 'Our car slid off the road. We have been walking together since then.',
  soldier: 'My convoy stopped below the ridge. I was separated from the others in the whiteout.',
  wanderer: 'I have been walking since before dark. I do not remember where the trail began.',
};

export const arrivalDialogue = (character: GameCharacter) => mainArrivals[character.id] ?? character.dialogue[0];
