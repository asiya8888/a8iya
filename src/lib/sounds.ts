type LegacyAudioWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

let audio: AudioContext | null = null;
let wind: OscillatorNode | null = null;
let music: OscillatorNode | null = null;
let windGain: GainNode | null = null;
let musicGain: GainNode | null = null;
let randomSoundTimer: number | null = null;

function getAudio() {
  const AudioCtor = window.AudioContext || (window as LegacyAudioWindow).webkitAudioContext;
  if (!AudioCtor) return null;

  if (!audio) audio = new AudioCtor();
  if (audio.state === 'suspended') void audio.resume();
  return audio;
}

// Small generated sound effects keep the project deployable without audio files.
function beep(frequency: number, start: number, length: number, volume: number) {
  const context = getAudio();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  gain.gain.setValueAtTime(0.001, context.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + start + length);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(context.currentTime + start);
  oscillator.stop(context.currentTime + start + length + 0.02);
}

export function playKnock() {
  const basePitch = 82 + Math.random() * 22;
  [0, 0.2, 0.42].forEach((delay) => beep(basePitch + Math.random() * 8, delay, 0.14, 0.38));
}

export function playJumpscare() {
  [0, 0.04, 0.08, 0.12].forEach((delay) => beep(520 + delay * 1800, delay, 0.11, 0.9));
  beep(58, 0, 0.58, 1);
  beep(180, 0.16, 0.32, 0.85);
}

function playAmbientSting() {
  const options = [
    () => beep(48, 0, 0.35, 0.08), // distant low call
    () => beep(130, 0, 0.08, 0.06), // wood creak
    () => [0, 0.22].forEach((delay) => beep(72, delay, 0.08, 0.05)), // snow steps
  ];
  options[Math.floor(Math.random() * options.length)]();
}

export function startAmbience() {
  const context = getAudio();
  if (!context || wind) return;

  // Looped browser-made ambience keeps the project simple and Vercel-friendly.
  wind = context.createOscillator();
  windGain = context.createGain();
  wind.type = 'sawtooth';
  wind.frequency.value = 42;
  windGain.gain.value = 0.018;
  wind.connect(windGain);
  windGain.connect(context.destination);
  wind.start();

  music = context.createOscillator();
  musicGain = context.createGain();
  music.type = 'triangle';
  music.frequency.value = 110;
  musicGain.gain.value = 0.012;
  music.connect(musicGain);
  musicGain.connect(context.destination);
  music.start();

  randomSoundTimer = window.setInterval(playAmbientSting, 3600);
}

export function setMusicIntensity(isSuspicious: boolean) {
  if (!audio || !music || !musicGain || !windGain) return;

  const now = audio.currentTime;
  music.frequency.setTargetAtTime(isSuspicious ? 146 : 110, now, 0.35);
  musicGain.gain.setTargetAtTime(isSuspicious ? 0.035 : 0.012, now, 0.45);
  windGain.gain.setTargetAtTime(isSuspicious ? 0.032 : 0.018, now, 0.45);
}

export function stopAmbience() {
  if (randomSoundTimer) window.clearInterval(randomSoundTimer);
  randomSoundTimer = null;

  wind?.stop();
  wind?.disconnect();
  music?.stop();
  music?.disconnect();
  windGain?.disconnect();
  musicGain?.disconnect();

  wind = null;
  music = null;
  windGain = null;
  musicGain = null;
}
