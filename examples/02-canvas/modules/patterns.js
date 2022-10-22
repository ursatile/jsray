// JavaScript module containing examples of patterns and procedural rendering.

import { Color } from "./renderer.js";

// TODO: create your own pixel shader function here, 
// which will take a pixel (x,y) value, and return a 
// color based on the specified pixel coordinates.

/** Gradiance is a pixel shader function based on arithmetic modulus values */
export function Gradiance(x, y) {
    let r = (4 * x) % 256;
    let g = (x + y) % 256;
    let b = y % 256;
    return new Color(r, g, b);
}


/** Supernova is a pixel shader function based on trigonometric functions */
export function Supernova(x, y) {
    let r = (x * (1 + Math.sin(y / 100))) % 255;
    let g = Math.abs(20 * Math.tan(y)) % 255;
    let b = (y * (1 + Math.cos(x / 2))) % 255;
    return new Color(r, g, b);
}

/** Lasergrid is a pixel shader based on trigonometric functions */
export function Lasergrid(x, y) {
    let r = 255 * Math.sin(200 - x / 20) + 255 * Math.cos(150 - y / 20);
    let g = 255 * Math.sin(200 - x / 20);
    let b = 255 * Math.cos(150 - y / 20);
    return new Color(r, g, b);
}

/** Chessboard creates a pixel shader function that draws a chessboard pattern */
export function Chessboard(size = 20, color1 = new Color(255, 255, 255), color2 = new Color(0, 0, 0)) {
    return (x, y) => {
        const xOdd = (x % (2 * size) < size);
        const yOdd = (y % (2 * size) < size);
        return (xOdd != yOdd ? color1 : color2);
    }
}
