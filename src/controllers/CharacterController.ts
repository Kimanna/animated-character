import { Character } from '../models/CharacterModel';
import { AnimationConfig, AnimationType } from '../core/types/animation';

export class CharacterController {
    private character: Character;

    constructor(containerId: string, options?: { width?: number; height?: number }) {
        this.character = new Character(containerId, options);
    }

    public async initialize(): Promise<void> {
        await this.character.initialize();
    }

    public handleAnimationChange(type: AnimationType, config?: AnimationConfig): void {
        this.character.setAnimation(type, config);
    }

    public handleFaceExpressionChange(expression: string): void {
        this.character.setFaceExpression(expression);
    }

    public handleAnimationPlay(): void {
        this.character.play();
    }

    public handleAnimationStop(): void {
        this.character.stop();
    }
}
