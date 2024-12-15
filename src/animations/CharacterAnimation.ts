import { DEFAULT_ANIMATION_CONFIG } from "../core/constants";
import { AnimationConfig, FaceElements } from "../core/types";

export class CharacterAnimation {
    private container: HTMLElement;
    private animationConfig: AnimationConfig | undefined;
    private elements: FaceElements;
    private currentAnimations: Animation[] = [];

    constructor(container: HTMLElement, elements: FaceElements) {
        this.container = container;
        this.elements = elements;
    }

    public setAnimation(config?: AnimationConfig): void {
        this.stop();
        this.animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...config };
        this.clearCurrentAnimation();
        this.applyAnimation();
    }

    private applyAnimation(): void {
        const direction = this.animationConfig?.direction;
        if (!direction) return;

        const lowerCaseDirection = direction.toLowerCase();
        
        const targetElements = [
            this.elements.eyesArea,
            this.elements.eyeballs,
            this.elements.blusher,
            this.elements.mouthArea
        ].filter(element => element !== null) as SVGElement[];
        
        const rotate3dValues = {
            up: 'rotate3d(1, 0, 0, 30deg)',
            down: 'rotate3d(1, 0, 0, -30deg)',
            left: 'rotate3d(0, 1, 0, -30deg)',
            right: 'rotate3d(0, 1, 0, 30deg)',
            front: 'rotate3d(0, 0, 0, 0deg)'
        };

        const rotateValue = rotate3dValues[lowerCaseDirection as keyof typeof rotate3dValues];
        const duration = (this.animationConfig?.duration || 1000) / (this.animationConfig?.speed || 1);
        const repeat = this.animationConfig?.repeat || 1;

        // 기존 애니메이션 정리
        this.currentAnimations.forEach(anim => anim.cancel());
        this.currentAnimations = [];

        targetElements.forEach(element => {
            const animation = element.animate([
                { transform: rotateValue },
            ], {
                duration: duration,
                iterations: repeat,
                easing: 'ease-in-out'
            });

            animation.onfinish = () => {
                element.style.transform = '';
                if (this.currentAnimations.every(anim => anim.playState === 'finished')) {
                    this.stop();
                }
            };

            this.currentAnimations.push(animation);
        });
    }

    public stop(): void {
        this.currentAnimations.forEach(animation => {
            animation.cancel();
        });
        this.currentAnimations = [];

        // 각 요소의 transform 초기화
        [
            this.elements.eyesArea,
            this.elements.eyeballs,
            this.elements.blusher,
            this.elements.mouthArea
        ].forEach(element => {
            if (element) {
                element.style.transform = '';
            }
        });
    }

    private clearCurrentAnimation(): void {
        this.stop();
    }
}