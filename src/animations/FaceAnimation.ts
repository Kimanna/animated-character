import { EYEBALL_CONFIG } from '../core/constants';
import { FaceExpression,  } from '../core/types';

/**
 * SVG 요소들의 참조를 저장하는 인터페이스
 */
interface FaceElements {
  svgElement: SVGSVGElement | null;
  eyesArea: SVGGElement | null;
  blusher: SVGGElement | null;
  mouthArea: SVGGElement | null;
  eyes: SVGGElement | null;
  eyeballs: SVGGElement | null;
  [key: string]: SVGElement | null;
}

export class FaceAnimation {
  private container: HTMLElement;
  private elements: FaceElements;

  constructor(container: HTMLElement) {
    this.container = container;
    this.elements = this.getInitialElements();
  }    

  // 초기화 관련 메서드
  private getInitialElements(): FaceElements {
    return {
      svgElement: null,
      eyesArea: null,
      blusher: null,
      mouthArea: null,
      eyes: null,
      eyeballs: null
    };
  }

  private initializeElements(): FaceElements {
    return {
      svgElement: this.container.querySelector('svg') as SVGSVGElement,
      eyesArea: this.container.querySelector('.eyes-area') as SVGGElement,
      blusher: this.container.querySelector('.blusher') as SVGGElement,
      mouthArea: this.container.querySelector('.mouth-area') as SVGGElement,
      eyes: this.container.querySelector('.eyes') as SVGGElement,
      eyeballs: this.container.querySelector('.eyeballs') as SVGGElement,
    };
  }

  // 이벤트 관련 메서드
  public initializeEvents(): void {
    this.elements = this.initializeElements();
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    
    // 표정 변경 버튼들에 이벤트 리스너 추가
    const btnDefault = document.getElementById('btn-default');
    const btnSmile = document.getElementById('btn-smile');
    const btnSad = document.getElementById('btn-sad');
    const btnWink = document.getElementById('btn-wink');

    if (btnDefault) {
      btnDefault.addEventListener('click', () => this.updateFaceExpression(FaceExpression.DEFAULT));
    }
    if (btnSmile) {
      btnSmile.addEventListener('click', () => this.updateFaceExpression(FaceExpression.SMILE));
    }
    if (btnSad) {
      btnSad.addEventListener('click', () => this.updateFaceExpression(FaceExpression.SAD));
    }
    if (btnWink) {
      btnWink.addEventListener('click', () => this.updateFaceExpression(FaceExpression.WINK));
    }
  }     

  // 얼굴 회전 관련 메서드
  private calculateFaceRotation(centerX: number, centerY: number, mouseX: number, mouseY: number): string {
    const distX = centerX - mouseX;
    const distY = centerY - mouseY;
    
    const y = Math.atan2(-distX, Math.abs(distY) * 3);
    const x = Math.atan2(distY, Math.abs(distY) * 3 / Math.cos(y));
    const angle = Math.max(Math.abs(x), Math.abs(y));
    
    return `rotate3d(${(x / angle)}, ${(y / angle)}, ${(y / angle) / 2}, ${angle}rad)`;
  }

  // 마우스 이벤트 핸들러
  private handleMouseMove(event: MouseEvent): void {
    if (!this.areElementsInitialized()) return;

    const characterRect = this.elements.svgElement!.getBoundingClientRect();
    const centerX = characterRect.left + characterRect.width / 2;
    const centerY = characterRect.top + characterRect.height / 2;

    const scale = this.calculateScale();
    const faceRotationValue = this.calculateFaceRotation(centerX, centerY, event.clientX, event.clientY);
    const eyeballRotationValue = this.calculateEyeballRotation(centerX, centerY, event.clientX, event.clientY, scale);
    
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

  private calculateEyeballRotation(centerX: number, centerY: number, mouseX: number, mouseY: number, scale: { x: number, y: number }): string {
    const { RIGHT, LEFT } = EYEBALL_CONFIG.DEFAULT_POSITIONS;
    
    const eyeSpaceWidth = Math.abs(RIGHT.x - LEFT.x) * scale.x * 0.1; // 눈사이즈 안에서만 움직이도록
    
    const distX = (centerX - mouseX) * (1 + eyeSpaceWidth / (centerX * 2));
    const distY = centerY - mouseY;
    
    const y = Math.atan2(-distX, Math.abs(distY) * 3);
    const x = Math.atan2(distY, Math.abs(distY) * 3 / Math.cos(y));
    const angle = Math.max(Math.abs(x), Math.abs(y));
    
    return `rotate3d(${(x / angle)}, ${(y / angle)}, ${(y / angle) / 2}, ${angle}rad)`;
  }

  public updateFaceExpression(expression: FaceExpression): void {
    const allExpressions = this.container.querySelectorAll('[data-expression]');
    
    allExpressions.forEach(elem => {
      elem.classList.remove('show');
      elem.classList.add('hide');
    });
    
    const selectedEyes = this.container.querySelector(`.eyes.${expression.toLowerCase()}-expression`);
    const selectedMouth = this.container.querySelector(`.mouth.${expression.toLowerCase()}-expression`);
    
    if (selectedEyes) {
      selectedEyes.classList.remove('hide');
      selectedEyes.classList.add('show');
    }
    if (selectedMouth) {
      selectedMouth.classList.remove('hide');
      selectedMouth.classList.add('show');
    }
    
    if (this.elements.eyeballs) {
      if (expression === FaceExpression.DEFAULT) {
        this.elements.eyeballs.classList.remove('hide');
        this.elements.eyeballs.classList.add('show');
      } else {
        this.elements.eyeballs.classList.remove('show');
        this.elements.eyeballs.classList.add('hide');
      }
    }
  }
}