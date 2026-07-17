export type RoomId = 'living' | 'kitchen' | 'bedroom';

export type RoomOption = {
  id: RoomId;
  label: string;
};

export const roomOptions: RoomOption[] = [
  { id: 'living', label: 'Living Room' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bedroom', label: 'Bedroom' },
];
