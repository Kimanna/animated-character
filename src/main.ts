// 캐릭터 스타일 적용 - 테스트용 추후 빌드시 import 가이드 제시 예정

import { Character } from './index';

const character = new Character('character-container', {
  width: 200,
  height: 200,
});

const config = {
  direction: "up",
  duration: 1000,
  repeat: 3,
  pause: 3000,
}

await character.initialize();
character.handleAnimationChange("direction");
character.handleFaceExpressionChange("default");
// character.handleAnimationPlay();

function initializeEvents(): void {
  const btnDefault = document.getElementById('btn-default');
  const btnSmile = document.getElementById('btn-smile');
  const btnSad = document.getElementById('btn-sad');
  const btnWink = document.getElementById('btn-wink');

  const btnPlay = document.getElementById('btn-play');
  const btnStop = document.getElementById('btn-stop');

  if (btnDefault) {
    btnDefault.addEventListener('click', () => character.handleFaceExpressionChange("default"));
  }
  if (btnSmile) {
    btnSmile.addEventListener('click', () => character.handleFaceExpressionChange("smile"));
  }
  if (btnSad) {
    btnSad.addEventListener('click', () => character.handleFaceExpressionChange("sad"));
  }
  if (btnWink) {
    btnWink.addEventListener('click', () => character.handleFaceExpressionChange("wink"));
  }

  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      character.handleAnimationChange("direction", config);
      character.handleAnimationPlay();
    });
  }
  if (btnStop) {
    btnStop.addEventListener('click', () => {
      character.handleAnimationStop();
    });
  }

  const directionButtons = document.querySelectorAll('[data-direction]');
  directionButtons.forEach(button => {
      button.addEventListener('click', () => {
          const direction = (button as HTMLElement).dataset.direction;
          config.direction = direction!;
          character.handleAnimationChange("direction", config);
          character.handleAnimationPlay();
      });  
  });

  const btnFollowMouse = document.getElementById('btn-follow-mouse');
  if (btnFollowMouse) {
    btnFollowMouse.addEventListener('click', () => {
      character.handleAnimationChange("follow_mouse");
      character.handleAnimationPlay();
    });
  }

  const btnDirection = document.getElementById('btn-direction');
  if (btnDirection) {
    btnDirection.addEventListener('click', () => {
      character.handleAnimationChange("direction", config);
      character.handleAnimationPlay();
    });
  }

  const durationInput = document.getElementById('duration-input') as HTMLInputElement;
  if (durationInput) {
      durationInput.addEventListener('change', (e) => {
          config.duration = parseInt((e.target as HTMLInputElement).value);
      });
  }

  const repeatInput = document.getElementById('repeat-input') as HTMLInputElement;
  if (repeatInput) {
      repeatInput.addEventListener('change', (e) => {
          config.repeat = parseInt((e.target as HTMLInputElement).value);
      });
  }

  const speedInput = document.getElementById('speed-input') as HTMLInputElement;
  if (speedInput) {
      speedInput.addEventListener('change', (e) => {
          config.pause = parseFloat((e.target as HTMLInputElement).value);
      });
  }


}

initializeEvents();