import type { VisitorKind } from './visitors';

export type CabinGuest = {
  arrivedAt: number;
  id: string;
  kind: VisitorKind;
  name: string;
  talks: number;
};

export const guestThoughts = [
  'The storm sounds closer than it did before.',
  "Thank you for letting me stay. I don't think I would have made it much longer.",
  "I keep hearing the wood settle, but sometimes it doesn't sound like wood.",
  "If someone else knocks, don't trust them too quickly.",
  "It's warmer in here, but I still feel watched.",
];

export const suspiciousGuestThoughts = [
  "It's strange how safe this room feels.",
  'You have been alone here for a long time, haven\'t you?',
  'The others sleep so quietly.',
  'I would open the door for the next one.',
];

export function guestLine(guest: CabinGuest, visitorAtDoor: boolean) {
  if (visitorAtDoor && guest.kind === 'human') return "I don't trust whoever is outside.";
  if (visitorAtDoor) return 'You should see who it is.';
  const lines = guest.kind === 'skinwalker' ? suspiciousGuestThoughts : guestThoughts;
  return lines[guest.talks % lines.length];
}
