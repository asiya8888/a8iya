export type RoomId = 'living' | 'kitchen' | 'bedroom';

export const roomOrder: RoomId[] = ['kitchen', 'living', 'bedroom'];

export function roomAtPosition(position: number): RoomId {
  if (position < 1) return 'kitchen';
  if (position < 2) return 'living';
  return 'bedroom';
}

export function roomCenter(room: RoomId) {
  return roomOrder.indexOf(room) + 0.5;
}
