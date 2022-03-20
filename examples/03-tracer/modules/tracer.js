import { Color } from './material.js';
import { Vector } from './vector.js';
import { Camera } from './camera.js';
import { Scene } from './scene.js';

class Tracer {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    trace(scene, callback) {
        const STEP = 1;
        for (let yPixel = 0; yPixel < this.canvasHeight; yPixel += STEP) {
            for (let xPixel = 0; xPixel < this.canvasWidth; xPixel += STEP) {
                let x = (xPixel / this.canvasWidth) - 0.5;
                let y = (yPixel / this.canvasHeight) - 0.5;
                let pixelColor = scene.trace(x, y);
                callback(xPixel, yPixel, pixelColor, STEP);
            }
        }
    }
}

export { Tracer, Scene, Camera, Color, Vector };