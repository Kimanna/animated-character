import { FaceExpression } from '../core/types';
import { FaceAnimation } from '../animations/FaceAnimation';

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
  private faceAnimation: FaceAnimation;
  private svgElement: SVGSVGElement | null = null;

  /**
   * 캐릭터 인스턴스를 생성합니다.
   * @param containerId - 캐릭터가 렌더링될 컨테이너의 ID
   * @param options - 캐릭터 생성 옵션
   */
  constructor(containerId: string, options?: CharacterOptions) {
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`Container with ID "${containerId}" not found`);
    this.container = container;
    this.faceAnimation = new FaceAnimation(container);
    
    if (options) {
      this.setSize(options.width, options.height);
    }
  }

  async initialize(svgPath: string): Promise<void> {
    await this.loadSVG(svgPath);
    this.faceAnimation.initializeEvents();
    this.setFaceExpression(FaceExpression.DEFAULT);
  }

  private async loadSVG(url: string): Promise<void> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load SVG: ${response.statusText}`);
    const svgText = await response.text();
    this.container.innerHTML = svgText;
    this.svgElement = this.container.querySelector('svg');
  }

  setFaceExpression(expression: FaceExpression): void {
    this.faceAnimation.updateFaceExpression(expression);
  }

  /**
   * SVG의 크기를 설정합니다.
   * @param width - 너비 (픽셀)
   * @param height - 높이 (픽셀)
   */
  setSize(width?: number, height?: number): void {
    if (!this.svgElement) return;

    if (width) {
      this.svgElement.setAttribute('width', width.toString());
    }
    if (height) {
      this.svgElement.setAttribute('height', height.toString());
    }
  }

  /**
   * 현재 SVG의 크기를 반환합니다.
   */
  getSize(): { width: number; height: number } | null {
    if (!this.svgElement) return null;

    return {
      width: this.svgElement.width.baseVal.value,
      height: this.svgElement.height.baseVal.value
    };
  }

  setMouseFollow(isFollow: boolean): void {
    if (isFollow) {
      this.faceAnimation.toggleMouseTracking(true);
    } else {
      this.faceAnimation.toggleMouseTracking(false);
    }
  }
}
