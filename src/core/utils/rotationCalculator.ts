export const calculateFaceRotation = (
    centerX: number, 
    centerY: number, 
    mouseX: number, 
    mouseY: number
): string => {
    const distX = centerX - mouseX;
    const distY = centerY - mouseY;
    
    const y = Math.atan2(-distX, Math.abs(distY) * 3);
    const x = Math.atan2(distY, Math.abs(distY) * 3 / Math.cos(y));
    const angle = Math.max(Math.abs(x), Math.abs(y));
    
    return `rotate3d(${(x / angle)}, ${(y / angle)}, ${(y / angle) / 2}, ${angle}rad)`;
};
