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
            // the array needs separate r,g,b,a values for each pixel in the row
            let rgbaData = new Uint8ClampedArray(this.canvasWidth * 4 * step);
            for (let xPixel = 0; xPixel < this.canvasWidth; xPixel += step) {
                let index = xPixel;
                let x = (xPixel / this.canvasWidth) - 0.5;
                let y = (yPixel / this.canvasHeight) - 0.5;
                let pixelColor = scene.trace(x, y);
                let rgba = new Array(step).fill(pixelColor.rgba).flat();
                for (var row = 0; row < step; row++) rgbaData.set(rgba, (row * this.canvasWidth * 4) + (index * 4));
            }
            let imageData = new ImageData(rgbaData, this.canvasWidth, step);
            callback(0, yPixel, this.canvasWidth, step, imageData, step);
        }
        var duration = (new Date().valueOf() - started);
        console.log(`Render completed in ${duration / 1000} seconds`);
    }
}

export { Tracer, Scene, Camera, Color, Vector };