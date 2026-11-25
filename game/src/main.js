// The Cracked Yolk: bootstrap, game loop and ?shot= staging.
// ?seed= picks the deterministic shift; ?shot=start|play|end freezes the
// kitchen in a staged scene for screenshots (the clock does not run then).
import { createKitchenState, tickKitchen } from './kitchen.js';
import { drawKitchenScene } from './render.js';
import { attachKitchenInput } from './input.js';
import { stageShot } from './autopilot.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const params = new URLSearchParams(window.location.search);
const seed = Number.parseInt(params.get('seed') ?? '1', 10) || 1;
const shot = params.get('shot');
const state = createKitchenState(seed);

if (shot) stageShot(state, shot);
attachKitchenInput(canvas, state);

let last = 0;
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000 || 0);
  last = now;
  if (!shot) tickKitchen(state, dt);
  drawKitchenScene(ctx, state);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
