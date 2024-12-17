/**
 * 캐릭터의 방향을 나타내는 타입
 */
export type Direction = 'up' | 'down' | 'left' | 'right' | 'front';

/**
 * 캐릭터의 애니메이션 유형을 나타내는 타입
 */
export type AnimationType = 'follow_mouse' | 'direction';

/**
 * 캐릭터의 애니메이션 설정을 나타내는 타입
 * @property direction - 캐릭터의 방향
 * @property duration - 애니메이션의 지속 시간
 * @property repeat - 애니메이션의 반복 횟수
 * @property speed - 애니메이션의 속도
 */
export interface AnimationConfig {
    direction: Direction | string;
    duration?: number;
    repeat?: number;
    pause?: number;
}
