import { EndScreen } from './EndScreen';

type Ending = {
  text: string;
  title: string;
};

type GameEndOverlaysProps = {
  delayedEnding: boolean;
  ending: Ending;
  finishedAllNights: boolean;
  night: number;
  onNextNight: () => void;
  onRestart: () => void;
  status: string;
};

export function GameEndOverlays(props: GameEndOverlaysProps) {
  if (props.delayedEnding) return (
    <EndScreen danger title="Ending Found: Too Trusting" text="You let the wrong thing sit beside the fire, and only noticed after the room went quiet." onRestart={props.onRestart} />
  );
  if (props.status === 'lost') return <EndScreen danger title="Game Over" text="The cabin goes quiet before sunrise." onRestart={props.onRestart} />;
  if (props.status !== 'won') return null;

  return (
    <EndScreen
      title={props.finishedAllNights ? props.ending.title : `Night ${props.night} Survived`}
      text={props.finishedAllNights ? props.ending.text : 'Five knocks passed. The next night will be harder.'}
      actionLabel={props.finishedAllNights ? 'Play Again' : 'Next Night'}
      label={props.finishedAllNights ? 'Ending' : undefined}
      onRestart={props.finishedAllNights ? props.onRestart : props.onNextNight}
    />
  );
}
