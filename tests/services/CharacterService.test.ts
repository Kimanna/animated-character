import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CharacterService } from '../../src/services/CharacterService';

describe('CharacterService', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        container.id = 'test-container';
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('constructor', () => {
        it('컨테이너 ID로 인스턴스를 생성할 수 있다', () => {
            const service = new CharacterService('test-container');
            expect(service).toBeInstanceOf(CharacterService);
        });

        it('잘못된 컨테이너 ID로 생성시 에러를 던진다', () => {
            expect(() => new CharacterService('non-existent')).toThrow();
        });

        it('사용자 정의 크기를 적용할 수 있다', () => {
            const customSize = { width: 200, height: 200 };
            const service = new CharacterService('test-container', customSize);
            service.initialize();
            
            const svg = container.querySelector('svg');
            expect(svg?.getAttribute('width')).toBe('200px');
            expect(svg?.getAttribute('height')).toBe('200px');
        });
    });

    describe('initialize', () => {
        it('SVG 요소를 생성하고 컨테이너에 추가한다', () => {
            const service = new CharacterService('test-container');
            service.initialize();
            
            const svg = container.querySelector('svg');
            expect(svg).toBeTruthy();
            expect(svg?.getAttribute('id')).toBe('character');
        });

        it('필수 SVG 요소들이 모두 생성된다', () => {
            const service = new CharacterService('test-container');
            service.initialize();
            
            const svg = container.querySelector('svg');
            expect(svg?.querySelector('.eyes-area')).toBeTruthy();
            expect(svg?.querySelector('.blusher')).toBeTruthy();
            expect(svg?.querySelector('.mouth-area')).toBeTruthy();
        });
    });
});
