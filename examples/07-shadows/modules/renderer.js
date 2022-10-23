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
        for (let pixelY = 0; pixelY < this.#canvasHeight; pixelY += step) {
            for (let pixelX = 0; pixelX < this.#canvasWidth; pixelX += step) {
                let sceneX = (pixelX / this.#canvasWidth) - 0.5;
                let sceneY = (pixelY / this.#canvasHeight) - 0.5;
                let pixelColor = scene.trace(sceneX, sceneY);
                callback(pixelX, pixelY, step, step, pixelColor);
            }
        }
        var duration = (new Date().valueOf() - started);
        console.log(`Render completed in ${duration / 1000} seconds`);
    }
}

export { Renderer, Scene, Camera, Color, Vector };