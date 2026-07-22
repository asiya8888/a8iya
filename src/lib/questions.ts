import type { GameCharacter } from './characters/types';

export type CharacterQuestion = { id: string; text: string; answer: string };
export type QuestionKey = string;

type WorkDetails = { place: string; item: string; route: string };

const details: Record<string, WorkDetails> = {
  hunter: { place: 'northern ridge', item: 'rifle', route: 'game trail' }, doctor: { place: 'clinic', item: 'medical bag', route: 'lower road' },
  student: { place: 'college library', item: 'notebook', route: 'dormitory path' }, teacher: { place: 'school bus', item: 'attendance book', route: 'school road' },
  'lost-boy': { place: 'school bus', item: 'backpack', route: 'roadside markers' }, fisherman: { place: 'reservoir', item: 'fishing line', route: 'frozen shore' },
  musician: { place: 'lodge', item: 'guitar case', route: 'service road' }, photographer: { place: 'lodge', item: 'camera', route: 'tree line' },
  soldier: { place: 'convoy', item: 'flare pistol', route: 'military road' }, lumberjack: { place: 'logging camp', item: 'axe', route: 'logging trail' },
  priest: { place: 'chapel', item: 'prayer book', route: 'cemetery path' }, 'old-woman': { place: 'village', item: 'brass key', route: 'old footpath' },
  'woman-red': { place: 'mountain lodge', item: 'something in your glove', route: 'lodge path' }, 'twin-sisters': { place: 'evacuation road', item: 'one pair of gloves', route: 'pine trail' },
  wanderer: { place: 'forest', item: 'nothing but that coat', route: 'unmarked trail' }, blacksmith: { place: 'forge', item: 'hammer', route: 'cart road' },
  midwife: { place: 'birthing room', item: 'medical satchel', route: 'village road' }, 'cartographer-random': { place: 'survey camp', item: 'maps', route: 'western pass' },
  seamstress: { place: 'workshop', item: 'sewing kit', route: 'market road' }, miner: { place: 'mine', item: 'lamp', route: 'ore track' }, baker: { place: 'bakery', item: 'bread bag', route: 'village lane' },
  herbalist: { place: 'dispensary', item: 'herb pouch', route: 'forest path' }, woodcutter: { place: 'cutting site', item: 'axe', route: 'timber track' }, postman: { place: 'post office', item: 'mailbag', route: 'delivery road' },
  astrologer: { place: 'observatory', item: 'star charts', route: 'hill path' }, butcher: { place: 'butcher shop', item: 'wrapped parcel', route: 'market road' }, innkeeper: { place: 'inn', item: 'room keys', route: 'coach road' },
  nurse: { place: 'clinic ward', item: 'first-aid case', route: 'lower road' }, recluse: { place: 'cabin', item: 'hunting knife', route: 'creek bed' }, clockmaker: { place: 'clock shop', item: 'watch case', route: 'main street' },
  child: { place: 'schoolhouse', item: 'chalk', route: 'road with the white fence' }, 'poet-random': { place: 'boarding house', item: 'manuscript', route: 'river path' }, lecturer: { place: 'college hall', item: 'briefcase', route: 'campus road' },
  huntsman: { place: 'hunting blind', item: 'rifle', route: 'deer trail' }, dancer: { place: 'ballroom', item: 'dance shoes', route: 'lodge road' }, watchmaker: { place: 'repair shop', item: 'pocket watch', route: 'clock-tower lane' },
  'fur-trader': { place: 'trading post', item: 'fur bundle', route: 'trapper trail' }, maid: { place: 'mountain lodge', item: 'master key', route: 'staff path' }, sailor: { place: 'rail depot', item: 'sea bag', route: 'rail line' },
  'teacher-random': { place: 'village school', item: 'lesson book', route: 'school road' }, engineer: { place: 'bridge', item: 'tool case', route: 'maintenance track' }, barber: { place: 'barber shop', item: 'scissors', route: 'market lane' },
  gravedigger: { place: 'cemetery', item: 'shovel', route: 'chapel path' }, farrier: { place: 'stable', item: 'horseshoe', route: 'bridle path' }, iceman: { place: 'icehouse', item: 'ice hook', route: 'reservoir road' },
  monk: { place: 'monastery', item: 'prayer beads', route: 'pilgrim path' }, orphan: { place: 'orphanage', item: 'box of matches', route: 'drainage ditch' }, messenger: { place: 'village hall', item: 'sealed message', route: 'courier trail' },
  'widow-random': { place: 'family house', item: 'wedding photograph', route: 'garden path' }, gambler: { place: 'card room', item: 'deck of cards', route: 'lodge road' }, candlemaker: { place: 'candle shop', item: 'blue candles', route: 'church lane' },
  painter: { place: 'studio', item: 'sketchbook', route: 'ridge road' }, 'bell-keeper': { place: 'bell tower', item: 'bell rope', route: 'chapel steps' }, groom: { place: 'wedding lodge', item: 'wedding ring', route: 'procession road' },
  farmer: { place: 'farm', item: 'seed bag', route: 'field boundary' }, apothecary: { place: 'pharmacy', item: 'medicine case', route: 'village road' }, 'bounty-hunter': { place: 'ranger station', item: 'wanted notice', route: 'north trail' },
  stowaway: { place: 'supply truck', item: 'stolen coat', route: 'service road' }, storyteller: { place: 'travellers’ camp', item: 'story journal', route: 'camp trail' }, florist: { place: 'greenhouse', item: 'winter flowers', route: 'garden wall' },
  vet: { place: 'animal clinic', item: 'veterinary bag', route: 'stable road' }, 'ranger-random': { place: 'ranger station', item: 'trail map', route: 'marked trail' }, tinker: { place: 'repair cart', item: 'tool roll', route: 'wagon road' },
  prospector: { place: 'claim site', item: 'ore sample', route: 'dry creek' }, pilgrim: { place: 'mountain shrine', item: 'walking staff', route: 'pilgrim road' },
};

