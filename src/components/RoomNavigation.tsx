import { playDoorCreak } from '../lib/sounds';
import { roomOptions, type RoomId } from '../lib/rooms';

type RoomNavigationProps = {
  currentRoom: RoomId;
  disabled: boolean;
  onChange: (room: RoomId) => void;
};

export function RoomNavigation({ currentRoom, disabled, onChange }: RoomNavigationProps) {
  const changeRoom = (room: RoomId) => {
    if (disabled || room === currentRoom) return;
    playDoorCreak();
    onChange(room);
  };

  return (
    <nav className="room-nav" aria-label="Cabin rooms">
      {roomOptions.map((room) => (
        <button
          className={room.id === currentRoom ? 'is-active' : ''}
          disabled={disabled}
          key={room.id}
          onClick={() => changeRoom(room.id)}
          type="button"
        >
          {room.label}
        </button>
      ))}
      <button disabled type="button">
        Bathroom Locked
      </button>
    </nav>
  );
}
