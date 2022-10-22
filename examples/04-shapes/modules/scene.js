import { Color } from './color.js';

export class Scene {
    constructor(camera, background, shapes) {
        this.camera = camera;
        this.background = background ?? Color.Black;
        this.shapes = shapes ?? [];
    }
    trace = (x, y) => this.camera.trace(this, x, y);
}
