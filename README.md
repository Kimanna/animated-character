# Animated Character

SVG 기반의 마우스 움직임에 반응하고 다양한 표정과 움직임을 제어할 수 있는 인터랙티브 캐릭터 애니메이션 라이브러리입니다.

## 주요 기능

### 🎯 방향 제어 & 마우스 트래킹
- 마우스 위치를 실시간으로 추적하여 캐릭터가 바라보는 방향 조절
- 3D 회전 효과를 통한 자연스러운 움직임 제공
- 사용자 지정 방향으로 캐릭터 회전 가능

### 🎨 캐릭터 커스터마이징
- **크기 설정**: 캐릭터의 width, height 조절 가능
- **표정 변경**: 
  - 기본 표정 (default)
  - 웃는 표정 (smile)
  - 슬픈 표정 (sad)
  - 윙크 (wink)
- **방향 제어**: UP, DOWN, LEFT, RIGHT, FRONT 방향 설정

### ⚙️ 애니메이션 설정
애니메이션 동작을 위한 다양한 옵션 제공:
- **direction**: 캐릭터의 이동 방향 설정
- **duration**: 애니메이션 지속 시간 (밀리초)
- **repeat**: 애니메이션 반복 횟수
- **pause**: 애니메이션 간 일시 정지 시간 (밀리초)

### 🎮 제어 기능
- 애니메이션 시작/정지
- 마우스 추적 모드 On/Off

## 설치 방법



## 사용 방법

### 1. HTML에 컨테이너 추가
```html
<div id="character-container"></div>
```

### 2. 캐릭터 초기화
```typescript
import { Character } from 'animated-character';

const character = new Character('character-container', {
    width: 200,  // 기본값
    height: 200  // 기본값
});

character.initialize();
```

### 3. 표정 변경
```typescript
// 사용 가능한 표정: "default", "smile", "sad", "wink"
character.handleFaceExpressionChange("smile");
```

### 4. 애니메이션 설정
```typescript
const config = {
    direction: "UP",    // "UP" | "DOWN" | "LEFT" | "RIGHT" | "FRONT"
    duration: 1000,     // 애니메이션 지속 시간 (ms)
    repeat: 3,         // 반복 횟수
    pause: 3000        // 일시 정지 시간 (ms)
};

character.handleAnimationChange("direction", config);
character.handleAnimationPlay();
```

### 5. 마우스 추적 모드
```typescript
character.handleAnimationChange("follow_mouse");
character.handleAnimationPlay();
```

### 6. 크기 변경
```typescript
character.handleSizeChange({
    width: 300,
    height: 300
});
```

## API 문서

### Character 클래스
| 메서드 | 설명 | 파라미터 |
|--------|------|-----------|
| initialize() | SVG 캐릭터 생성 및 초기화 | - |
| handleFaceExpressionChange() | 캐릭터 표정 변경 | expression: "default" \| "smile" \| "sad" \| "wink" |
| handleAnimationChange() | 애니메이션 모드 변경 | type: "follow_mouse" \| "direction", config?: AnimationConfig |
| handleAnimationPlay() | 애니메이션 시작 | - |
| handleAnimationStop() | 애니메이션 정지 | - |
| handleSizeChange() | 캐릭터 크기 변경 | options: { width?: number, height?: number } |

## 라이선스

이 프로젝트는 MIT 라이선스를 따르고 있습니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참고해 주세요.

### 영감을 준 프로젝트

이 프로젝트는 아래 저장소의 코드를 참고하여 만들어졌습니다:
- https://github.com/taggon/ryan-login (MIT 라이선스)
