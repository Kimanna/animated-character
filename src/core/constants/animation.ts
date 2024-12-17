import { AnimationConfig } from '../types/animation';

export const ROTATION_VALUES = {
    up: 'rotate3d(1, 0, 0, 30deg)',
    down: 'rotate3d(1, 0, 0, -30deg)',
    left: 'rotate3d(0, 1, 0, -30deg)',
    right: 'rotate3d(0, 1, 0, 30deg)',
    front: 'rotate3d(0, 0, 0, 0deg)'
};

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
    direction: 'up',
    duration: 1000,
    repeat: 1,
    pause: 1000
};
