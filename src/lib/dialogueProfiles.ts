import type { VisitorKind } from './visitors';

export type DialogueProfile = {
  dialogue: string[];
  answers: string[];
};

const humanProfiles: DialogueProfile[] = [
  {
    dialogue: [
      "I'm sorry for bothering you this late.",
      'I got separated from my friends a few hours ago.',
      'Could I stay here until sunrise?',
    ],
    answers: [
      "My name is Mara. I'm twenty-six.",
      'We came from the north trail before the storm buried it.',
      "I'm alone now. I kept calling, but nobody answered.",
      'I fell twice coming down the ridge. I just need warmth.',
    ],
  },
  {
    dialogue: [
      "I didn't expect there to be a cabin here.",
      "I haven't eaten anything since this morning.",
      "Please don't leave me outside.",
    ],
    answers: [
      "I'm Evan. I was hiking toward the radio tower.",
      'The wind turned me around until every tree looked the same.',
      'Outside is all white. I can barely see the porch.',
      'My hands are numb. I can hardly move my fingers.',
    ],
  },
  {
    dialogue: [
      'My daughter and I lost the road before dark.',
      'She is too cold to keep walking.',
      'We will sit by the door if that makes you feel safer.',
    ],
    answers: [
      "I'm Clara. She's nine.",
      'Our car is stuck somewhere below the pass.',
      'We heard something moving behind us, but never saw it.',
      'Please. She has not stopped shaking.',
    ],
  },
];

const mimicProfiles: DialogueProfile[] = [
  {
    dialogue: [
      "It's cold tonight.",
      "You don't have to be afraid of me.",
      'Why are you staring at my face?',
    ],
    answers: [
      'My name is... Michael.',
      'I came from the trees where the path ended.',
      'Outside is outside. It is behind me.',
      'I am cold enough for you to believe me.',
    ],
  },
  {
    dialogue: [
      'I have been walking for a very long time.',
      'May I come inside?',
      'You look frightened.',
    ],
    answers: [
      "I'm thirty. Maybe thirty-one.",
      'I was with others, but they became quiet.',
      'The snow covered my tracks too quickly.',
      'I can wait. I am good at waiting.',
    ],
  },
  {
    dialogue: [
      'I saw your light from far away.',
      'It looks warm in there.',
      'I can be normal if you need me to be.',
    ],
    answers: [
      'People call me Jonas.',
      'I came from the lower road. I think that is what it is called.',
      'There is nothing outside except weather.',
      'I am alone in the way humans are alone.',
    ],
  },
];

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export function makeDialogueProfile(kind: VisitorKind, night: number) {
  if (kind === 'human') return pick(humanProfiles);
  if (night > 2) return pick(mimicProfiles);

  return Math.random() > 0.45
    ? pick(mimicProfiles)
    : {
        dialogue: ['I do not feel cold.', 'Please allow me inside.', 'Your fire smells like safety.'],
        answers: ['My name is... Michael.', 'Outside?', 'I came from where people come from.'],
      };
}
