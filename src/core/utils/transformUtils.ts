import { Direction } from '../types/animation';
import { ROTATION_VALUES } from '../constants/animation';

export const getRotationValue = (direction: Direction): string => {
    return ROTATION_VALUES[direction.toLowerCase() as keyof typeof ROTATION_VALUES];
};
