import { FaceExpression } from '../core/types/character.ts';
import { calculateFaceRotation } from '../core/utils/rotationCalculator';

export class FaceAnimation {
  private container: HTMLElement;
  private boundHandleMouseMove: (event: MouseEvent) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
  }    

  public updateFaceExpression(expression: FaceExpression): void {
    const allExpressions = this.container.querySelectorAll('[data-expression]');
    allExpressions.forEach(elem => {
      elem.classList.remove('show');
      elem.classList.add('hide');
    });

    const selectedElements = this.container.querySelectorAll(`.${expression.toLowerCase()}-expression`);
    selectedElements.forEach(elem => {
      elem.classList.remove('hide');
      elem.classList.add('show');
    });
  }

  public setTracking(isTracking: boolean): void {
    if (isTracking) {
      document.addEventListener('mousemove', this.boundHandleMouseMove);
    } else {
      document.removeEventListener('mousemove', this.boundHandleMouseMove);
    }
  } 

  private handleMouseMove = (event: MouseEvent): void => {
    if (!this.container.querySelector('svg')) {
      return;
    }

    const characterRect = this.container.querySelector('svg')?.getBoundingClientRect();
    if (!characterRect) {
      return;
    }
    const centerX = characterRect.left + characterRect.width / 2;
    const centerY = characterRect.top + characterRect.height / 2;

    const faceRotationValue = calculateFaceRotation(centerX, centerY, event.clientX, event.clientY);
    
    this.updateFaceRotation(faceRotationValue);
  }

  private updateFaceRotation(rotationValue: string): void {
    const allElements = this.container.querySelectorAll('[data-moving-area]');
    allElements.forEach((element) => {
      if (element instanceof HTMLElement || element instanceof SVGElement) {
        element.style.transform = rotationValue;
      }
    });
  }

}