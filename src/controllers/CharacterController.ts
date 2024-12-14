import { Direction, Action, DirectionOptions, ActionOptions } from '../core/types';

export class CharacterController {
  private container: HTMLElement;
  
  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
    this.initializeEvents();
  }

  public initializeEvents(): void {
    // 방향 버튼 이벤트 리스너
    const directionButtons = document.querySelectorAll('[data-direction]');
    directionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const direction = (button as HTMLElement).dataset.direction;
        console.log('Clicked direction:', direction);
        if (direction && direction in Direction) {
          console.log('Direction enum value:', Direction[direction as keyof typeof Direction]);
          this.setDirection(Direction[direction as keyof typeof Direction], {
            duration: 10000,
            repeat: 2
          });
        } else {
          console.error('Invalid direction:', direction);
        }
      });
    });

    // 액션 버튼 이벤트 리스너
    const actionButtons = document.querySelectorAll('[data-action]');
    actionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const action = (button as HTMLElement).dataset.action;
        if (action && action in Action) {
          this.performAction(Action[action as keyof typeof Action], {
            speed: 1,
            repeat: 1
          });
        } else {
          console.error('Invalid action:', action);
        }
      });
    });
  }

  public setDirection(direction: Direction, options: DirectionOptions) {
    const lowerCaseDirection = direction.toLowerCase();
    const elements = this.container.querySelectorAll('.eyes-area, .eyeballs, .blusher, .mouth-area');
    
    // 기존 방향 클래스들 제거
    const directions = Object.values(Direction);
    elements.forEach(element => {
      directions.forEach(dir => element.classList.remove(dir.toLowerCase()));
    });
  
    // 새로운 방��� 클래스 추가
    elements.forEach(element => {
      element.classList.add(lowerCaseDirection);
    });
    
    if (options.repeat > 1) {
      let count = 0;
      const interval = setInterval(() => {
        elements.forEach(element => {
          element.classList.remove(lowerCaseDirection);
          setTimeout(() => {
            element.classList.add(lowerCaseDirection);
          }, 100);
        });
        
        count++;
        if (count >= options.repeat) {
          clearInterval(interval);
          setTimeout(() => {
            elements.forEach(element => {
              element.classList.remove(lowerCaseDirection);
              element.classList.add(Direction.FRONT.toLowerCase());
            });
          }, options.duration);
        }
      }, options.duration);
    } else {
      setTimeout(() => {
        elements.forEach(element => {
          element.classList.remove(lowerCaseDirection);
          element.classList.add(Direction.FRONT.toLowerCase());
        });
      }, options.duration);
    }
  }

  public performAction(action: Action, options: ActionOptions) {
    const actionClass = action.toLowerCase();
    this.container.classList.add(actionClass);
    
    // 애니메이션 속도 조절
    const elements = this.container.querySelectorAll('.eyes-area, .eyeballs, .blusher, .mouth-area');
    elements.forEach(el => {
      (el as HTMLElement).style.animationDuration = `${1 / options.speed}s`;
    });
    
    // 반복 횟수 설정
    if (options.repeat > 1) {
      let count = 0;
      const interval = setInterval(() => {
        this.container.classList.remove(actionClass);
        setTimeout(() => {
          this.container.classList.add(actionClass);
        }, 50);
        
        count++;
        if (count >= options.repeat) {
          clearInterval(interval);
          this.container.classList.remove(actionClass);
        }
      }, 1000 / options.speed);
    } else {
      setTimeout(() => {
        this.container.classList.remove(actionClass);
      }, 1000 / options.speed);
    }
  }
}
