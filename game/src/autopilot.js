// Screenshot staging: ?shot=start|play|end&seed=1 freezes the kitchen in a
// real scene of its own code, so the screenshots are genuine renders.
// start = title screen over a live kitchen; play = mid-shift with a dish
// half-built on the plate; end = shift over with a finished plate on the pass.
import { startShift } from './kitchen.js';

export function stageShot(state, shot) {
  if (shot === 'start') {
    state.screen = 'title';
    state.message = 'Welcome to The Cracked Yolk!';
    return;
  }
  if (shot === 'play') {
    startShift(state);
    state.timeLeft = 151;
    state.score = 340;
    state.coins = 340;
    state.served = 3;
    const first = state.orders[0];
    state.plate = first.dish.ingredients.slice(0, 2);
    first.patience = first.patienceMax * 0.6;
    state.message = `Building ${first.dish.name} — ${state.plate.length} of ${first.dish.ingredients.length} on the plate.`;
    return;
  }
  if (shot === 'end') {
    startShift(state);
    state.screen = 'over';
    state.timeLeft = 0;
    state.score = 1240;
    state.coins = 1240;
    state.served = 9;
    state.hearts = 1;
    const first = state.orders[0];
    state.plate = first.dish.ingredients.slice();
    state.message = `Shift over — ${state.served} dishes served!`;
  }
}
