import { Color } from './color.js';

export class Scene {
    constructor(camera, background, shapes) {
        this.camera = camera;
        this.shapes = shapes ?? [];
        this.background = background ?? Color.Black;
    }
    trace = (x, y) => this.camera.trace(this, x, y).clip();
}
