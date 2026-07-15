import { useCallback, useMemo, useRef, useState } from 'react';
import { playJumpscare, playKnock, setMusicIntensity, startAmbience, stopAmbience } from './sounds';
import { resolveChoice } from './outcomes';
import { randomQuestion } from './questions';
import { makeVisitor, type Visitor } from './visitors';

const TOTAL_VISITORS = 10;
const STARTING_LIVES = 3;
type GameStatus = 'ready' | 'playing' | 'won' | 'lost' | 'jumpscare';

export function useCabinGame() {
  const [night, setNight] = useState(1);
  const [visitorIndex, setVisitorIndex] = useState(1);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [shaking, setShaking] = useState(false);
  const [visitor, setVisitor] = useState<Visitor>(() => makeVisitor(1, 1));
  const [entries, setEntries] = useState<string[]>([]);
  const [outcome, setOutcome] = useState('');
  const nextKnockTimer = useRef<number>();
  const nextVisitorTimer = useRef<number>();
  const jumpscareTimer = useRef<number>();

  const subtitle = useMemo(() => {
    if (status === 'won') return 'The sun has cleared the ridge.';
    if (status === 'jumpscare') return 'Something smiles from the dark hallway.';
    return 'Listen closely. Look twice. Dawn is far away.';
  }, [status]);

  const clearTimers = () => {
    window.clearTimeout(nextKnockTimer.current);
    window.clearTimeout(nextVisitorTimer.current);
    window.clearTimeout(jumpscareTimer.current);
  };

  const resetEncounter = (next: Visitor) => {
    setVisitor(next);
    setEntries([]);
    setOutcome('');
    setMusicIntensity(next.kind === 'skinwalker');
  };

  const triggerArrival = useCallback(() => {
    setShaking(true);
    playKnock();
    window.setTimeout(() => setShaking(false), 420);
  }, []);

  const nextVisitor = useCallback(() => {
    setScore((currentScore) => currentScore + 1);
    if (visitorIndex >= TOTAL_VISITORS) {
      setStatus('won');
      stopAmbience();
      return;
    }

    const nextIndex = visitorIndex + 1;
    setVisitorIndex(nextIndex);
    resetEncounter(makeVisitor(nextIndex, night));
    nextKnockTimer.current = window.setTimeout(triggerArrival, 180);
  }, [night, triggerArrival, visitorIndex]);

  const restart = () => {
    clearTimers();
    setNight(1);
    setVisitorIndex(1);
    setLives(STARTING_LIVES);
    setScore(0);
    setStatus('ready');
    stopAmbience();
    resetEncounter(makeVisitor(1, 1));
  };

  const makeChoice = (choice: 'allow' | 'refuse') => {
    const result = resolveChoice(visitor, choice);
    setOutcome(result.message);
    if (result.jumpscare) {
      setStatus('jumpscare');
      playJumpscare();
      stopAmbience();
      jumpscareTimer.current = window.setTimeout(() => setStatus('lost'), 900);
      return;
    }
    if (result.livesLost > 0) {
      const nextLives = lives - result.livesLost;
      setLives(nextLives);
      if (nextLives <= 0) {
        setStatus('lost');
        playJumpscare();
        stopAmbience();
        return;
      }
    }
    nextVisitorTimer.current = window.setTimeout(nextVisitor, 360);
  };

  const askQuestion = () => {
    const answer = visitor.answers[Math.floor(Math.random() * visitor.answers.length)];
    setEntries((current) => [`${randomQuestion()} ${answer}`, ...current].slice(0, 3));
  };

  const lookCloser = () => {
    const clue = visitor.inspections[Math.floor(Math.random() * visitor.inspections.length)];
    setEntries((current) => [`Inspection: ${clue}`, ...current].slice(0, 3));
  };

  const startNight = () => {
    setStatus('playing');
    startAmbience();
    setMusicIntensity(visitor.kind === 'skinwalker');
    triggerArrival();
  };

  const nextNight = () => {
    const nextNightNumber = night + 1;
    const firstVisitor = makeVisitor(1, nextNightNumber);
    setNight(nextNightNumber);
    setVisitorIndex(1);
    resetEncounter(firstVisitor);
    setStatus('playing');
    startAmbience();
    triggerArrival();
  };

  return {
    entries,
    lives,
    night,
    outcome,
    score,
    shaking,
    status,
    subtitle,
    totalVisitors: TOTAL_VISITORS,
    visitor,
    visitorIndex,
    askQuestion,
    lookCloser,
    makeChoice,
    nextNight,
    restart,
    startNight,
  };
}
