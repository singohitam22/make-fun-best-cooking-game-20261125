// Keyboard and mouse controls for The Cracked Yolk.
// Mouse: click an ingredient bin to add it, click the bell to serve, click
// the trash to clear the plate. Keyboard: 1-0/Q/W pick an ingredient,
// arrows move the bin cursor, Space adds it, S serves, T clears.
import { binIndexAtPoint, pointInRect, BELL, TRASH } from './layout.js';
import { addIngredientToPlate, clearPlate, servePlate, startShift, restartShift } from './kitchen.js';
import { INGREDIENTS } from './recipes.js';
import { playBlip } from './sound.js';

export function attachKitchenInput(canvas, state) {
  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const px = (event.clientX - rect.left) * (canvas.width / rect.width);
    const py = (event.clientY - rect.top) * (canvas.height / rect.height);
    handlePointer(state, px, py);
  });
  window.addEventListener('keydown', (event) => {
    handleKey(state, event);
  });
}

function handlePointer(state, px, py) {
  if (state.screen === 'title') {
    startShift(state);
    playBlip('start');
    return;
  }
  if (state.screen === 'over') {
    restartShift(state);
    playBlip('start');
    return;
  }
  const bin = binIndexAtPoint(px, py);
  if (bin !== -1) {
    state.selectedBin = bin;
    const result = addIngredientToPlate(state, INGREDIENTS[bin].id);
    playBlip(result === 'added' ? 'add' : 'wrong');
    if (result === 'duplicate' || result === 'full') state.shakePlate = 0.4;
    return;
  }
  if (pointInRect(px, py, BELL)) {
    const result = servePlate(state);
    playBlip(result === 'served' ? 'serve' : 'wrong');
    return;
  }
  if (pointInRect(px, py, TRASH)) {
    clearPlate(state);
    playBlip('clear');
  }
}

function handleKey(state, event) {
  const key = event.key;
  if (state.screen === 'title' && (key === 'Enter' || key === ' ')) {
    startShift(state);
    playBlip('start');
    event.preventDefault();
    return;
  }
  if (state.screen === 'over' && (key === 'r' || key === 'R' || key === 'Enter')) {
    restartShift(state);
    playBlip('start');
    return;
  }
  if (state.screen !== 'play') return;
  if (key === 'ArrowLeft') {
    state.selectedBin = (state.selectedBin + 11) % 12;
    event.preventDefault();
    return;
  }
  if (key === 'ArrowRight') {
    state.selectedBin = (state.selectedBin + 1) % 12;
    event.preventDefault();
    return;
  }
  if (key === ' ' || key === 'Enter') {
    const result = addIngredientToPlate(state, INGREDIENTS[state.selectedBin].id);
    playBlip(result === 'added' ? 'add' : 'wrong');
    if (result === 'duplicate' || result === 'full') state.shakePlate = 0.4;
    event.preventDefault();
    return;
  }
  if (key === 's' || key === 'S') {
    const result = servePlate(state);
    playBlip(result === 'served' ? 'serve' : 'wrong');
    return;
  }
  if (key === 't' || key === 'T' || key === 'Backspace') {
    clearPlate(state);
    playBlip('clear');
    return;
  }
  const byKey = INGREDIENTS.findIndex((item) => item.key.toLowerCase() === key.toLowerCase());
  if (byKey !== -1) {
    state.selectedBin = byKey;
    const result = addIngredientToPlate(state, INGREDIENTS[byKey].id);
    playBlip(result === 'added' ? 'add' : 'wrong');
    if (result === 'duplicate' || result === 'full') state.shakePlate = 0.4;
  }
}
