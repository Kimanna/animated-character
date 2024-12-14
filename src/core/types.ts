/**
 * 캐릭터의 크기를 나타내는 타입
 * @property width - 캐릭터의 너비
 * @property height - 캐릭터의 높이
 */
export type CharacterSize = {
  width: number;
  height: number;
};

/**
 * 지원되는 얼굴 표정 타입
 * @enum {string}
 */
export enum FaceExpression {
  DEFAULT = "DEFAULT",
  SMILE = "SMILE",
  SAD = "SAD",
  WINK = "WINK"
}

/**
 * 캐릭터가 바라보는 방향
 * @enum {string}
 */
export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  FRONT = "FRONT"
}

/**
 * 캐릭터 동작
 * @enum {string}
 */
export enum Action {
  NOD = "NOD",
  SHAKE = "SHAKE",
  TILT = "TILT",
  BOW = "BOW",
  LOOK_UP = "LOOK_UP"
}

export type DirectionOptions = {
  duration: number;     // 해당 방향 유지 시간 (ms)
  repeat: number;       // 반복 횟수
};

export type ActionOptions = {
  speed: number;        // 동작 속도
  repeat: number;       // 반복 횟수
};