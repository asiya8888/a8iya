type GameHudProps = {
  lives: number;
  supplies: number;
  diaryCount: number;
  score: number;
  night: number;
  visitorNumber: number;
  totalVisitors: number;
  onRestart: () => void;
  onSignOut: () => void;
};

export function GameHud({ diaryCount, lives, score, night, supplies, visitorNumber, totalVisitors, onRestart, onSignOut }: GameHudProps) {
  void diaryCount; void lives; void score; void supplies;

  return (
    <header className="hud">
      <p className="night-marker">Night {night} <span>•</span> Visitor {visitorNumber}/{totalVisitors}</p>
      <div className="stats">
        <button onClick={onRestart}>Restart night</button>
        <button onClick={onSignOut}>Exit</button>
      </div>
    </header>
  );
}
