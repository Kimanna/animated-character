import { AnimationConfig, AnimationType, Direction, FaceElements, FaceExpression } from '../core/types';
import { FaceAnimation } from '../animations/FaceAnimation';
import { CharacterAnimation } from '../animations/CharacterAnimation';

/**
 * 캐릭터 생성 옵션
 */
interface CharacterOptions {
  /** 캐릭터의 너비 (픽셀) */
  width?: number;
  /** 캐릭터의 높이 (픽셀) */
  height?: number;
}

/**
 * 캐릭터의 전반적인 기능을 관리하는 메인 클래스
 */
export class Character {
  private container: HTMLElement;
  private faceAnimation: FaceAnimation | undefined;
  private characterAnimation: CharacterAnimation | undefined;
  private animationType: AnimationType = "follow_mouse";
  private animationConfig: AnimationConfig | undefined;
  private isPlaying: boolean = false;
  private chracterSize: CharacterOptions = { width: 200, height: 200 };
  private faceElements!: FaceElements;
  /**
   * 캐릭터 인스턴스를 생성합니다.
   * @param containerId - 캐릭터가 렌더링될 컨테이너의 ID
   * @param options - 캐릭터 생성 옵션
   */
  constructor(containerId: string, options?: CharacterOptions) {
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`Container with ID "${containerId}" not found`);

    this.container = container;
    options && (this.chracterSize = { width: options.width, height: options.height });
  }

  public async initialize(): Promise<void> {
    await this.loadSVG('/assets/character.svg');
    this.faceElements = this.initializeElements();
    this.setFaceExpression(FaceExpression.DEFAULT);
    this.faceAnimation = new FaceAnimation(this.container, this.faceElements);
    this.characterAnimation = new CharacterAnimation(this.container, this.faceElements);
    this.setSize(this.chracterSize.width, this.chracterSize.height);
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

  public setAnimation(type: string, config?: AnimationConfig): void {
    const animationType = type.toLowerCase() as AnimationType;
    
    if (animationType !== 'follow_mouse' && animationType !== 'direction') {
      throw new Error(`유효하지 않은 애니메이션 타입입니다: ${type}`);
    }

    this.animationType = animationType;

    if (config?.direction && typeof config.direction === 'string') {
      this.animationConfig = {
        ...config,
        direction: Direction[config.direction.toUpperCase() as keyof typeof Direction]
      };
    } else {
      this.animationConfig = config;
    }
  }
  
  public changeAnimation(type: string, config?: AnimationConfig): void {
    this.setAnimation(type, config);
  }

  public setFaceExpression(expression: string): void {
    const faceExpression = expression.toUpperCase() as keyof typeof FaceExpression;
    this.faceAnimation?.updateFaceExpression(FaceExpression[faceExpression]);
  }

  public changeFaceExpression(expression: string): void {
    const faceExpression = expression.toUpperCase() as keyof typeof FaceExpression;
    this.faceAnimation?.updateFaceExpression(FaceExpression[faceExpression]);
  }

  public animationPlay(): void {
    this.isPlaying = true;

    switch(this.animationType) {
      case 'direction':
        this.characterAnimation?.setAnimation(this.animationConfig);
        break;
      case 'follow_mouse':
        this.faceAnimation?.setTracking(true);
        break;
    }
  }

  public animationStop(): void {
    this.isPlaying = false;
    switch(this.animationType) {
      case 'direction':
        this.characterAnimation?.stop();
        break;
      case 'follow_mouse':
        this.faceAnimation?.setTracking(false);
        break;
    }
  }

  private async loadSVG(url: string): Promise<void> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load SVG: ${response.statusText}`);
    const svgText = await response.text();
    this.container.innerHTML = svgText;
  }

  /**
   * SVG의 크기를 설정합니다.
   * @param width - 너비 (픽셀)
   * @param height - 높이 (픽셀)
   */
  private setSize(width?: number, height?: number): void {
    const svg = this.container.querySelector('svg');
    if (!svg) return;

    if (width) {
      svg.setAttribute('width', `${width}px`);
      this.container.style.width = `${width}px`;
    }
    if (height) {
      svg.setAttribute('height', `${height}px`);
      this.container.style.height = `${height}px`;
    }
  }

  public getSize(): CharacterOptions {
    return {
      width: this.chracterSize.width,
      height: this.chracterSize.height
    }
  }
}
