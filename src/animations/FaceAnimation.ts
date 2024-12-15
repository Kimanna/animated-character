import { FaceElements, FaceExpression,  } from '../core/types';
import { calculateEyeballRotation, calculateFaceRotation } from '../utils/rotationCalculator';

export class FaceAnimation {
  private container: HTMLElement;
  private elements: FaceElements;
  private isTracking: boolean = false;
  private boundHandleMouseMove: (event: MouseEvent) => void;

  constructor(container: HTMLElement, elements: FaceElements) {
    this.container = container;
    this.elements = elements;
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
    if (this.isTracking === isTracking) return;

    this.isTracking = isTracking;
    
    if (isTracking) {
      console.log('마우스 트래킹 시작');
      document.addEventListener('mousemove', this.boundHandleMouseMove);
    } else {
      console.log('마우스 트래킹 중지');
      document.removeEventListener('mousemove', this.boundHandleMouseMove);
    }
  } 

  // 마우스 이벤트 핸들러
  private handleMouseMove(event: MouseEvent): void {
    if (!this.isTracking || !this.areElementsInitialized()) return;

    const characterRect = this.elements.svgElement!.getBoundingClientRect();
    const centerX = characterRect.left + characterRect.width / 2;
    const centerY = characterRect.top + characterRect.height / 2;

    const scale = this.calculateScale();
    const faceRotationValue = calculateFaceRotation(centerX, centerY, event.clientX, event.clientY);
    const eyeballRotationValue = calculateEyeballRotation(centerX, centerY, event.clientX, event.clientY, scale);
    
    this.updateFaceRotation(faceRotationValue);
    this.updateEyeballRotation(eyeballRotationValue);
  }

  private areElementsInitialized(): boolean {
    return Object.values(this.elements).every(element => element !== null);
  }

  private calculateScale() {
    const viewBox = this.elements.svgElement!.viewBox.baseVal || {
      width: this.elements.svgElement!.width.baseVal.value,
      height: this.elements.svgElement!.height.baseVal.value
    };
    const characterRect = this.elements.svgElement!.getBoundingClientRect();

    return {
      x: viewBox.width / characterRect.width,
      y: viewBox.height / characterRect.height
    };
  }

  private updateFaceRotation(rotationValue: string): void {
    this.elements.blusher!.style.transform = rotationValue;
    this.elements.mouthArea!.style.transform = rotationValue;
    this.elements.eyesArea!.style.transform = rotationValue;
  }

  private updateEyeballRotation(rotationValue: string): void {
    this.elements.eyeballs!.style.transform = rotationValue;
  }


}