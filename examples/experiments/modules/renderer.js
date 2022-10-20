import { Color } from './color.js';
import { Vector } from './vector.js';
import { Camera } from './camera.js';
import { Scene } from './scene.js';

class Renderer {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    trace(scene, callback, step = 1) {
        for (let yPixel = 0; yPixel < this.canvasHeight; yPixel += step) {
            for (let xPixel = 0; xPixel < this.canvasWidth; xPixel += step) {
                let x = (xPixel / this.canvasWidth) - 0.5;
                let y = (yPixel / this.canvasHeight) - 0.5;
                let pixelColor = scene.trace(x, y);
                callback(xPixel, yPixel, pixelColor, step);
            }
        }
    }
}

export { Renderer, Scene, Camera, Color, Vector };