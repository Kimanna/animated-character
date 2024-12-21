import { CharacterOptions, FaceExpression } from '../core/types/character';
import { FaceAnimation } from '../animations/FaceAnimation';
import { DirectionAnimation } from '../animations/DirectionAnimation';
import { CharacterService } from '../services/CharacterService';
import { AnimationConfig, AnimationType } from '../core/types/animation';

export class Character {
    private faceAnimation: FaceAnimation;
    private directionAnimation: DirectionAnimation;
    private characterService: CharacterService;
    private animationType: AnimationType = "follow_mouse";
    private animationConfig?: AnimationConfig;

    constructor(containerId: string, options?: CharacterOptions) {
        this.characterService = new CharacterService(containerId, options);
        const container = document.getElementById(containerId);
        if (!container) throw new Error(`Container with id ${containerId} not found`);
        
        this.faceAnimation = new FaceAnimation(container);
        this.directionAnimation = new DirectionAnimation(container);
    }

    public initialize(): void {
        this.characterService.initialize();
    }

    public setAnimation(type: AnimationType, config?: AnimationConfig): void {
        this.stop();
        this.animationType = type;
        this.animationConfig = config;
    }

    public setFaceExpression(expression: string): void {
        this.faceAnimation.updateFaceExpression(expression as FaceExpression);
    }

    public play(): void {
        
        this.stop();
        
        switch(this.animationType) {
            case 'direction':
                this.directionAnimation.setAnimation(this.animationConfig);
                break;
            case 'follow_mouse':
                this.faceAnimation.setTracking(true);
                break;
        }
    }

    public stop(): void {
        this.faceAnimation.setTracking(false);
        this.directionAnimation.stop();
    }

    public setSize(options: CharacterOptions): void {
        this.characterService.updateCharacterSize(options);
    }
}