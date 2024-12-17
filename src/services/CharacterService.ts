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

    public initialize(): void {
        this.loadSVG();
        this.setSize();
    }

    private loadSVG(): void {
        const svg = this.createBaseSVG();
        this.container.appendChild(svg);
    }

    private createBaseSVG(): SVGElement {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", "character");
        svg.setAttribute("height", "100px");
        svg.setAttribute("width", "100px");
        svg.setAttribute("version", "1.1");
        svg.setAttribute("viewBox", "0 0 512 512");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

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

        // 눈 영역
        const eyesArea = this.createSVGElement("g", {
            class: "eyes-area",
            "data-moving-area": "eyes"
        });

        // 눈 표정 정의
        const eyeExpressions = {
            DEFAULT: [
                { type: "circle", attrs: { cx: "363", cy: "250", r: "54", stroke: "black", "stroke-width": "12" } },
                { type: "circle", attrs: { cx: "148", cy: "250", r: "54", stroke: "black", "stroke-width": "12" } }
            ],
            SMILE: "M94 250 Q148 190 202 250 M309 250 Q363 190 417 250",
            SAD: "M94 250 Q148 270 202 250 M309 250 Q363 270 417 250",
            WINK: "M94 250 Q148 190 202 250 M280 250 Q363 190 420 250 M280 250 Q350 140 420 200"
        };

        // 각 표정별 눈 추가
        Object.entries(eyeExpressions).forEach(([expression, config]) => {
            if (expression === 'DEFAULT') {
                const defaultEyes = this.createExpressionGroup("eyes", expression, true);
                (config as Array<{type: string, attrs: Record<string, string>}>).forEach(({ type, attrs }) => {
                    defaultEyes.appendChild(this.createSVGElement(type, attrs));
                });
                eyesArea.appendChild(defaultEyes);
            } else {
                eyesArea.appendChild(this.createExpressionPath("eyes", expression, config as string));
            }
        });

        // 눈동자
        const eyeballs = this.createExpressionGroup("eyeballs", "DEFAULT", true);
        eyeballs.setAttribute("data-moving-area", "eyeballs");
        ["363", "148"].forEach(cx => {
            eyeballs.appendChild(this.createSVGElement("circle", {
                style: "fill:#FFFFFF",
                cx,
                cy: "235",
                r: "20"
            }));
        });

        // 볼터치
        const blusher = this.createSVGElement("g", {
            class: "blusher",
            "data-moving-area": "blusher"
        });
        [{ cx: "100" }, { cx: "411" }].forEach(attrs => {
            blusher.appendChild(this.createSVGElement("circle", {
                style: "fill:#F95428",
                ...attrs,
                cy: "337",
                r: "24"
            }));
        });

        // 입 영역
        const mouthArea = this.createSVGElement("g", {
            class: "mouth-area",
            "data-moving-area": "mouth"
        });

        // 각 표정별 입 추가
        const mouthExpressions = {
            DEFAULT: "M216,318 C 216,348 256,348 256,318 C 256,348 296,348 296,318",
            SMILE: "M216,318 C 216,380 296,380 296,318",
            SAD: "M216,338 C 216,308 296,308 296,338",
            WINK: "M216,318 C 216,348 296,348 296,318"
        };

        Object.entries(mouthExpressions).forEach(([expression, path]) => {
            mouthArea.appendChild(this.createExpressionPath("mouth", expression, path, 
                expression === "DEFAULT"));
        });

        // SVG에 모든 요소 추가
        [faceColor, faceOutline, eyesArea, eyeballs, blusher, mouthArea]
            .forEach(element => svg.appendChild(element));

        return svg;
    }

    private createSVGElement(type: string, attributes: Record<string, string> = {}): SVGElement {
        const element = document.createElementNS("http://www.w3.org/2000/svg", type);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    }

    private createExpressionGroup(type: string, expression: string, show = false): SVGElement {
        return this.createSVGElement("g", {
            class: `${type} ${expression.toLowerCase()}-expression ${show ? 'show' : 'hide'}`,
            "data-expression": expression
        });
    }

    private createExpressionPath(type: string, expression: string, d: string, show = false): SVGElement {
        const group = this.createExpressionGroup(type, expression, show);
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
}
