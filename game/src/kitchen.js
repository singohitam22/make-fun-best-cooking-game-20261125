// The Cracked Yolk shift: orders, the assembly plate, the timer, hearts.
// Pure state plus small functions; rendering lives in render.js.
import { createSeededRng, pickFrom } from './rng.js';
import { CUSTOMERS, DISHES } from './recipes.js';

export const SHIFT_SECONDS = 180;
export const MAX_HEARTS = 3;
export const MAX_ORDERS = 3;

export function createKitchenState(seed) {
  const rng = createSeededRng(seed);
  const state = {
    seed,
    rng,
    screen: 'title',
    timeLeft: SHIFT_SECONDS,
    score: 0,
    coins: 0,
    served: 0,
    hearts: MAX_HEARTS,
    orders: [],
    plate: [],
    selectedBin: 0,
    message: '',
    elapsed: 0,
    shakePlate: 0,
    rush: 1,
    nextOrderId: 1,
  };
  for (let i = 0; i < MAX_ORDERS; i++) state.orders.push(spawnOrder(state));
  return state;
}

export function spawnOrder(state) {
  const dish = pickFrom(state.rng, DISHES);
  const patience = 45 + state.rng() * 25;
  return {
    id: state.nextOrderId++,
    customer: pickFrom(state.rng, CUSTOMERS),
    dish,
    patience,
    patienceMax: patience,
  };
}

export function plateMatchesDish(plate, dish) {
  if (plate.length !== dish.ingredients.length) return false;
  return dish.ingredients.every((id) => plate.includes(id));
}

export function addIngredientToPlate(state, ingredientId) {
  if (state.screen !== 'play') return 'not-playing';
  if (state.plate.includes(ingredientId)) return 'duplicate';
  if (state.plate.length >= 4) return 'full';
  state.plate.push(ingredientId);
  return 'added';
}

export function clearPlate(state) {
  state.plate = [];
}

export function servePlate(state) {
  if (state.screen !== 'play') return 'not-playing';
  if (state.plate.length === 0) return 'empty';
  const matchIndex = state.orders.findIndex((order) => plateMatchesDish(state.plate, order.dish));
  if (matchIndex === -1) {
    state.hearts -= 1;
    state.shakePlate = 0.4;
    state.message = 'Wrong dish! The customer sends it back.';
    if (state.hearts <= 0) state.screen = 'over';
    return 'wrong';
  }
  const order = state.orders[matchIndex];
  const tip = Math.round(50 * (order.patience / order.patienceMax));
  const earned = order.dish.coins + tip;
  state.score += earned;
  state.coins += earned;
  state.served += 1;
  state.rush = 1 + Math.min(0.6, state.served * 0.05);
  state.message = `Served ${order.dish.name}! +${earned} coins`;
  state.orders.splice(matchIndex, 1);
  state.orders.push(spawnOrder(state));
  state.plate = [];
  return 'served';
}

export function tickKitchen(state, dt) {
  if (state.screen !== 'play') return;
  state.elapsed += dt;
  state.timeLeft -= dt;
  if (state.timeLeft <= 0) {
    state.timeLeft = 0;
    state.screen = 'over';
    return;
  }
  for (const order of state.orders) order.patience -= dt * state.rush;
  const expired = state.orders.find((order) => order.patience <= 0);
  if (expired) {
    state.hearts -= 1;
    state.message = `${expired.customer} stormed out! Order lost.`;
    state.orders.splice(state.orders.indexOf(expired), 1);
    state.orders.push(spawnOrder(state));
    if (state.hearts <= 0) state.screen = 'over';
  }
  if (state.shakePlate > 0) state.shakePlate -= dt;
}

export function startShift(state) {
  state.screen = 'play';
  state.message = 'Shift started! Build the dishes on the board.';
}

export function restartShift(state) {
  const fresh = createKitchenState(state.seed);
  Object.assign(state, fresh);
  state.screen = 'play';
}
