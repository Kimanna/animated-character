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
 * 캐릭터의 표정을 나타내는 타입
 */
export type FaceExpression = 'default' | 'smile' | 'sad' | 'wink';
