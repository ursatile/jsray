import { Color } from './color.js';
import { Vector } from './vector.js';
import { Camera } from './camera.js';
import { Scene } from './scene.js';

class Tracer {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    trace(scene, callback, step = 1) {
        var started = new Date().valueOf();
        for (let yPixel = 0; yPixel < this.canvasHeight; yPixel += step) {
            for (let xPixel = 0; xPixel < this.canvasWidth; xPixel += step) {
                let x = (xPixel / this.canvasWidth) - 0.5;
                let y = (yPixel / this.canvasHeight) - 0.5;
                let pixelColor = scene.trace(x, y);
                callback(xPixel, yPixel, step, step, pixelColor);
            }
        }
        var duration = (new Date().valueOf() - started);
        console.log(`Render completed in ${duration / 1000} seconds`);
    }
}

export { Tracer, Scene, Camera, Color, Vector };