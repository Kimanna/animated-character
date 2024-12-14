// 캐릭터 스타일 적용 - 테스트용 추후 빌드시 import 가이드 제시 예정
import './styles/character.css';

import { Character } from './index';
import { CharacterController } from './controllers/CharacterController';
import { Direction, Action } from './core/types';


// 생성 시 크기 지정
const character = new Character('character-container', {
  width: 200,
  height: 200
});

await character.initialize('/assets/character.svg');

// 나중에 크기 변경
character.setSize(200, 200);


// 캐릭터 컨트롤러 초기화
const characterController = new CharacterController('character-container');
characterController.initializeEvents();
characterController.performAction(Action.NOD, {
  speed: 1.5,      // 1.5배 빠르게
  repeat: 3        // 3회 반복
});
characterController.setDirection(Direction.DOWN, {
  duration: 1000,
  repeat: 1
});
