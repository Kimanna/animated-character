import { DEFAULT_ANIMATION_CONFIG } from "../core/constants";
import { AnimationConfig, Direction, FaceElements } from "../core/types";

export class CharacterAnimation {
    private container: HTMLElement;
    private animationConfig: AnimationConfig | undefined;
    private elements: FaceElements;

    constructor(container: HTMLElement, elements: FaceElements) {
        this.container = container;
        this.elements = elements;
        this.init()
    }

    private init(): void {
        const directionButtons = document.querySelectorAll('[data-direction]');
        directionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const direction = (button as HTMLElement).dataset.direction;
        console.log('Clicked direction:', direction);
        if (direction && direction in Direction) {

        } else {
          console.error('Invalid direction:', direction);
        }
      });
    });    
}

    public setAnimation(config?: AnimationConfig): void {
        this.animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...config };

        this.clearCurrentAnimation();
        this.applyAnimation();
    }

    private applyAnimation(): void {
        const direction = this.animationConfig?.direction;
        if (!direction) return;

        const lowerCaseDirection = direction.toLowerCase();
        const elements = this.container.querySelectorAll('.eyes-area, .eyeballs, .blusher, .mouth-area');
        
        // 기존 방향 클래스들 제거
        const directions = [lowerCaseDirection];
        elements.forEach(element => {
          directions.forEach(dir => element.classList.remove(dir));
        });
      
        // 새로운 방향 클래스 추가
        elements.forEach(element => {
          element.classList.add(lowerCaseDirection);
        });

        
        
        if (this.animationConfig?.repeat && this.animationConfig.repeat > 1) {
          let count = 0;
          const interval = setInterval(() => {
            elements.forEach(element => {
              element.classList.remove(lowerCaseDirection);
              setTimeout(() => {
                element.classList.add(lowerCaseDirection);
              }, 100);
            });
            
            count++;
            if (count >= (this.animationConfig?.repeat || 1)) {
              clearInterval(interval);
              setTimeout(() => {
                elements.forEach(element => {
                  element.classList.remove(lowerCaseDirection);
                  element.classList.add(direction.toLowerCase());
                });
              }, this.animationConfig?.duration || 1000);
            }
          }, this.animationConfig?.duration || 1000);
        } else {
          setTimeout(() => {
            elements.forEach(element => {
              element.classList.remove(lowerCaseDirection);
              element.classList.add(direction.toLowerCase());
            });
          }, this.animationConfig?.duration || 1000);
        }
    }

    private clearCurrentAnimation(): void {
        this.container.classList.remove('direction');
    }


}