import '@testing-library/jest-dom'

declare global {
    var SVGElement: typeof window.SVGElement;
    var SVGSVGElement: typeof window.SVGSVGElement;
}

// SVG 네임스페이스 모의 구현
globalThis.SVGElement = window.SVGElement;
globalThis.SVGSVGElement = window.SVGSVGElement;
