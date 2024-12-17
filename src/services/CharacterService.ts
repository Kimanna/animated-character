import { CharacterOptions } from '../core/types/character';
import { DEFAULT_CHARACTER_SIZE } from '../core/constants/character';

export class CharacterService {
    private container: HTMLElement;
    private characterSize: CharacterOptions;

    constructor(containerId: string, options?: CharacterOptions) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with ID "${containerId}" not found`);
        }

        this.container = container;
        this.characterSize = { 
            width: options?.width || DEFAULT_CHARACTER_SIZE.width, 
            height: options?.height || DEFAULT_CHARACTER_SIZE.height 
        };
    }

    public async initialize(): Promise<void> {
        try {
            await this.loadSVG();
            this.setSize();
        } catch (error) {
            console.error('CharacterService - initialization failed:', error);
            throw error;
        }
    }

    private async loadSVG(): Promise<void> {
        const response = await fetch('/assets/character.svg');
        if (!response.ok) {
            throw new Error(`Failed to load SVG: ${response.statusText}`);
        }
        this.container.innerHTML = await response.text();
    }

    private setSize(): void {
        const svg = this.container.querySelector('svg');
        if (!svg) return;

        const { width, height } = this.characterSize;
        if (width) {
            svg.setAttribute('width', `${width}px`);
            this.container.style.width = `${width}px`;
        }
        if (height) {
            svg.setAttribute('height', `${height}px`);
            this.container.style.height = `${height}px`;
        }
    }
}
