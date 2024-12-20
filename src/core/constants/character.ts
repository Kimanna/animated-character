export const DEFAULT_CHARACTER_SIZE = {
    width: 200,
    height: 200
};

export const EYE_EXPRESSIONS = {
    default: [
        { type: "circle", attrs: { cx: "363", cy: "250", r: "54", stroke: "black", "stroke-width": "12" } },
        { type: "circle", attrs: { cx: "148", cy: "250", r: "54", stroke: "black", "stroke-width": "12" } }
    ],
    smile: "M94 250 Q148 190 202 250 M309 250 Q363 190 417 250",
    sad: "M94 250 Q148 270 202 250 M309 250 Q363 270 417 250",
    wink: "M94 250 Q148 190 202 250 M280 250 Q363 190 420 250 M280 250 Q350 140 420 200"
};

export const MOUTH_EXPRESSIONS = {
    default: "M216,318 C 216,348 256,348 256,318 C 256,348 296,348 296,318",
    smile: "M216,318 C 216,380 296,380 296,318",
    sad: "M216,338 C 216,308 296,308 296,338",
    wink: "M216,318 C 216,348 296,348 296,318"
};
