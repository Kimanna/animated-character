// 캐릭터 스타일 적용 - 테스트용 추후 빌드시 import 가이드 제시 예정
import './styles/character.css';

import { Character } from './index';



const character = new Character('character-container', {
  width: 200,
  height: 200,
});

let config = {
  direction: "up",
  duration: 5000,
  repeat: 3,
  speed: 3,
}

await character.initialize();
character.changeAnimation("direction", config);
character.setAnimation("follow_mouse");
character.changeFaceExpression("default");
character.animationPlay();

// 이벤트 관련 메서드
function initializeEvents(): void {
    // 표정 변경 버튼들에 이벤트 리스너 추가
    const btnDefault = document.getElementById('btn-default');
    const btnSmile = document.getElementById('btn-smile');
    const btnSad = document.getElementById('btn-sad');
    const btnWink = document.getElementById('btn-wink');

    const btnNod = document.getElementById('btn-nod');
    const btnShake = document.getElementById('btn-shake');
    const btnTilt = document.getElementById('btn-tilt');
    const btnBow = document.getElementById('btn-bow');
    const btnLookUp = document.getElementById('btn-look-up');

    const btnPlay = document.getElementById('btn-play');
    const btnStop = document.getElementById('btn-stop');

    if (btnDefault) {
      btnDefault.addEventListener('click', () => character.changeFaceExpression("default"));
    }
    if (btnSmile) {
      btnSmile.addEventListener('click', () => character.changeFaceExpression("smile"));
    }
    if (btnSad) {
      btnSad.addEventListener('click', () => character.changeFaceExpression("sad"));
    }
    if (btnWink) {
      btnWink.addEventListener('click', () => character.changeFaceExpression("wink"));
    }

    if (btnNod) {
      btnNod.addEventListener('click', () => character.changeAnimation("nod"));
    }
    if (btnShake) {
      btnShake.addEventListener('click', () => character.changeAnimation("shake"));
    }
    if (btnTilt) {
      btnTilt.addEventListener('click', () => character.changeAnimation("tilt"));
    }
    if (btnBow) {
      btnBow.addEventListener('click', () => character.changeAnimation("bow"));
    } 
    if (btnLookUp) {
      btnLookUp.addEventListener('click', () => character.changeAnimation("look_up"));
    }

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        character.changeAnimation("direction", config);
        character.animationPlay();
      });
    }
    if (btnStop) {
      btnStop.addEventListener('click', () => {
        character.animationStop();
      });
    }

    const directionButtons = document.querySelectorAll('[data-direction]');
    directionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const direction = (button as HTMLElement).dataset.direction;
            config.direction = direction!;
            character.changeAnimation("direction", config);
                character.animationPlay();
        });  
    });

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
            config.speed = parseFloat((e.target as HTMLInputElement).value);
        });
    }
}

  initializeEvents();