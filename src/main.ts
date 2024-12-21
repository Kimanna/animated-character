import { Character } from './index';

const character = new Character('character-container', {
  width: 200,
  height: 200,
});

character.initialize();
character.handleAnimationChange("direction");
character.handleFaceExpressionChange("default");

const config = {
  direction: "UP",
  duration: 1000,
  repeat: 3,
  pause: 3000,
}

const sizeConfig = {
  width: 200,
  height: 200,
}

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

  const pauseInput = document.getElementById('pause-input') as HTMLInputElement;
  if (pauseInput) {
      pauseInput.addEventListener('change', (e) => {
          config.pause = parseFloat((e.target as HTMLInputElement).value);
      });
  }

  const btnApplyAnimation = document.getElementById('btn-apply-animation');
  if (btnApplyAnimation) {
    btnApplyAnimation.addEventListener('click', () => {
      character.handleAnimationChange("direction", config);
      character.handleAnimationPlay();
    });
  }

  const widthInput = document.getElementById('width-input') as HTMLInputElement;
  const heightInput = document.getElementById('height-input') as HTMLInputElement;
  const btnApplySize = document.getElementById('btn-apply-size');

  if (widthInput) {
    widthInput.addEventListener('change', (e) => {
      sizeConfig.width = parseInt((e.target as HTMLInputElement).value);
    });
  }

  if (heightInput) {
    heightInput.addEventListener('change', (e) => {
      sizeConfig.height = parseInt((e.target as HTMLInputElement).value);
    });
  }

  if (btnApplySize) {
    btnApplySize.addEventListener('click', () => {
      character.handleSizeChange(sizeConfig);
    });
  }
}

initializeEvents();