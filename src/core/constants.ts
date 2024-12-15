import { AnimationConfig, Direction } from "./types";

export const EYEBALL_CONFIG = {
  RADIUS: 10,
  INNER_RADIUS: 5,
  DEFAULT_POSITIONS: {
    RIGHT: { x: 363, y: 235 },
    LEFT: { x: 148, y: 235 },
  },
};

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  direction: Direction.UP,
  duration: 500,
  repeat: 1,
  speed: 1
};
