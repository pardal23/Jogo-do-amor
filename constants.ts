
import { Phrase } from './types';

export const PHRASES: Phrase[] = [
  { id: 1, text: "O amor nasce no olhar.", position: { top: 10, left: 10 } },
  { id: 2, text: "Tua presença é poesia.", position: { top: 10, left: 520 } },
  { id: 3, text: "O amor é o perfume da alma.", position: { top: 170, left: 280 } },
  { id: 4, text: "Em cada passo levo-te comigo.", position: { top: 340, left: 10 } },
  { id: 5, text: "És o sol do meu amanhecer.", position: { top: 340, left: 520 } },
  { id: 6, text: "Quando te penso, o mundo sorri.", position: { top: 100, left: 160 } },
  { id: 7, text: "Tu és a minha melhor estação.", position: { top: 220, left: 400 } },
  { id: 8, text: "Cada flor é um beijo do coração.", position: { top: 240, left: 260 } },
];

export const GAME_BOARD = {
  width: 600,
  height: 380,
};

export const FLOWER_SIZE = 40;

// Adjust max positions to keep the flower fully inside
export const MAX_X = GAME_BOARD.width - FLOWER_SIZE;
export const MAX_Y = GAME_BOARD.height - FLOWER_SIZE;

export const INITIAL_POSITION = { x: 280, y: 170 };
export const MOVE_STEP = 40;
