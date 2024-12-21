import { describe, it, expect } from 'vitest';
import { getRotationValue } from '../../../src/core/utils/transformUtils';
import { ROTATION_VALUES } from '../../../src/core/constants/animation';

describe('transformUtils', () => {
    describe('getRotationValue', () => {
        it('위쪽 방향의 회전값을 반환한다', () => {
            expect(getRotationValue('up')).toBe(ROTATION_VALUES.up);
        });

        it('아래쪽 방향의 회전값을 반환한다', () => {
            expect(getRotationValue('down')).toBe(ROTATION_VALUES.down);
        });

        it('왼쪽 방향의 회전값을 반환한다', () => {
            expect(getRotationValue('left')).toBe(ROTATION_VALUES.left);
        });

        it('오른쪽 방향의 회전값을 반환한다', () => {
            expect(getRotationValue('right')).toBe(ROTATION_VALUES.right);
        });

        it('정면 방향의 회전값을 반환한다', () => {
            expect(getRotationValue('front')).toBe(ROTATION_VALUES.front);
        });
    });
}); 