import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CharacterController } from '../../src/controllers/CharacterController';
import { Character } from '../../src/models/CharacterModel';

vi.mock('../../src/models/CharacterModel');

describe('CharacterController', () => {
    let controller: CharacterController;
    
    beforeEach(() => {
        vi.clearAllMocks();
        controller = new CharacterController('test-container');
    });

    describe('initialize', () => {
        it('캐릭터 모델을 초기화한다', () => {
            controller.initialize();
            expect(Character.prototype.initialize).toHaveBeenCalled();
        });
    });

    describe('handleAnimationChange', () => {
        it('애니메이션 타입과 설정을 전달한다', () => {
            const config = { direction: 'up', duration: 1000 };
            controller.handleAnimationChange('direction', config);
            expect(Character.prototype.setAnimation).toHaveBeenCalledWith('direction', config);
        });
    });

    describe('handleFaceExpressionChange', () => {
        it('표정 변경을 처리한다', () => {
            controller.handleFaceExpressionChange('smile');
            expect(Character.prototype.setFaceExpression).toHaveBeenCalledWith('smile');
        });
    });
});
