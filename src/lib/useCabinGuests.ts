import { useState } from 'react';
import type { CabinGuest } from './guests';
import type { Visitor } from './visitors';

export function useCabinGuests() {
  const [guests, setGuests] = useState<CabinGuest[]>([]);
  const [guestMessage, setGuestMessage] = useState('');
  const [delayedEnding, setDelayedEnding] = useState(false);

  const resetGuests = () => {
    setGuests([]);
    setGuestMessage('');
    setDelayedEnding(false);
  };

  const addAllowedGuest = (visitor: Visitor, night: number, score: number) => {
    if (visitor.kind === 'empty') return;
    setGuests((current) => [
      ...current,
      {
        arrivedAt: score,
        id: `${night}-${visitor.id}-${visitor.name}`,
        kind: visitor.kind,
        name: visitor.name,
        talks: 0,
      },
    ]);
  };

  const talkGuest = (guestId: string) => {
    setGuests((current) => current.map((guest) => guest.id === guestId ? { ...guest, talks: guest.talks + 1 } : guest));
  };

  const checkGuests = (score: number) => {
    const delayedMimic = guests.some((guest) => guest.kind === 'skinwalker' && score > guest.arrivedAt);
    if (delayedMimic && guests.some((guest) => guest.kind === 'human')) {
      setGuestMessage('The chairs are overturned. The room is silent. No one answers when you say their names.');
      setDelayedEnding(true);
      return;
    }
    setGuestMessage('The guests are quiet, listening to the storm and the door.');
  };

  return { addAllowedGuest, checkGuests, delayedEnding, guestMessage, guests, resetGuests, talkGuest };
}
