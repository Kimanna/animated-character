import { EYE_EXPRESSIONS, MOUTH_EXPRESSIONS } from '../core/constants/character.ts';
import { FaceExpression } from '../core/types/character.ts';
import { calculateFaceRotation } from '../core/utils/rotationCalculator';

export class FaceAnimation {
  private container: HTMLElement;
  private boundHandleMouseMove: (event: MouseEvent) => void;
  private boundSetCenterFace: () => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundSetCenterFace = this.setCenterFace.bind(this);
  }    

  public updateFaceExpression(expression: FaceExpression): void {
    this.updateEyeExpression(expression);
    this.updateMouthExpression(expression);
  }

  private createSVGElement(
    tagName: string,
    attributes: Record<string, string | number>
  ): SVGElement {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value.toString());
    });
    return element;
  }

  private createExpressionGroup(type: 'eyes' | 'mouth'): SVGGElement {
    const group = this.createSVGElement('g', {
      class: `${type}`,
    }) as SVGGElement;

    return group;
  }

  private createPathElement(pathData: string): SVGPathElement {
    return this.createSVGElement('path', {
      d: pathData,
      stroke: 'black',
      fill: 'transparent',
      'stroke-width': 12,
    }) as SVGPathElement;
  }

  private updateEyeExpression(expression: FaceExpression): void {
    const area = this.container.querySelector('.eyes-area');
    if (!area) return;

    area.textContent = ''; // 기존 요소 제거
    const group = this.createExpressionGroup('eyes');

    // 눈동자 표시/숨김 처리
    const eyeballs = this.container.querySelector('.eyeballs');
    if (eyeballs instanceof SVGElement) {     
      eyeballs.style.visibility = expression === 'default' ? 'visible' : 'hidden';
    }

    if (expression === 'default') {
      EYE_EXPRESSIONS.default.forEach(({ type: elemType, attrs }) => {
        group.appendChild(this.createSVGElement(elemType, attrs));
      });
    } else {
      const pathData = EYE_EXPRESSIONS[expression];
      group.appendChild(this.createPathElement(pathData as string));
    }

    area.appendChild(group);
  }

  private updateMouthExpression(expression: FaceExpression): void {
    const area = this.container.querySelector('.mouth-area');
    if (!area) return;

    area.textContent = ''; // 기존 요소 제거
    const group = this.createExpressionGroup('mouth');
    
    const pathData = MOUTH_EXPRESSIONS[expression];
    group.appendChild(this.createPathElement(pathData as string));
    
    area.appendChild(group);
  }

  public setTracking(isTracking: boolean): void {
    if (isTracking) {
      document.addEventListener('mousemove', this.boundHandleMouseMove);
      document.addEventListener('mouseout', this.boundSetCenterFace);
    } else {
      document.removeEventListener('mousemove', this.boundHandleMouseMove);
      document.removeEventListener('mouseout', this.boundSetCenterFace);
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

  private setCenterFace(): void {
    const allElements = this.container.querySelectorAll('[data-moving-area]');
    allElements.forEach((element) => {
      if (element instanceof HTMLElement || element instanceof SVGElement) {
        element.style.transform = 'none';
      }
    });
  }

}