import { CharacterOptions } from '../core/types/character';
import { DEFAULT_CHARACTER_SIZE, EYE_EXPRESSIONS, MOUTH_EXPRESSIONS } from '../core/constants/character';

export class CharacterService {
    private container: HTMLElement;
    private characterSize: CharacterOptions;

    constructor(containerId: string, options?: CharacterOptions) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with ID "${containerId}" not found`);
        }

        this.container = container;
        this.container.style.transformStyle = "preserve-3d";
        
        this.characterSize = { 
            width: options?.width || DEFAULT_CHARACTER_SIZE.width, 
            height: options?.height || DEFAULT_CHARACTER_SIZE.height 
        };
    }

    public initialize(): void {
        const svg = this.createBaseSVG();
        this.container.appendChild(svg);
        this.setSize();
    }

    private createBaseSVG(): SVGElement {
        const svg = this.createSVGElement("svg", {
            id: "character",
            height: "100px",
            width: "100px",
            version: "1.1",
            viewBox: "0 0 512 512",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
        });

        const elements = [
            this.createFace(),
            this.createEyes(),
            this.createEyeballs(),
            this.createBlusher(),
            this.createMouth()
        ];

        elements.forEach(element => svg.appendChild(element));
        return svg;
    }

    private createFace(): DocumentFragment {
        const fragment = document.createDocumentFragment();

        // 얼굴 컬러
        const faceColor = this.createSVGElement("circle", {
            style: "fill:#F7B239",
            cx: "256",
            cy: "256",
            r: "246"
        });

        // 얼굴 외곽선
        const faceOutline = this.createSVGElement("circle", {
            cx: "256",
            cy: "256",
            r: "250",
            fill: "none",
            stroke: "black",
            "stroke-width": "12"
        });

        fragment.appendChild(faceColor);
        fragment.appendChild(faceOutline);
        return fragment;
    }

    private createEyes(): SVGElement {
        const eyesArea = this.createSVGElement("g", {
            class: "eyes-area",
            "data-moving-area": "eyes-area"
        });
        this.addMovingAreaStyle(eyesArea);

        const defaultEyes = this.createExpressionGroup("eyes");
        EYE_EXPRESSIONS.default.forEach(({ type, attrs }) => {
            defaultEyes.appendChild(this.createSVGElement(type, attrs));
        });
        eyesArea.appendChild(defaultEyes);

        return eyesArea;
    }

    private createEyeballs(): SVGElement {
        const eyeballs = this.createExpressionGroup("eyeballs");
        eyeballs.setAttribute("data-moving-area", "eyeballs");
        this.addMovingAreaStyle(eyeballs);

        ["363", "148"].forEach(cx => {
            eyeballs.appendChild(this.createSVGElement("circle", {
                style: "fill:#FFFFFF",
                cx,
                cy: "235",
                r: "20"
            }));
        });

        return eyeballs;
    }

    private createBlusher(): SVGElement {
        const blusher = this.createSVGElement("g", {
            class: "blusher",
            "data-moving-area": "blusher"
        });
        this.addMovingAreaStyle(blusher);

        [{ cx: "100" }, { cx: "411" }].forEach(attrs => {
            blusher.appendChild(this.createSVGElement("circle", {
                style: "fill:#F95428",
                ...attrs,
                cy: "337",
                r: "24"
            }));
        });

        return blusher;
    }

    private createMouth(): SVGElement {
        const mouthArea = this.createSVGElement("g", {
            class: "mouth-area",
            "data-moving-area": "mouth-area"
        });
        this.addMovingAreaStyle(mouthArea);

        const defaultMouth = this.createExpressionPath(
            "mouth", 
            MOUTH_EXPRESSIONS.default
        );
        mouthArea.appendChild(defaultMouth);

        return mouthArea;
    }

    private createSVGElement(type: string, attributes: Record<string, string> = {}): SVGElement {
        const element = document.createElementNS("http://www.w3.org/2000/svg", type);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    }

    private createExpressionGroup(type: string): SVGElement {
        const element = this.createSVGElement("g", {});
        element.setAttribute("class", `${type}`);
        return element;
    }

    private createExpressionPath(type: string, d: string): SVGElement {
        const group = this.createExpressionGroup(type);
        const path = this.createSVGElement("path", {
            d,
            stroke: "black",
            fill: "transparent",
            "stroke-width": "12"
        });
        group.appendChild(path);
        return group;
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

    private addMovingAreaStyle(element: SVGElement): void {
        element.style.transformOrigin = '50% 50% -200px';
        element.style.transitionDuration = '0.3s';
    }

    public updateCharacterSize(options: CharacterOptions): void {
        if (options.width) {
            this.characterSize.width = options.width;
        }
        if (options.height) {
            this.characterSize.height = options.height;
        }
        this.setSize();
    }
}
