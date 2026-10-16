// Web Audio API Synthesizer for automotive sound effects

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundManager = {
  get isEnabled() {
    return soundEnabled;
  },
  toggleSound() {
    soundEnabled = !soundEnabled;
    return soundEnabled;
  },
  setSound(enabled: boolean) {
    soundEnabled = enabled;
  },

  // Luxury sports car engine ignition and laser light whoosh (extended for 6s experience)
  playEngineStartup() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // 1. Starter crank click/spark
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 0.35);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      // 2. Twin-turbo V8 engine rev and smooth idle rumble
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now + 0.2);
      filter.frequency.exponentialRampToValueAtTime(360, now + 0.9);
      filter.frequency.exponentialRampToValueAtTime(110, now + 2.2);

      osc2.frequency.setValueAtTime(55, now + 0.2);
      osc2.frequency.exponentialRampToValueAtTime(140, now + 0.8);
      osc2.frequency.exponentialRampToValueAtTime(70, now + 2.5);

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(0.3, now + 0.3);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

      osc2.connect(filter);
      filter.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.2);
      osc2.stop(now + 2.7);

      // 3. Futuristic laser headlight power-up sweep
      const laserOsc = ctx.createOscillator();
      const laserGain = ctx.createGain();
      laserOsc.type = 'sine';
      laserOsc.frequency.setValueAtTime(350, now + 0.5);
      laserOsc.frequency.exponentialRampToValueAtTime(1400, now + 1.4);
      laserGain.gain.setValueAtTime(0.001, now + 0.5);
      laserGain.gain.linearRampToValueAtTime(0.14, now + 0.9);
      laserGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      laserOsc.connect(laserGain);
      laserGain.connect(ctx.destination);
      laserOsc.start(now + 0.5);
      laserOsc.stop(now + 1.85);
    } catch {
      // Audio playback silently fails if autoplay restricted
    }
  },

  // Subtle futuristic laser click for buttons
  playClick() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(780, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // ignore
    }
  },

  // Confirmation chime for WhatsApp booking
  playSuccess() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch {
      // ignore
    }
  }
};
