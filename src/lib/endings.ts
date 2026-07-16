type EndingStats = {
  diaryCount: number;
  helped: number;
  refused: number;
  supplies: number;
};

export function finalEnding({ diaryCount, helped, refused, supplies }: EndingStats) {
  if (refused > helped + 2) {
    return {
      title: 'The Locked Door',
      text: 'The storm passes, but the silence outside follows you down the mountain.',
    };
  }

  if (supplies <= 1) {
    return {
      title: 'The Empty Pantry',
      text: 'You survive the seventh night, weaker than when it began, unsure who you saved.',
    };
  }

  if (diaryCount >= 5) {
    return {
      title: 'The Last Page',
      text: 'At sunrise, the diary makes less sense than ever. You leave anyway.',
    };
  }

  return {
    title: 'Whiteout',
    text: 'Seven nights pass. The road returns, but certainty does not.',
  };
}
