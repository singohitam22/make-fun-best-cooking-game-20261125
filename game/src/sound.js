// Tiny WebAudio beeps, generated in code — no audio files, no network.
// The audio context is created lazily on the first user gesture, so a
// headless screenshot run stays silent and error-free.
let audioContext = null;

function ensureAudio() {
  if (audioContext) return audioContext;
  try {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    audioContext = new Ctor();
  } catch {
    audioContext = null;
  }
  return audioContext;
}

export function playBlip(kind) {
  const ctx = ensureAudio();
  if (!ctx) return;
  try {
    if (ctx.state === 'suspended') void ctx.resume();
    const now = ctx.currentTime;
    const notes = {
      add: [660],
      serve: [523, 784],
      wrong: [160],
      clear: [330],
      start: [392, 523, 659],
    }[kind] ?? [440];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = kind === 'wrong' ? 'sawtooth' : 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.2);
    });
  } catch {
    // Sound is garnish: a failure here must never break the game.
  }
}
