import { DEFAULT_ANIMATION_CONFIG, ROTATION_VALUES } from "../core/constants/animation";
import { AnimationConfig } from "../core/types/animation.ts";

export class DirectionAnimation {
    private container: HTMLElement;
    private animationConfig: AnimationConfig | undefined;
    private currentAnimations: Animation[] = [];
    private timeoutIds: number[] = [];

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public setAnimation(config?: AnimationConfig): void {

        if (!config) {
            console.warn('No animation config provided');
            return;
        }

        this.stop();
        this.animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...config };
        
        this.clearCurrentAnimation();
        this.applyAnimation();
    }

    private applyAnimation(): void {
        
        if (!this.animationConfig) {
            console.warn('No animation config set');
            return;
        }

        const direction = this.animationConfig.direction.toLocaleLowerCase();

        const allElements = this.container.querySelectorAll('[data-moving-area]');

        const rotateValue = ROTATION_VALUES[direction as keyof typeof ROTATION_VALUES];
        const duration = this.animationConfig?.duration || 1000;
        const repeat = this.animationConfig?.repeat || 1;
        const pause = this.animationConfig?.pause || 0;

        console.log('direction:', direction);

        // 기존 애니메이션 정리
        this.currentAnimations.forEach(anim => anim.cancel());
        this.currentAnimations = [];

        allElements.forEach(element => {
            if (element instanceof HTMLElement || element instanceof SVGElement) {
                const animation = element.animate([
                    { transform: 'none' },
                    { transform: rotateValue },
                    { transform: 'none' },
                ], {
                    duration: duration,
                    iterations: 1,
                    easing: 'ease-in-out'
                });

                let currentIteration = 0;
                
                const runIteration = () => {
                    animation.play();
                    
                    this.timeoutIds.push(window.setTimeout(() => {
                        animation.pause();
                        this.timeoutIds.push(window.setTimeout(() => {
                            animation.play();
                            
                            animation.onfinish = () => {
                                currentIteration++;
                                if (currentIteration < repeat) {
                                    animation.currentTime = 0;
                                    runIteration();
                                } else {
                                    element.style.transform = '';
                                    if (this.currentAnimations.every(anim => anim.playState === 'finished')) {
                                        this.stop();
                                    }
                                }
                            };
                        }, pause));
                    }, duration / 2));
                };

                runIteration();
                this.currentAnimations.push(animation);
            }
        });
    }

    public stop(): void {
        this.timeoutIds.forEach(id => window.clearTimeout(id));
        this.timeoutIds = [];

        this.currentAnimations.forEach(animation => {
            animation.cancel();
        });
        this.currentAnimations = [];

        const allElements = this.container.querySelectorAll('[data-moving-area]');
        allElements.forEach(element => {
            if (element instanceof HTMLElement || element instanceof SVGElement) {
                element.style.transform = '';
            }
        });
    }

    private clearCurrentAnimation(): void {
        const allElements = this.container.querySelectorAll('[data-moving-area]');
        allElements.forEach(element => {
            if (element instanceof HTMLElement || element instanceof SVGElement) {
                element.style.transform = '';
            }
        });
    }
}