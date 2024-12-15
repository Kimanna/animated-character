/**
 * 캐릭터의 크기를 나타내는 타입
 * @property width - 캐릭터의 너비
 * @property height - 캐릭터의 높이
 */
export interface CharacterOptions {
  width?: number;
  height?: number;
}

/**
 * 지원되는 얼굴 표정 타입
 * @enum {string}
 */
export enum FaceExpression {
  DEFAULT = "default",
  SMILE = "smile",
  SAD = "sad",
  WINK = "wink"
}

/**
 * 캐릭터가 바라보는 방향
 * @enum {string}
 */
export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
  FRONT = "front"
}

/**
 * 캐릭터 동작
 * @enum {string}
 */
export type AnimationType = 'follow_mouse' | 'direction';

/**
 * 애니메이션 설정
 * @interface
 */
export interface AnimationConfig {
  direction?: string | Direction;
  duration?: number;
  repeat?: number;
  speed?: number;
}


/**
 * SVG 요소들의 참조를 저장하는 인터페이스
 */
export interface FaceElements {
  svgElement: SVGSVGElement | null;
  eyesArea: SVGGElement | null;
  blusher: SVGGElement | null;
  mouthArea: SVGGElement | null;
  eyes: SVGGElement | null;
  eyeballs: SVGGElement | null;
  [key: string]: SVGElement | null;
}