const special: Record<string, CharacterQuestion[]> = {
  hunter: [
    { id: 'hunt', text: 'What were you hunting?', answer: 'A deer at first. Then I found tracks that looked human until they reached the rocks.' },
    { id: 'trail', text: 'Which trail did you take?', answer: 'The north game trail. The markers disappear about a mile back.' },
    { id: 'wet', text: 'Why are your clothes wet?', answer: 'I fell through creek ice. It was shallow, but something moved under it.' },
  ],
  doctor: [
    { id: 'alone', text: 'Why are you travelling alone?', answer: 'I was with two patients. We became separated when the wind covered the road.' },
    { id: 'bag', text: "What's inside your bag?", answer: 'Bandages, antibiotics, a stethoscope, and less morphine than I would like.' },
    { id: 'others', text: 'Have you seen anyone else outside?', answer: 'A woman near the lower road. She would not answer when I called to her.' },
  ],
  student: [
    { id: 'study', text: 'Where do you study?', answer: 'At the college in Bellweather. I was staying in the old dormitory.' },
    { id: 'late', text: 'Why are you outside so late?', answer: 'The power failed. I left when somebody began trying every door on my floor.' },
    { id: 'dorm', text: "Why didn't you stay at your dorm?", answer: 'My roommate called me from downstairs. She was asleep in the bed beside me.' },
  ],
};

export function questionsFor(character: GameCharacter): CharacterQuestion[] {
  if (special[character.id]) return special[character.id];
  const work = details[character.id] ?? { place: 'road', item: 'bag', route: 'tree line' };
  return [
    { id: 'work', text: `What happened at the ${work.place}?`, answer: `I stayed at the ${work.place} until the windows started shaking. Then I heard footsteps outside and left through the nearest door.` },
    { id: 'route', text: `How did you get here from the ${work.place}?`, answer: `I followed the ${work.route} until the snow hid it. Your light was the first thing I could still see.` },
    { id: 'carry', text: `Why are you carrying ${work.item}?`, answer: `It belongs to my work. I kept it because leaving it behind felt worse than carrying the weight.` },
  ];
}
