import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Character } from '../../src/models/CharacterModel';

// DirectionAnimation 모의 객체
const mockDirectionAnimation = {
    setAnimation: vi.fn(),
    stop: vi.fn(),
    play: vi.fn(),
    initialize: vi.fn()
};

// FaceAnimation 모의 객체
const mockFaceAnimation = {
    setTracking: vi.fn(),
    updateFaceExpression: vi.fn(),
    initialize: vi.fn()
};

// 모의 객체 설정
vi.mock('../../src/animations/DirectionAnimation', () => ({
    DirectionAnimation: vi.fn().mockImplementation(() => mockDirectionAnimation)
}));

vi.mock('../../src/animations/FaceAnimation', () => ({
    FaceAnimation: vi.fn().mockImplementation(() => mockFaceAnimation)
}));

describe('Character', () => {
    let character: Character;

    beforeEach(() => {
        // DOM 요소 생성 및 추가
        document.body.innerHTML = '<div id="test-container"></div>';
        
        // 모의 객체 초기화
        vi.clearAllMocks();
        
        // 캐릭터 인스턴스 생성
        character = new Character('test-container', { width: 100, height: 100 });
        character.initialize();
    });

    afterEach(() => {
        // DOM 초기화
        document.body.innerHTML = '';
    });

    describe('setAnimation', () => {
        it('애니메이션 타입과 설정을 저장한다', () => {
            const type = 'direction';
            const config = { direction: 'up', duration: 1000 };
            character.setAnimation(type, config);
            character.play();
            expect(mockDirectionAnimation.setAnimation).toHaveBeenCalledWith(config);
        });
    });

    describe('play/stop', () => {
        it('direction 애니메이션을 실행/중지한다', () => {
            character.setAnimation('direction');
            character.play();
            expect(mockDirectionAnimation.setAnimation).toHaveBeenCalled();
            
            character.stop();
            expect(mockDirectionAnimation.stop).toHaveBeenCalled();
        });

        it('follow_mouse 애니메이션을 실행/중지한다', () => {
            // 모의 객체 호출 기록 초기화
            vi.clearAllMocks();
            
            character.setAnimation('follow_mouse');
            
            // play() 호출 시 setTracking이 true로 설정되어야 함
            character.play();
            expect(mockFaceAnimation.setTracking).toHaveBeenCalledWith(true);
            
            // stop() 호출 시 setTracking이 false로 설정되어야 함
            character.stop();
            expect(mockFaceAnimation.setTracking).toHaveBeenCalledWith(false);
        });
    });
});
