// Audio engine using Web Audio API to generate ambient sounds

let audioContext: AudioContext | null = null;
let activeNodes: AudioNode[] = [];
let isPlaying = false;

const getContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

const stopAll = () => {
  activeNodes.forEach((node) => {
    try {
      (node as OscillatorNode).stop?.();
    } catch {}
    try {
      node.disconnect();
    } catch {}
  });
  activeNodes = [];
  isPlaying = false;
};

// White noise buffer
const createWhiteNoise = (ctx: AudioContext, duration = 2): AudioBuffer => {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

// Brown noise (smoother, deeper)
const createBrownNoise = (ctx: AudioContext, duration = 2): AudioBuffer => {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (last + 0.02 * white) / 1.02;
    last = data[i];
    data[i] *= 3.5;
  }
  return buffer;
};

const playWhisper = (ctx: AudioContext, volume: number) => {
  const gain = ctx.createGain();
  gain.gain.value = volume * 0.15;
  gain.connect(ctx.destination);

  const source = ctx.createBufferSource();
  source.buffer = createBrownNoise(ctx, 4);
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 800;
  filter.Q.value = 0.5;

  source.connect(filter);
  filter.connect(gain);
  source.start();

  activeNodes.push(source, filter, gain);
};

const playRain = (ctx: AudioContext, volume: number) => {
  const gain = ctx.createGain();
  gain.gain.value = volume * 0.3;
  gain.connect(ctx.destination);

  const source = ctx.createBufferSource();
  source.buffer = createWhiteNoise(ctx, 4);
  source.loop = true;

  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 2000;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 8000;

  source.connect(hp);
  hp.connect(lp);
  lp.connect(gain);
  source.start();

  // Deep rumble layer
  const rumble = ctx.createBufferSource();
  rumble.buffer = createBrownNoise(ctx, 4);
  rumble.loop = true;
  const rumbleGain = ctx.createGain();
  rumbleGain.gain.value = volume * 0.1;
  rumbleGain.connect(ctx.destination);
  rumble.connect(rumbleGain);
  rumble.start();

  activeNodes.push(source, hp, lp, gain, rumble, rumbleGain);
};

const playOcean = (ctx: AudioContext, volume: number) => {
  const gain = ctx.createGain();
  gain.gain.value = volume * 0.25;
  gain.connect(ctx.destination);

  const source = ctx.createBufferSource();
  source.buffer = createBrownNoise(ctx, 6);
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 500;

  // Modulate volume for wave effect
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.1; // slow wave
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = volume * 0.12;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  lfo.start();

  source.connect(filter);
  filter.connect(gain);
  source.start();

  activeNodes.push(source, filter, gain, lfo, lfoGain);
};

const playWind = (ctx: AudioContext, volume: number) => {
  const gain = ctx.createGain();
  gain.gain.value = volume * 0.2;
  gain.connect(ctx.destination);

  const source = ctx.createBufferSource();
  source.buffer = createWhiteNoise(ctx, 4);
  source.loop = true;

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 400;
  bp.Q.value = 0.3;

  // Modulate for gusts
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.15;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = volume * 0.1;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  lfo.start();

  source.connect(bp);
  bp.connect(gain);
  source.start();

  activeNodes.push(source, bp, gain, lfo, lfoGain);
};

const playNature = (ctx: AudioContext, volume: number) => {
  // Gentle bird-like chirps using oscillators
  const gain = ctx.createGain();
  gain.gain.value = volume * 0.08;
  gain.connect(ctx.destination);

  // Background ambience
  const bg = ctx.createBufferSource();
  bg.buffer = createBrownNoise(ctx, 4);
  bg.loop = true;
  const bgGain = ctx.createGain();
  bgGain.gain.value = volume * 0.1;
  bgGain.connect(ctx.destination);
  bg.connect(bgGain);
  bg.start();

  // Chirp pattern
  const chirp = () => {
    if (!isPlaying) return;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 2000 + Math.random() * 2000;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, ctx.currentTime);
    env.gain.linearRampToValueAtTime(volume * 0.06, ctx.currentTime + 0.05);
    env.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
    osc.connect(env);
    env.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
    setTimeout(chirp, 1500 + Math.random() * 3000);
  };
  setTimeout(chirp, 500);

  activeNodes.push(bg, bgGain, gain);
};

const playWhiteNoise = (ctx: AudioContext, volume: number) => {
  const gain = ctx.createGain();
  gain.gain.value = volume * 0.2;
  gain.connect(ctx.destination);

  const source = ctx.createBufferSource();
  source.buffer = createWhiteNoise(ctx, 4);
  source.loop = true;
  source.connect(gain);
  source.start();

  activeNodes.push(source, gain);
};

const playLullaby = (ctx: AudioContext, volume: number) => {
  const notes = [261.63, 293.66, 329.63, 349.23, 329.63, 293.66]; // C D E F E D
  const gain = ctx.createGain();
  gain.gain.value = volume * 0.08;
  gain.connect(ctx.destination);

  let noteIndex = 0;
  const playNote = () => {
    if (!isPlaying) return;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = notes[noteIndex % notes.length];
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, ctx.currentTime);
    env.gain.linearRampToValueAtTime(volume * 0.06, ctx.currentTime + 0.2);
    env.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    osc.connect(env);
    env.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.5);
    noteIndex++;
    setTimeout(playNote, 1500);
  };
  playNote();

  activeNodes.push(gain);
};

export const playAudio = (type: string, volume: number) => {
  stopAll();
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();
  isPlaying = true;

  const vol = Math.max(0, Math.min(1, volume / 100));

  switch (type) {
    case "whisper":
      playWhisper(ctx, vol);
      break;
    case "rain":
      playRain(ctx, vol);
      break;
    case "ocean":
      playOcean(ctx, vol);
      break;
    case "wind":
      playWind(ctx, vol);
      break;
    case "nature":
      playNature(ctx, vol);
      break;
    case "white-noise":
      playWhiteNoise(ctx, vol);
      break;
    case "lullaby":
      playLullaby(ctx, vol);
      break;
    default:
      playWhiteNoise(ctx, vol);
  }
};

export const stopAudio = () => {
  stopAll();
};

export const updateVolume = (volume: number) => {
  if (!audioContext || !isPlaying) return;
};

// Quick sound effects for UI interactions
export const playSfx = (type: "tap" | "correct" | "wrong") => {
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();

  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  env.connect(ctx.destination);
  osc.connect(env);

  const now = ctx.currentTime;

  switch (type) {
    case "tap":
      osc.type = "sine";
      osc.frequency.value = 600;
      env.gain.setValueAtTime(0.08, now);
      env.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
      break;
    case "correct":
      osc.type = "sine";
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.linearRampToValueAtTime(784, now + 0.15);
      env.gain.setValueAtTime(0.1, now);
      env.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
      break;
    case "wrong":
      osc.type = "square";
      osc.frequency.value = 200;
      env.gain.setValueAtTime(0.06, now);
      env.gain.linearRampToValueAtTime(0, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
  }
};
