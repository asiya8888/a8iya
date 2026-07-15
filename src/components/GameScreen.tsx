import { CabinScene } from './CabinScene';
import { EndScreen } from './EndScreen';
import { GameHud } from './GameHud';
import { VisitorCard } from './VisitorCard';
import { useCabinGame } from '../lib/useCabinGame';

type GameScreenProps = {
  onSignOut: () => void;
};

export function GameScreen({ onSignOut }: GameScreenProps) {
  const game = useCabinGame();
  const choiceLocked = game.status !== 'playing';

  const signOut = () => {
    game.restart();
    onSignOut();
  };

  if (game.status === 'ready') {
    return (
      <main className="menu-shell">
        <div className="menu-cabin" aria-hidden="true">
          <span className="menu-window menu-window--left" />
          <span className="menu-window menu-window--right" />
          {Array.from({ length: 48 }, (_, index) => (
            <span
              className="menu-snow"
              key={index}
              style={{
                left: `${(index * 23) % 100}%`,
                animationDelay: `${(index % 16) * 0.18}s`,
                animationDuration: `${5 + (index % 6)}s`,
              }}
            />
          ))}
        </div>
        <EndScreen
          menu
          label="THE LAST CABIN"
          title="THE LAST CABIN"
          text="A lonely inspection desk. Ten knocks before sunrise. Decide who is still human."
          actionLabel="Start Game"
          onRestart={game.startNight}
        />
      </main>
    );
  }

  return (
    <main className="game-shell">
      <div className={`play-area ${game.shaking ? 'is-shaking' : ''}`}>
        <GameHud
          lives={game.lives}
          score={game.score}
          night={game.night}
          visitorNumber={game.visitorIndex}
          totalVisitors={game.totalVisitors}
          onRestart={game.restart}
          onSignOut={signOut}
        />
        <p className="subtitle">{game.subtitle}</p>
        <div className="game-layout">
          <CabinScene />
          <VisitorCard
            disabled={choiceLocked}
            visitor={game.visitor}
            entries={game.entries}
            outcome={game.outcome}
            onAsk={game.askQuestion}
            onLook={game.lookCloser}
            onAllow={() => game.makeChoice('allow')}
            onRefuse={() => game.makeChoice('refuse')}
          />
        </div>
      </div>
      {game.status === 'jumpscare' && <div className="jumpscare" aria-label="Skinwalker jumpscare" />}
      {game.status === 'lost' && (
        <EndScreen danger title="Game Over" text="The cabin goes quiet before sunrise." onRestart={game.restart} />
      )}
      {game.status === 'won' && (
        <EndScreen
          title={`Night ${game.night} Survived`}
          text="Ten knocks passed. The next night will be harder."
          actionLabel="Next Night"
          onRestart={game.nextNight}
        />
      )}
    </main>
  );
}
