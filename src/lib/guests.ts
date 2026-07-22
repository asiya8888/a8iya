import type { GameCharacter } from './characters/types';
import type { VisitorKind } from './visitors';

export type CabinGuest = {
  arrivedAt: number;
  arrivedNight: number;
  behaviors: string[];
  dialogue: string[];
  id: string;
  kind: VisitorKind;
  leaveAfterNight: number;
  name: string;
  personality: string;
  portrait?: string;
  talks: number;
};

const guestThoughts = [
  'The storm sounds closer than it did before.',
  "Thank you for letting me stay. I don't think I would have made it much longer.",
  "I keep hearing the wood settle, but sometimes it doesn't sound like wood.",
  "If someone else knocks, don't trust them too quickly.",
  "It's warmer in here, but I still feel watched.",
];

const suspiciousGuestThoughts = [
  "It's strange how safe this room feels.",
  'You have been alone here for a long time, haven\'t you?',
  'The others sleep so quietly.',
  'I would open the door for the next one.',
];

export function stayLength(character: GameCharacter) {
  const [min, max] = character.stayNights;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function guestLine(guest: CabinGuest, visitorAtDoor: boolean, visitorName?: string) {
  if (visitorAtDoor && guest.kind === 'human') return visitorName ? `I don't trust ${visitorName} yet. Ask one more question.` : "I don't trust tonight's visitor.";
  if (visitorAtDoor) return 'You should see who it is.';
  const personalLines = [
    guest.dialogue[1],
    guest.behaviors[guest.talks % guest.behaviors.length],
    `I've started feeling safer here, but ${guest.personality.split(',')[0]} people notice when safety changes.`,
  ].filter(Boolean);
  const lines = guest.kind === 'skinwalker'
    ? [...personalLines, ...suspiciousGuestThoughts]
    : [...personalLines, ...guestThoughts];
  return lines[guest.talks % lines.length];
}
