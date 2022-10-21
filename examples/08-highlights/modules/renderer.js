import { Color } from './color.js';
import { Vector } from './vector.js';
import { Camera } from './camera.js';
import { Scene } from './scene.js';

class Renderer {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    render(scene, callback) {
        var started = new Date().valueOf();
        for (let yPixel = 0; yPixel < this.canvasHeight; yPixel++) {
            for (let xPixel = 0; xPixel < this.canvasWidth; xPixel++) {
                let x = (xPixel / this.canvasWidth) - 0.5;
                let y = (yPixel / this.canvasHeight) - 0.5;
                let pixelColor = scene.trace(x, y);
                callback(xPixel, yPixel, pixelColor);
            }
        }
        var duration = (new Date().valueOf() - started);
        console.log(`Render completed in ${duration / 1000} seconds`);
    }
}

export { Renderer, Scene, Camera, Color, Vector };