import { Color } from './color.js';
import { Vector } from './vector.js';
import { Camera } from './camera.js';
import { Scene } from './scene.js';

class Renderer {
    #canvasWidth;
    #canvasHeight;

    constructor(canvasWidth, canvasHeight) {
        this.#canvasWidth = canvasWidth;
        this.#canvasHeight = canvasHeight;
    }
    render(scene, callback, step = 1) {
        var started = new Date().valueOf();
        for (let y = 0; y < this.#canvasHeight; y += step) {
            for (let x = 0; x < this.#canvasWidth; x += step) {
                let tx = (x / this.#canvasWidth) - 0.5;
                let ty = (y / this.#canvasHeight) - 0.5;
                let pixelColor = scene.trace(tx, ty);
                callback(x, y, step, step, pixelColor);
            }
        }
        var duration = (new Date().valueOf() - started);
        console.log(`Render completed in ${duration / 1000} seconds`);
    }
}

export { Renderer, Scene, Camera, Color, Vector };