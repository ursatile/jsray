import { Color } from './color.js';

class Renderer {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    render(getPixelColor, callback, step = 1) {
        var started = new Date().valueOf();
        for (let y = 0; y < this.canvasHeight; y+= step) {
            for (let x = 0; x < this.canvasWidth; x+= step) {
                let color = getPixelColor(x,y);
                callback(x, y, step, step, color);
            }
        }
        var duration = (new Date().valueOf() - started);
        console.log(`Render completed in ${duration / 1000} seconds`);
    }
}

export { Renderer, Color };