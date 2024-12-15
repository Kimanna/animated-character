import { EYEBALL_CONFIG } from "../core/constants";

  // 얼굴 회전 각도 계산 메서드
  export const calculateFaceRotation = (centerX: number, centerY: number, mouseX: number, mouseY: number): string => {
    const distX = centerX - mouseX;
    const distY = centerY - mouseY;
    
    const y = Math.atan2(-distX, Math.abs(distY) * 3);
    const x = Math.atan2(distY, Math.abs(distY) * 3 / Math.cos(y));
    const angle = Math.max(Math.abs(x), Math.abs(y));
    
    return `rotate3d(${(x / angle)}, ${(y / angle)}, ${(y / angle) / 2}, ${angle}rad)`;
  }

  // 눈 회전 각도 계산 메서드
  export const calculateEyeballRotation = (centerX: number, centerY: number, mouseX: number, mouseY: number, scale: { x: number, y: number }): string => {
    const { RIGHT, LEFT } = EYEBALL_CONFIG.DEFAULT_POSITIONS;
    
    const eyeSpaceWidth = Math.abs(RIGHT.x - LEFT.x) * scale.x * 0.1; // 눈사이즈 안에서만 움직이도록
    
    const distX = (centerX - mouseX) * (1 + eyeSpaceWidth / (centerX * 2));
    const distY = centerY - mouseY;
    
    const y = Math.atan2(-distX, Math.abs(distY) * 3);
    const x = Math.atan2(distY, Math.abs(distY) * 3 / Math.cos(y));
    const angle = Math.max(Math.abs(x), Math.abs(y));
    
    return `rotate3d(${(x / angle)}, ${(y / angle)}, ${(y / angle) / 2}, ${angle}rad)`;
  }