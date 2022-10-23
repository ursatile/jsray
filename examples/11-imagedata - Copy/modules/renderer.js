import { Color } from './color.js';
import { Vector } from './vector.js';
import { Camera } from './camera.js';
import { Scene } from './scene.js';

class Renderer {

    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
        
    render(scene, callback, step = 1, block) {
        var started = new Date().valueOf();
        let xMin = (block && block.x ? block.x : 0);
        let xMax = (block && block.width ? xMin + block.width : this.canvaswidth);
        let yMin = (block && block.y ? block.y : 0);
        let yMax = (block && block.height ? yMin + block.height: this.canvasHeight);        
        for (let pixelY = yMin; pixelY < yMax; pixelY += step) {
            for (let pixelX = xMin; pixelX < xMax; pixelX += step) {
                let sceneX = (pixelX / this.canvasWidth) - 0.5;
                let sceneY = (pixelY / this.canvasHeight) - 0.5;
                let pixelColor = scene.trace(sceneX, sceneY);
                callback(pixelX, pixelY, step, step, pixelColor);
            }
        }
        var duration = (new Date().valueOf() - started);
        console.log(`Render completed in ${duration / 1000} seconds`);
    }
}

export { Renderer, Scene, Camera, Color, Vector };