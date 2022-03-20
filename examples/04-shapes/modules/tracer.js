import { Color } from './material.js';
import { Vector } from './vector.js';
import { Camera } from './camera.js';
import { Scene } from './scene.js';

class Tracer {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    trace(scene, callback) {
        const STEP = 1;
        for (let yPixel = 0; yPixel < this.height; yPixel += STEP) {
            for (let xPixel = 0; xPixel < this.width; xPixel += STEP) {
                let x = (xPixel / this.width) - 0.5;
                let y = (yPixel / this.height) - 0.5;
                let pixelColor = scene.trace(x, y);
                callback(xPixel, yPixel, pixelColor, STEP);
            }
        }
    }
}

export { Tracer, Scene, Camera, Color, Vector };