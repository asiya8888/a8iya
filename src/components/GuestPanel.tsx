import type { CabinGuest } from '../lib/guests';
import { guestLine } from '../lib/guests';
import type { GameSettings } from '../lib/settings';
import { TypewriterText } from './TypewriterText';

type GuestPanelProps = {
  guests: CabinGuest[];
  isKnocking: boolean;
  message: string;
  onCheckGuests: () => void;
  onTalk: (guestId: string) => void;
  settings: GameSettings;
  visitorName?: string;
};

export function GuestPanel({ guests, isKnocking, message, onCheckGuests, onTalk, settings, visitorName }: GuestPanelProps) {
  if (guests.length === 0) return null;

  return (
    <section className="guest-panel">
      <p className="label">Living room guests</p>
      {message && <TypewriterText className="event-text" settings={settings} text={message} />}
      <div className="guest-list">
        {guests.map((guest) => (
          <button key={guest.id} onClick={() => onTalk(guest.id)} type="button">
            {guest.name}
          </button>
        ))}
      </div>
      <button className="guest-check" onClick={onCheckGuests} type="button">Check The Room</button>
      <TypewriterText
        className="quote"
        settings={settings}
        text={guestLine(guests[0], isKnocking, visitorName)}
      />
    </section>
  );
}
