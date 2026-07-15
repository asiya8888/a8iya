type LegacyAudioWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

let audio: AudioContext | null = null;
let wind: OscillatorNode | null = null;
let drone: OscillatorNode | null = null;
let warmth: OscillatorNode | null = null;
let windGain: GainNode | null = null;
let droneGain: GainNode | null = null;
let warmthGain: GainNode | null = null;
let fireTimer: number | null = null;
let rareTimer: number | null = null;

function getAudio() {
  const AudioCtor = window.AudioContext || (window as LegacyAudioWindow).webkitAudioContext;
  if (!AudioCtor) return null;

  if (!audio) audio = new AudioCtor();
  if (audio.state === 'suspended') void audio.resume();
  return audio;
}

function tone(frequency: number, start: number, length: number, volume: number, type: OscillatorType = 'sine') {
  const context = getAudio();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  gain.gain.setValueAtTime(0.001, context.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + start + length);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(context.currentTime + start);
  oscillator.stop(context.currentTime + start + length + 0.03);
}

function scheduleFire() {
  fireTimer = window.setTimeout(() => {
    tone(260 + Math.random() * 240, 0, 0.035, 0.035, 'triangle');
    if (Math.random() > 0.65) tone(90 + Math.random() * 50, 0.03, 0.05, 0.025, 'sawtooth');
    scheduleFire();
  }, 240 + Math.random() * 950);
}

function scheduleRareSound() {
  rareTimer = window.setTimeout(() => {
    const options = [
      () => tone(44, 0, 0.55, 0.035, 'sine'),
      () => tone(118, 0, 0.12, 0.03, 'triangle'),
      () => [0, 0.28].forEach((delay) => tone(68, delay, 0.08, 0.025, 'sine')),
    ];
    options[Math.floor(Math.random() * options.length)]();
    scheduleRareSound();
  }, 6500 + Math.random() * 9000);
}

export function playKnock() {
  const count = 2 + Math.floor(Math.random() * 3);
  const basePitch = 72 + Math.random() * 22;
  let time = 0;

  Array.from({ length: count }).forEach(() => {
    tone(basePitch + Math.random() * 12, time, 0.13, 0.42, 'sine');
    tone(basePitch * 0.55, time + 0.015, 0.11, 0.22, 'triangle');
    time += 0.16 + Math.random() * 0.38;
  });
}

export function playJumpscare() {
  [0, 0.04, 0.08, 0.12].forEach((delay) => tone(520 + delay * 1800, delay, 0.11, 0.9));
  tone(58, 0, 0.58, 1, 'sawtooth');
  tone(180, 0.16, 0.32, 0.85, 'triangle');
}

export function startAmbience() {
  const context = getAudio();
  if (!context || wind) return;

  wind = context.createOscillator();
  windGain = context.createGain();
  wind.type = 'sawtooth';
  wind.frequency.value = 36;
  windGain.gain.value = 0.012;
  wind.connect(windGain);
  windGain.connect(context.destination);
  wind.start();

  drone = context.createOscillator();
  droneGain = context.createGain();
  drone.type = 'sine';
  drone.frequency.value = 74;
  droneGain.gain.value = 0.008;
  drone.connect(droneGain);
  droneGain.connect(context.destination);
  drone.start();

  warmth = context.createOscillator();
  warmthGain = context.createGain();
  warmth.type = 'triangle';
  warmth.frequency.value = 146;
  warmthGain.gain.value = 0.005;
  warmth.connect(warmthGain);
  warmthGain.connect(context.destination);
  warmth.start();

  scheduleFire();
  scheduleRareSound();
}

export function setMusicIntensity(isSuspicious: boolean) {
  if (!audio || !drone || !droneGain || !windGain) return;

  const now = audio.currentTime;
  drone.frequency.setTargetAtTime(isSuspicious ? 82 : 74, now, 0.7);
  droneGain.gain.setTargetAtTime(isSuspicious ? 0.014 : 0.008, now, 0.9);
  windGain.gain.setTargetAtTime(isSuspicious ? 0.018 : 0.012, now, 0.9);
}

export function stopAmbience() {
  if (fireTimer) window.clearTimeout(fireTimer);
  if (rareTimer) window.clearTimeout(rareTimer);
  fireTimer = null;
  rareTimer = null;

  [wind, drone, warmth].forEach((node) => {
    node?.stop();
    node?.disconnect();
  });
  [windGain, droneGain, warmthGain].forEach((node) => node?.disconnect());

  wind = null;
  drone = null;
  warmth = null;
  windGain = null;
  droneGain = null;
  warmthGain = null;
}
