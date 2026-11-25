// One layout table for The Cracked Yolk: every clickable region and every
// drawn panel reads its rectangle from here, so input and rendering agree.
export const VIEW = { width: 1280, height: 720 };

export const HEADER = { x: 0, y: 0, width: 1280, height: 64 };
export const BOARD = { x: 16, y: 76, width: 288, height: 628 };
export const KITCHEN = { x: 320, y: 76, width: 944, height: 628 };

export const BIN_SIZE = 118;
export const BIN_GAP = 12;
export const BIN_ORIGIN = { x: 336, y: 108 };

export function binRectForIndex(index) {
  const col = index % 6;
  const row = Math.floor(index / 6);
  return {
    x: BIN_ORIGIN.x + col * (BIN_SIZE + BIN_GAP),
    y: BIN_ORIGIN.y + row * (BIN_SIZE + BIN_GAP),
    width: BIN_SIZE,
    height: BIN_SIZE,
  };
}

export const PLATE = { x: 560, y: 430, width: 320, height: 190 };
export const BELL = { x: 940, y: 440, width: 150, height: 170 };
export const TRASH = { x: 1120, y: 440, width: 128, height: 170 };
export const CHEF = { x: 380, y: 470, width: 150, height: 150 };

export function pointInRect(px, py, rect) {
  return px >= rect.x && px <= rect.x + rect.width && py >= rect.y && py <= rect.y + rect.height;
}

export function binIndexAtPoint(px, py) {
  for (let i = 0; i < 12; i++) {
    if (pointInRect(px, py, binRectForIndex(i))) return i;
  }
  return -1;
}
